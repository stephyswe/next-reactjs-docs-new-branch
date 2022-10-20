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
  HomepageHero,
};

for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key];
    MDXComponent.mdxName = key;
  }
}
