/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

interface PageProps {
  children: React.ReactNode;
}

export function Page({children}: PageProps) {
  return <>Page{children}</>;
}
