/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {Children} from 'react'
import * as React from 'react';

import CodeBlock from './CodeBlock';
import {CodeDiagram} from './CodeDiagram';
import ConsoleBlock from './ConsoleBlock';
import ExpandableCallout from './ExpandableCallout';
import ExpandableExample from './ExpandableExample';
import {H2, H3, H4} from './Heading';
import HomepageHero from './HomepageHero';
import InlineCode from './InlineCode';
import Intro from './Intro';
import Link from './Link';
import Recap from './Recap';
import Sandpack from './Sandpack';
import Diagram from './Diagram';
import DiagramGroup from './DiagramGroup';
import SimpleCallout from './SimpleCallout';
import TerminalBlock from './TerminalBlock';
import {Challenges, Hint, Solution} from './Challenges';
import {IconNavArrow} from '../Icon/IconNavArrow';
import ButtonLink from 'components/ButtonLink';

const P = (p: JSX.IntrinsicElements['p']) => (
  <p className="whitespace-pre-wrap my-4" {...p} />
);

const OL = (p: JSX.IntrinsicElements['ol']) => (
  <ol className="ml-6 my-3 list-decimal" {...p} />
);
const LI = (p: JSX.IntrinsicElements['li']) => (
  <li className="leading-relaxed mb-1" {...p} />
);
const UL = (p: JSX.IntrinsicElements['ul']) => (
  <ul className="ml-6 my-3 list-disc" {...p} />
);
const Wip = ({children}: {children: React.ReactNode}) => (
  <ExpandableCallout type="wip">{children}</ExpandableCallout>
);
const Pitfall = ({children}: {children: React.ReactNode}) => (
  <ExpandableCallout type="pitfall">{children}</ExpandableCallout>
);

const Note = ({children}: {children: React.ReactNode}) => (
  <ExpandableCallout type="note">{children}</ExpandableCallout>
);

const Blockquote = ({
  children,
  ...props
}: JSX.IntrinsicElements['blockquote']) => {
  return (
    <blockquote
      className="mdx-blockquote py-4 px-8 my-8 shadow-inner bg-highlight dark:bg-highlight-dark bg-opacity-50 rounded-lg leading-6 flex relative"
      {...props}>
      <span className="block relative">{children}</span>
    </blockquote>
  );
};

function LearnMore({
  children,
  path,
}: {
  title: string;
  path?: string;
  children: any;
}) {
  return (
    <>
      <section className="p-8 mt-16 mb-16 flex flex-row shadow-inner justify-between items-center bg-card dark:bg-card-dark rounded-lg">
        <div className="flex-col">
          <h2 className="text-primary dark:text-primary-dark font-bold text-2xl leading-tight">
            Ready to learn this topic?
          </h2>
          {children}
          {path ? (
            <ButtonLink
              className="mt-1"
              label="Read More"
              href={path}
              type="primary">
              Read More
              <IconNavArrow displayDirection="right" className="inline ml-1" />
            </ButtonLink>
          ) : null}
        </div>
      </section>
      <hr className="border-border dark:border-border-dark mb-14" />
    </>
  );
}

function Math({children}: {children: any}) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Regular, Georgia, serif',
        fontSize: '1.2rem',
      }}>
      {children}
    </span>
  );
}

function MathI({children}: {children: any}) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Italic, Georgia, serif',
        fontSize: '1.2rem',
      }}>
      {children}
    </span>
  );
}

function YouWillLearn({
  children,
  isChapter,
}: {
  children: any;
  isChapter?: boolean;
}) {
  let title = isChapter ? 'In this chapter' : 'You will learn';
  return <SimpleCallout title={title}>{children}</SimpleCallout>;
}

