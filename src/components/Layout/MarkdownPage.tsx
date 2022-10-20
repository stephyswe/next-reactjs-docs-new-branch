/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

export interface MarkdownProps {
  children?: React.ReactNode;
}

export function MarkdownPage({children}: MarkdownProps) {
  return (
    <>
      <div className="pl-0">
        <div className="px-5 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
