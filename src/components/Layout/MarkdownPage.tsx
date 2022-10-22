/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {DocsPageFooter} from 'components/DocsFooter';
import PageHeading from 'components/PageHeading';
import {useRouteMeta} from './useRouteMeta';

export interface MarkdownProps<Frontmatter> {
  meta: Frontmatter & {description?: string};
  children?: React.ReactNode;
}

export function MarkdownPage<
T extends {title: string; status?: string} = {title: string; status?: string}
>({children, meta}: MarkdownProps<T>) {
  const {route, nextRoute, prevRoute} = useRouteMeta();
  const title = meta.title || route?.title || '';
  const description = meta.description || route?.description || '';
  const isHomePage = route?.path === '/';
  return (
    <>
      <div className="pl-0">
        {!isHomePage && (
          <PageHeading
            title={title}
            description={description}
          />
        )}
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
