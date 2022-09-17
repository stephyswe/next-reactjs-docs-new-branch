/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
  reactStrictMode: true,
  experimental: {
    plugins: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
  },
};

module.exports = nextConfig;
