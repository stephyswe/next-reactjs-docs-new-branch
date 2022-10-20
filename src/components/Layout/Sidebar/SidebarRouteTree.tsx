/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {RouteItem} from 'components/Layout/useRouteMeta';
import {useRouter} from 'next/router';
import {removeFromLast} from 'utils/removeFromLast';
import {SidebarLink} from './SidebarLink';

interface SidebarRouteTreeProps {
  isForceExpanded: boolean;
  routeTree: RouteItem;
  level?: number;
}

export function SidebarRouteTree({
  routeTree,
  level = 0,
}: SidebarRouteTreeProps) {
  const cleanedPath = useRouter().asPath.split(/[\?\#]/)[0];
  const slug = cleanedPath;
  const currentRoutes = routeTree.routes as RouteItem[];

  return (
    <ul>
      {currentRoutes.map(({path, title, routes, wip, heading}) => {
        const pagePath = path && removeFromLast(path, '.');
        const selected = slug === pagePath;

        // if current route item has no path and children treat it as an API sidebar heading
        if (!path || !pagePath || heading) {
          return
        }

        // if route has a path and child routes, treat it as an expandable sidebar item
        if (routes) {
          return
        }

        // if route has a path and no child routes, treat it as a sidebar link
        return (
          <li key={`${title}-${path}-${level}-link`}>
            <SidebarLink
              href={path.startsWith('https://') ? path : pagePath}
              selected={selected}
              level={level}
              title={title}
            />
          </li>
        );
      })}
    </ul>
  );
}
