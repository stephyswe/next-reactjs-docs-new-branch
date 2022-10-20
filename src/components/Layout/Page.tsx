/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Suspense} from 'react';
import * as React from 'react';
import {Nav} from './Nav';
import {RouteItem, SidebarContext} from './useRouteMeta';
import {Footer} from './Footer';
import SocialBanner from '../SocialBanner';
import sidebarHome from '../../sidebarHome.json';

export function Page() {
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
              <Footer />
            </main>
          </Suspense>
        </div>
      </SidebarContext.Provider>
    </>
  );
}
