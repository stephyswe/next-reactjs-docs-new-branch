/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Fragment, useMemo} from 'react';
import {MDXComponents} from 'components/MDX/MDXComponents';
import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';
import {prepareMDX} from '../utils/prepareMDX';

export default function Layout({content}) {
  const parsedContent = useMemo(
    () => JSON.parse(content, reviveNodeOnClient),
    [content]
  );
  return (
    <Page>
      <MarkdownPage>{parsedContent}</MarkdownPage>
    </Page>
  );
}

// Deserialize a client React tree from JSON.
function reviveNodeOnClient(key, val) {
  if (Array.isArray(val) && val[0] == '$r') {
    // Assume it's a React element.
    let type = val[1];
    let key = val[2];
    let props = val[3];
    if (type === 'wrapper') {
      type = Fragment;
      props = {children: props.children};
    }
    if (MDXComponents[type]) {
      type = MDXComponents[type];
    }
    if (!type) {
      console.error('Unknown type: ' + type);
      type = Fragment;
    }
    return {
      $$typeof: Symbol.for('react.element'),
      type: type,
      key: key,
      ref: null,
      props: props,
      _owner: null,
    };
  } else {
    return val;
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~ IMPORTANT: BUMP THIS IF YOU CHANGE ANY CODE BELOW ~~~
const DISK_CACHE_BREAKER = 7;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Put MDX output into JSON for client.
export async function getStaticProps(context) {
  const fs = require('fs');
  const rootDir = process.cwd() + '/src/content/';
  const mdxComponentNames = Object.keys(MDXComponents);

  // Read MDX from the file.
  let path = (context.params.markdownPath || []).join('/') || 'index';
  let mdx;
  mdx = fs.readFileSync(rootDir + path + '.md', 'utf8');

  // If we don't add these fake imports, the MDX compiler
  // will insert a bunch of opaque components we can't introspect.
  // This will break the prepareMDX() call below.
  let mdxWithFakeImports =
    mdx +
    '\n\n' +
    mdxComponentNames
      .map((key) => 'import ' + key + ' from "' + key + '";\n')
      .join('\n');

  // Turn the MDX we just read into some JS we can execute.
  const {compile: compileMdx} = await import('@mdx-js/mdx');
  const jsxCode = await compileMdx(mdxWithFakeImports, {
    remarkPlugins: [
      (await import('remark-frontmatter')).default,
    ],
  });
  const {transform} = require('@babel/core');
  const jsCode = await transform(jsxCode, {
    plugins: ['@babel/plugin-transform-modules-commonjs'],
    presets: ['@babel/preset-react'],
  }).code;

  // Prepare environment for MDX.
  let fakeExports = {};
  const fakeRequire = (name) => {
    if (name === 'react/jsx-runtime') {
      return require('react/jsx-runtime');
    } else {
      // For each fake MDX import, give back the string component name.
      // It will get serialized later.
      return name;
    }
  };
  const evalJSCode = new Function('require', 'exports', jsCode);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // THIS IS A BUILD-TIME EVAL. NEVER DO THIS WITH UNTRUSTED MDX (LIKE FROM CMS)!!!
  // In this case it's okay because anyone who can edit our MDX can also edit this file.
  evalJSCode(fakeRequire, fakeExports);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const reactTree = fakeExports.default({});

  // Pre-process MDX output and serialize it.
  let {children} = prepareMDX(reactTree.props.children);

  const output = {
    props: {
      content: JSON.stringify(children, stringifyNodeOnServer),
    },
  };

  // Serialize a server React tree node to JSON.
  function stringifyNodeOnServer(key, val) {
    if (val != null && val.$$typeof === Symbol.for('react.element')) {
      // Remove fake MDX props.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {mdxType, originalType, parentName, ...cleanProps} = val.props;
      return [
        '$r',
        typeof val.type === 'string' ? val.type : mdxType,
        val.key,
        cleanProps,
      ];
    } else {
      return val;
    }
  }

  return output;
}

// Collect all MDX files for static generation.
export async function getStaticPaths() {
  return {
    paths: [{params: {markdownPath: []}}],
    fallback: false,
  };
}
