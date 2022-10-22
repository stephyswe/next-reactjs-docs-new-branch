/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';
import {AppProps} from 'next/app';

import '../styles/index.css';
import '../styles/sandpack.css';

export default function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}
