/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {Nav} from './Nav';
import {Footer} from './Footer';
import SocialBanner from '../SocialBanner';

export function Page() {
  return (
    <>
      <SocialBanner />
      <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
        <div className="fixed lg:sticky top-0 left-0 right-0 py-0 shadow lg:shadow-none z-50">
          <Nav />
        </div>
        {/* No fallback UI so need to be careful not to suspend directly inside. */}
        <React.Suspense fallback={null}>
          <main className="min-w-0">
            <Footer />
          </main>
        </React.Suspense>
      </div>
    </>
  );
}
