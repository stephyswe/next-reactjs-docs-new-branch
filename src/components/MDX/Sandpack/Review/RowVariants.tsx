import { FileContentRowLine } from "./Row";

const FileContentRowDeletion = ({
  codeTabLength,
  content,
  dataLineNumber,
}: any) => {
  return (
    <FileContentRowLine
      fileCodeCn="blob-code blob-code-deletion js-file-line"
      dataLineCn="blob-num blob-num-deletion js-linkable-line-number"
      dataLineCn2="blob-num blob-num-deletion empty-cell"
      dataLineNumber={dataLineNumber}
      codeCn="blob-code-inner blob-code-marker js-code-nav-pass"
      dataCodeMarker="-"
      content={content}
      codeTabLength={codeTabLength}
    />
  );
};

const FileContentRowAddition = ({
  codeTabLength,
  dataLineNumber,
  content,
}: any) => {
  return (
    <FileContentRowLine
      addition
      fileCodeCn="blob-code blob-code-addition  js-file-line"
      dataLineCn="blob-num blob-num-addition empty-cell"
      dataLineCn2="blob-num blob-num-addition js-linkable-line-number js-code-nav-line-number js-blob-rnum"
      dataLineNumber={dataLineNumber}
      codeCn="blob-code-inner blob-code-marker js-code-nav-pass"
      dataCodeMarker="+"
      content={content}
      codeTabLength={codeTabLength}
    />
  );
};

const FileContentRowNeutral = ({
  codeTabLength,
  content,
  dataLineNumber,
}: any) => {
  if (codeTabLength) console.log('FileContentRowNeutral', codeTabLength);
  return (
    <FileContentRowLine
      dataLineNumber={dataLineNumber}
      codeCn="blob-code-inner blob-code-marker js-code-nav-pass"
      content={content}
      codeTabLength={codeTabLength}
    />
  );
};

function FileContentTopRow({content}: {content: string}) {
  return (
    <tr>
      <FileContentNum />
      <td className="blob-code blob-code-inner blob-code-hunk">{content}</td>
    </tr>
  );
}

function FileContentNum() {
  return (
    <td className="blob-num blob-num-expandable" colSpan={2}>
      <a
        href="#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519"
        className="js-expand directional-expander single-expander"
        title="Expand Up"
        aria-label="Expand Up"
        data-url="/stephyswe/next-reactjs-docs-branch/blob_excerpt/1757297f96673500688b152edac2322af67842cd?diff=unified&amp;direction=up&amp;in_wiki_context=&amp;last_left=&amp;last_right=&amp;left=5&amp;left_hunk_size=7&amp;mode=100644&amp;path=package.json&amp;right=5&amp;right_hunk_size=7"
        data-left-range="1-4"
        data-right-range="1-4">
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          className="octicon octicon-fold-up">
          <path d="M7.823 1.677L4.927 4.573A.25.25 0 005.104 5H7.25v3.236a.75.75 0 101.5 0V5h2.146a.25.25 0 00.177-.427L8.177 1.677a.25.25 0 00-.354 0zM13.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-3.75.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM7.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM4 11.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM1.75 11a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"></path>
        </svg>
      </a>
    </td>
  );
}

export {
  FileContentRowDeletion,
  FileContentRowAddition,
  FileContentRowNeutral,
  FileContentTopRow,
};
