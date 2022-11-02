import cn from 'classnames';

export function FileContentCode({
  codeTabLength,
  fileCodeCn,
  codeCn,
  content,
  dataCodeMarker,
}: any) {
  const handleTabLength = (length: number) => {
    return Array(length).fill(<>&ensp;</>);
  };

  return (
    <td
      className={cn(fileCodeCn ?? 'blob-code blob-code-context js-file-line')}>
      <button
        data-path="package.json"
        data-anchor="diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519"
        data-position="1"
        data-side="right"
        data-line="5"
        data-original-line='   "license": "CC",'
        aria-label="Add line comment"
        type="button"
        data-view-component="true"
        className="add-line-comment js-add-line-comment js-add-single-line-comment btn-link">
        {' '}
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className="octicon octicon-plus">
          <path
            fillRule="evenodd"
            d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
        </svg>
      </button>{' '}
      <span className={codeCn} data-code-marker={dataCodeMarker ?? ''}>
        {codeTabLength > 0 ? handleTabLength(codeTabLength) : null}
        {content}
      </span>
    </td>
  );
}
