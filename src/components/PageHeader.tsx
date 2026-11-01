import type { ReactNode } from "react";
import { BackLink } from "./BackLink";

type HeaderActionProps = {
  children?: ReactNode;
};

function HeaderAction({ children }: HeaderActionProps) {
  return children ? <div className="shrink-0">{children}</div> : null;
}

export type WorkspacePageHeaderProps = {
  count?: number;
  description?: string;
  id: string;
  primaryAction?: ReactNode;
  title: string;
};

export function WorkspacePageHeader({
  count,
  description,
  id,
  primaryAction,
  title,
}: WorkspacePageHeaderProps) {
  const titleId = `${id}-title`;

  return (
    <header
      aria-labelledby={titleId}
      className="flex max-w-page flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      data-page-header="workspace"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1
            className="m-0 font-serif text-2xl leading-snug font-semibold tracking-tight md:text-[1.75rem]"
            id={titleId}
          >
            {title}
          </h1>
          {count === undefined ? null : (
            <span className="text-sm font-semibold text-text-muted">
              {count}件
            </span>
          )}
        </div>
        {description ? (
          <p
            className={`max-w-article mt-1.5 mb-0 text-sm leading-7 text-text-muted`}
          >
            {description}
          </p>
        ) : null}
      </div>
      <HeaderAction>{primaryAction}</HeaderAction>
    </header>
  );
}

export type PublicPageHeaderProps = {
  id: string;
  lead?: string;
  meta?: ReactNode;
  title: string;
};

export function PublicPageHeader({
  id,
  lead,
  meta,
  title,
}: PublicPageHeaderProps) {
  const titleId = `${id}-title`;

  return (
    <header
      aria-labelledby={titleId}
      className="max-w-article"
      data-page-header="public"
    >
      <h1
        className="m-0 font-serif text-3xl leading-tight font-semibold tracking-tight md:text-4xl"
        id={titleId}
      >
        {title}
      </h1>
      {lead ? (
        <p className="mt-3 mb-0 text-base leading-7 text-text-muted">{lead}</p>
      ) : null}
      {meta ? <div className="mt-3 text-sm text-text-muted">{meta}</div> : null}
    </header>
  );
}

export type MarketingPageHeaderProps = {
  eyebrow?: string;
  id: string;
  lead?: string;
  primaryAction?: ReactNode;
  title: string;
};

export function MarketingPageHeader({
  eyebrow,
  id,
  lead,
  primaryAction,
  title,
}: MarketingPageHeaderProps) {
  const titleId = `${id}-title`;

  return (
    <header
      aria-labelledby={titleId}
      className="max-w-page"
      data-page-header="marketing"
    >
      {eyebrow ? (
        <p className="m-0 text-xs font-black tracking-widest text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className="mt-3 mb-0 max-w-article font-serif text-3xl leading-tight font-medium tracking-tight md:text-4xl"
        id={titleId}
      >
        {title}
      </h1>
      {lead ? (
        <p className="mt-4 mb-0 max-w-article text-base leading-7 text-text-muted">
          {lead}
        </p>
      ) : null}
      {primaryAction ? <div className="mt-6">{primaryAction}</div> : null}
    </header>
  );
}

/** 記入画面の上位一覧と現在の操作を、色に頼らず示す。 */
export function FormLocation({
  href,
  listLabel,
  current,
}: {
  href: string;
  listLabel: string;
  current: string;
}) {
  return (
    <nav aria-label="記入画面の現在位置">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm">
        <li>
          <BackLink href={href} label={listLabel} />
        </li>
        <li aria-hidden="true" className="text-text-muted">
          /
        </li>
        <li aria-current="page" className="font-semibold">
          {current}
        </li>
      </ol>
    </nav>
  );
}
