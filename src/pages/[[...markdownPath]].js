/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Fragment, useMemo} from 'react';
import {MDXComponents} from 'components/MDX/MDXComponents';
import {MarkdownPage} from 'components/Layout/MarkdownPage';
import {Page} from 'components/Layout/Page';

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
  
  // See if we have a cached output first.
  const {FileStore, stableHash} = require('metro-cache');
  const store = new FileStore({
    root: process.cwd() + '/node_modules/.cache/react-docs-mdx/',
  });
  const hash = Buffer.from(
    stableHash({
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      // ~~~~ IMPORTANT: Everything that the code below may rely on.
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      mdx,
      mdxComponentNames,
      DISK_CACHE_BREAKER,
      PREPARE_MDX_CACHE_BREAKER: 2,
      lockfile: fs.readFileSync(process.cwd() + '/yarn.lock', 'utf8'),
    })
  );
  const cached = await store.get(hash);
  if (cached) {
    console.log(
      'Reading compiled MDX for /' + path + ' from ./node_modules/.cache/'
    );
    return cached;
  }
}

// Collect all MDX files for static generation.
export async function getStaticPaths() {
  return {
    paths: [{params: {markdownPath: []}}],
    fallback: false,
  };
}
