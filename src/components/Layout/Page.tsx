/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Suspense} from 'react';
import * as React from 'react';
import {useRouter} from 'next/router';
import {Nav} from './Nav';
import {RouteItem, SidebarContext} from './useRouteMeta';
import {Footer} from './Footer';
import SocialBanner from '../SocialBanner';
import sidebarHome from '../../sidebarHome.json';

interface PageProps {
  children: React.ReactNode;
}

export function Page({children}: PageProps) {
  const {asPath} = useRouter();
  let routeTree = sidebarHome as RouteItem;
  return (
    <>
      <SocialBanner />
      <SidebarContext.Provider value={routeTree}>
        <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
          <div className="fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none z-50">
            <Nav />
          </div>
          {/* No fallback UI so need to be careful not to suspend directly inside. */}
          <Suspense fallback={null}>
            <main className="min-w-0">
            <div className="lg:hidden h-16 mb-2" />
              <article className="break-words" key={asPath}>
                {children}
              </article>
              <Footer />
            </main>
          </Suspense>
        </div>
      </SidebarContext.Provider>
    </>
  );
}
