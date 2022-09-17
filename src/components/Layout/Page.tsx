/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {Footer} from './Footer';

export function Page() {
  return (
    <>
      <div>
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
