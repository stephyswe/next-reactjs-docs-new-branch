import cn from 'classnames';
import { FileContentCode } from './FileCode';

export function FileContentRowLine({
  codeTabLength,
  dataCodeMarker,
  fileCodeCn,
  dataLineCn,
  dataLineCn2,
  dataLineNumber,
  content,
  codeCn,
}: any) {
  const addition = dataCodeMarker === '+';
  const deletion = dataCodeMarker === '-';

  return (
    <tr
      data-hunk="0574beffa9537809356d9c96ec6fe8959bdf2adbc7f14f8038e5b0a32f1aba92"
      className="show-top-border">
      <td
        id="diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L5"
        data-line-number={addition ? '' : dataLineNumber}
        className={cn(
          dataLineCn ?? 'blob-num blob-num-context js-linkable-line-number'
        )}></td>

      <td
        id="diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519R5"
        data-line-number={deletion ? '' : dataLineNumber}
        className={cn(
          dataLineCn2 ??
            'blob-num blob-num-context js-linkable-line-number js-code-nav-line-number js-blob-rnum'
        )}></td>
      <FileContentCode
        codeTabLength={codeTabLength}
        fileCodeCn={fileCodeCn}
        content={content}
        codeCn={codeCn}
        dataCodeMarker={dataCodeMarker}
      />
    </tr>
  );
}