function LinkWithTodo({href, children, ...props}: JSX.IntrinsicElements['a']) {
  if (href?.startsWith('TODO')) {
    return children;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function AuthorCredit({
  author = 'Rachel Lee Nabors',
  authorLink = 'http://rachelnabors.com/',
}: {
  author: string;
  authorLink: string;
}) {
  return (
    <div className="sr-only group-hover:not-sr-only group-focus-within:not-sr-only hover:sr-only">
      <p className="bg-card dark:bg-card-dark text-center text-sm text-secondary dark:text-secondary-dark leading-tight dark:text-secondary-dark p-2 rounded-lg absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full group-hover:flex group-hover:opacity-100 after:content-[''] after:absolute after:left-1/2 after:top-[95%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-card after:dark:border-t-card-dark opacity-0 transition-opacity duration-300">
        <cite>
          Illustrated by{' '}
          {authorLink ? (
            <a
              target="_blank"
              rel="noreferrer"
              className="text-link dark:text-link-dark"
              href={authorLink}>
              {author}
            </a>
          ) : (
            author
          )}
        </cite>
      </p>
    </div>
  );
}

const IllustrationContext = React.createContext<{
  isInBlock?: boolean;
}>({
  isInBlock: false,
});

function Illustration({
  caption,
  src,
  alt,
  author,
  authorLink,
}: {
  caption: string;
  src: string;
  alt: string;
  author: string;
  authorLink: string;
}) {
  const {isInBlock} = React.useContext(IllustrationContext);

  return (
    <div className="relative group before:absolute before:-inset-y-16 before:inset-x-0 my-16 mx-0 2xl:mx-auto max-w-4xl 2xl:max-w-6xl">
      <figure className="my-8 flex justify-center">
        <img
          src={src}
          alt={alt}
          style={{maxHeight: 300}}
          className="bg-white rounded-lg"
        />
        {caption ? (
          <figcaption className="text-center leading-tight mt-4">
            {caption}
          </figcaption>
        ) : null}
      </figure>
      {!isInBlock && <AuthorCredit author={author} authorLink={authorLink} />}
    </div>
  );
}

const isInBlockTrue = {isInBlock: true};

function IllustrationBlock({
  sequential,
  author,
  authorLink,
  children,
}: {
  author: string;
  authorLink: string;
  sequential: boolean;
  children: any;
}) {
  const imageInfos = Children.toArray(children).map(
    (child: any) => child.props
  );
  const images = imageInfos.map((info, index) => (
    <figure key={index}>
      <div className="bg-white rounded-lg p-4 flex-1 flex xl:p-6 justify-center items-center my-4">
        <img src={info.src} alt={info.alt} height={info.height} />
      </div>
      {info.caption ? (
        <figcaption className="text-secondary dark:text-secondary-dark text-center leading-tight mt-4">
          {info.caption}
        </figcaption>
      ) : null}
    </figure>
  ));
  return (
    <IllustrationContext.Provider value={isInBlockTrue}>
      <div className="relative group before:absolute before:-inset-y-16 before:inset-x-0 my-16 mx-0 2xl:mx-auto max-w-4xl 2xl:max-w-6xl">
        {sequential ? (
          <ol className="mdx-illustration-block flex">
            {images.map((x: any, i: number) => (
              <li className="flex-1" key={i}>
                {x}
              </li>
            ))}
          </ol>
        ) : (
          <div className="mdx-illustration-block">{images}</div>
        )}
        <AuthorCredit author={author} authorLink={authorLink} />
      </div>
    </IllustrationContext.Provider>
  );
}

export const MDXComponents = {
  p: P,
  blockquote: Blockquote,
  ol: OL,
  ul: UL,
  li: LI,
  h2: H2,
  h3: H3,
  h4: H4,
  a: LinkWithTodo,
  code: InlineCode,
  pre: CodeBlock,
  CodeDiagram,
  ConsoleBlock,
  DeepDive: (props: {
    children: React.ReactNode;
    title: string;
    excerpt: string;
  }) => <ExpandableExample {...props} type="DeepDive" />,
  Diagram,
  DiagramGroup,
  FullWidth({children}: {children: any}) {
    return children;
  },
  MaxWidth({children}: {children: any}) {
    return <div className="max-w-4xl ml-0 2xl:mx-auto">{children}</div>;
  },
  Pitfall,
  Wip,
  HomepageHero,
  Illustration,
  IllustrationBlock,
  Intro,
  LearnMore,
  Math,
  MathI,
  Note,
  Recap,
  Sandpack,
  TerminalBlock,
  YouWillLearn,
  Challenges,
  Hint,
  Solution,
};

for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent: any = (MDXComponents as any)[key];
    MDXComponent.mdxName = key;
  }
}
