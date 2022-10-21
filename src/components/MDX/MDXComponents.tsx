/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import HomepageHero from './HomepageHero';

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="whitespace-pre-wrap my-4" {...p} />
);

export const MDXComponents = {
  p: P,
  MaxWidth({children}: {children: any}) {
    return <div className="max-w-4xl ml-0 2xl:mx-auto">{children}</div>;
  },
  HomepageHero,
};

for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key];
    MDXComponent.mdxName = key;
  }
}
