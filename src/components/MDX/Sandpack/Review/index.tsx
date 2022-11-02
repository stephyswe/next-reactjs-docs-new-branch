import {FileContent} from './FileContent';
import {FileTop} from './FileTop';

export const CodePreview = () => {
  return (
    <div
      className="file js-file js-details-container js-targetable-element show-inline-notes Details
        Details--on open js-tagsearch-file bg-[#1F242D]"
      style={{
        minWidth: '600px',
      }}>
      <FileTop />
      <FileContent />
    </div>
  );
};
