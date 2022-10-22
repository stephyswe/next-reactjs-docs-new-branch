/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Children} from 'react';

// TODO: This logic could be in MDX plugins instead.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const PREPARE_MDX_CACHE_BREAKER = 2;
// !!! IMPORTANT !!! Bump this if you change any logic.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function prepareMDX(rawChildren) {
  const toc = getTableOfContents(rawChildren);
  const children = wrapChildrenInMaxWidthContainers(rawChildren);
  return {toc, children};
}

function wrapChildrenInMaxWidthContainers(children) {
  // Auto-wrap everything except a few types into
  // <MaxWidth> wrappers. Keep reusing the same
  // wrapper as long as we can until we meet
  // a full-width section which interrupts it.
  let fullWidthTypes = [
    'Sandpack',
  ];
  let wrapQueue = [];
  let finalChildren = [];
  function flushWrapper(key) {
    if (wrapQueue.length > 0) {
      const Wrapper = 'MaxWidth';
      finalChildren.push(<Wrapper key={key}>{wrapQueue}</Wrapper>);
      wrapQueue = [];
    }
  }
  function handleChild(child, key) {
    if (child == null) {
      return;
    }
    if (typeof child !== 'object') {
      wrapQueue.push(child);
      return;
    }
    if (fullWidthTypes.includes(child.type)) {
      flushWrapper(key);
      finalChildren.push(child);
    } else {
      wrapQueue.push(child);
    }
  }
  Children.forEach(children, handleChild);
  flushWrapper('last');
  return finalChildren;
}

function getTableOfContents(children) {
  const anchors = Children.toArray(children)
    .filter((child) => {
      if (child.type) {
        return ['h1', 'h2', 'h3'].includes(child.type);
      }
      return false;
    })
    .map((child) => {
      return {
        url: '#' + child.props.id,
        depth: (child.type && parseInt(child.type.replace('h', ''), 0)) ?? 0,
        text: child.props.children,
      };
    });
  if (anchors.length > 0) {
    anchors.unshift({
      url: '#',
      text: 'Overview',
      depth: 2,
    });
  }
  return anchors;
}
