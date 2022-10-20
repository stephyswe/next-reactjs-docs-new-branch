/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {createContext} from 'react';

/**
 * While Next.js provides file-based routing, we still need to construct
 * a sidebar for navigation and provide each markdown page
 * previous/next links and titles. To do this, we construct a nested
 * route object that is infinitely nestable.
 */

export interface RouteItem {
  /** Page title (for the sidebar) */
  title: string;
  /** Optional page description for heading */
  description?: string;
  /** Path to page */
  path?: string;
  /** Whether the entry is a heading */
  heading?: boolean;
  /** Whether the page is under construction */
  wip?: boolean;
  /** List of sub-routes */
  routes?: RouteItem[];
}

export const SidebarContext = createContext<RouteItem>({title: 'root'});