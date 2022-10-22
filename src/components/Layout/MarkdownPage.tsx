/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {DocsPageFooter} from 'components/DocsFooter';
import {useRouteMeta} from './useRouteMeta';

export interface MarkdownProps {
  children?: React.ReactNode;
}

export function MarkdownPage({children}: MarkdownProps) {
  const {route, nextRoute, prevRoute} = useRouteMeta();
  return (
    <>
      <div className="pl-0">
        <div className="px-5 sm:px-12">
          <div className="max-w-7xl mx-auto">
            <div>{children}</div>
          </div>
          <DocsPageFooter
            route={route}
            nextRoute={nextRoute}
            prevRoute={prevRoute}
          />
        </div>
      </div>
    </>
  )
}
