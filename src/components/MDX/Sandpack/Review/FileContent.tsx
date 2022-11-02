import { FileContentTopRow, FileContentRowNeutral } from "./RowVariants";

export const FileContent = () => {
  return (
    <div className="js-file-content Details-content--hidden position-relative">
      <div
        className="data highlight js-blob-wrapper"
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}>
        <table
          className="diff-table js-diff-table tab-size"
          data-tab-size="8"
          data-diff-anchor="diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519"
          data-paste-markdown-skip="">
          <tbody>
            <FileContentTopRow content="@@ -5,7 +5,7 @@" />
            <FileContentRowNeutral
              dataLineNumber={5}
              content={
                <>
                  <span className="pl-ent">"license"</span>:{' '}
                  <span className="pl-s">
                    <span className="pl-pds">"</span>CC
                    <span className="pl-pds">"</span>
                  </span>
                  ,
                </>
              }
            />
            {/*             <FileContentRowNeutral
                dataLineNumber={6}
                content={
                  <>
                    <span className="pl-ent">"scripts"</span>
                    {': {'}
                  </>
                }
              />
              <FileContentRowNeutral
                dataLineNumber={7}
                codeTabLength={2}
                content={
                  <>
                    <span className="pl-ent">"analyze"</span>
                    {': "ANALYZE=true next build",'}
                  </>
                }
              />
              <FileContentRowDeletion
                dataLineNumber={8}
                codeTabLength={2}
                content={
                  <>
                    <span className="pl-ent">"dev"</span>
                    {': "next-remote-watch ./src/content",'}
                  </>
                }
              />
              <FileContentRowAddition
                dataLineNumber={9}
                codeTabLength={2}
                content={
                  <>
                    <span className="pl-ent">"analyze"</span>
                    {': "ANALYZE=true next build",'}
                  </>
                }
              /> */}
            <FileContentTopRow content="." />
          </tbody>
        </table>
      </div>
    </div>
  );
};
