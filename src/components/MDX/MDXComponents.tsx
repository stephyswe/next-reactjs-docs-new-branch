/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import CodeBlock from './CodeBlock';
import {H2, H3} from './Heading';
import Intro from './Intro';
import Link from './Link';
import HomepageHero from './HomepageHero';
import Sandpack from './Sandpack';
import SimpleCallout from './SimpleCallout';

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="whitespace-pre-wrap my-4" {...p} />
);

const LI = (p: JSX.IntrinsicElements['li']) => (
  <li className="leading-relaxed mb-1" {...p} />
);
const UL = (p: JSX.IntrinsicElements['ul']) => (
  <ul className="ml-6 my-3 list-disc" {...p} />
);


function YouWillLearn({
  children,
  isChapter,
}: {
  children: any;
  isChapter?: boolean;
}) {
  let title = isChapter ? 'In this chapter' : 'You will learn';
  return <SimpleCallout title={title}>{children}</SimpleCallout>;
}

function LinkWithTodo({href, children, ...props}: JSX.IntrinsicElements['a']) {
  if (href?.startsWith('TODO')) {
    return children;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

export const MDXComponents = {
  p: P,
  ul: UL,
  li: LI,
  h2: H2,
  h3: H3,
  a: LinkWithTodo,
  pre: CodeBlock,
  MaxWidth({children}: {children: any}) {
    return <div className="max-w-4xl ml-0 2xl:mx-auto">{children}</div>;
  },
  HomepageHero,
  Intro,
  Sandpack,
  YouWillLearn
};

for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key];
    MDXComponent.mdxName = key;
  }
}
