import { SvgBtnExpand, SvgBtnOctiConOne, SvgCopyCode } from "./icons";

export const FileTop = () => {
  return (
    <div className="flex items-center box-border flex-row p-[4px_8px] file-header">
      <FileTopLeft />
      <div className="float-right pt-0 ml-2">
        <div className="flex justify-end">
          {/* <span className="BtnGroup flex-auto min-width-0">
              <form className="BtnGroup-parent js-prose-diff-toggle-form"></form>
              <form></form>
            </span> */}
          {/*  <details className="">
              <summary>
                <div>
                  <SvgShowOptions />
                </div>
              </summary>
            </details> */}
        </div>
      </div>
    </div>
  );
};

function FileTopLeft() {
  return (
    <div className="flex-auto">
      <button className="btn-octicon">
        <SvgBtnOctiConOne />
        {/* <SvgBtnOctiConTwo /> */}
      </button>
      <div className="inline-block box-border">
        <button className="btn-link relative inline-block">
          <SvgBtnExpand />
        </button>
        {/* <button className="btn-link color-fg-muted">
              <SvgBtnCollapse />
            </button> */}
      </div>
      <span
        className="diffstat tooltipped tooltipped-e"
        aria-label="2 changes: 1 addition &amp; 1 deletion">
        2 <span className="diffstat-block-added"></span>
        <span className="diffstat-block-deleted"></span>
        <span className="diffstat-block-neutral"></span>
        <span className="diffstat-block-neutral"></span>
        <span className="diffstat-block-neutral"></span>
      </span>
      <span className="ml-2 Truncate">
        <a
          title="package.json"
          className="Link--primary Truncate-text"
          href="#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519">
          package.json
        </a>
        <SvgCopyCode />
      </span>
    </div>
  );
}
