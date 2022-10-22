/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {H1} from './MDX/Heading';

interface PageHeadingProps {
  title: string;
  status?: string;
  description?: string;
}

function PageHeading({
  title,
  status,
  description,
}: PageHeadingProps) {
  return (
    <div className="px-5 sm:px-12 pt-8 sm:pt-7 lg:pt-5">
      <div className="max-w-4xl ml-0 2xl:mx-auto">
        {/* {tags ? <Breadcrumbs /> : null} */}
        <H1 className="mt-0 text-primary dark:text-primary-dark -mx-.5 break-words">
          {title}
          {status ? <em>—{status}</em> : ''}
        </H1>
        {description && (
          <p className="mt-4 mb-6 text-primary dark:text-primary-dark text-xl text-gray-90 leading-large">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageHeading;
