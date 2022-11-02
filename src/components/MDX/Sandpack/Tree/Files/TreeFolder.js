import React, {useState, useEffect} from 'react';
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai';

import styles from '../../../styles/style.module.css';

import {FILE, FOLDER} from '../state/constants';
import {useTreeContext} from '../state/TreeContext';
import {PlaceholderInput} from '../TreePlaceholderInput';

const FolderName = ({isOpen, name, handleClick}) => (
  <div className="StyledName" onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </div>
);

const Folder = ({id, name, children, node}) => {
  const {dispatch, onNodeClick} = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [childs, setChilds] = useState([]);

  useEffect(() => {
    setChilds([children]);
  }, [children]);

  const commitFolderCreation = (name) => {
    dispatch({type: FOLDER.CREATE, payload: {id, name}});
  };
  const commitFileCreation = (name) => {
    dispatch({type: FILE.CREATE, payload: {id, name}});
  };
  const commitDeleteFolder = () => {
    dispatch({type: FOLDER.DELETE, payload: {id}});
  };
  const commitFolderEdit = (name) => {
    dispatch({type: FOLDER.EDIT, payload: {id, name}});
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setChilds([children]);
  };

  const handleNodeClick = React.useCallback(
    (event) => {
      event.stopPropagation();
      onNodeClick({node});
    },
    [node]
  );

  const handleFileCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="file"
        onSubmit={commitFileCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderCreation = (event) => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="folder"
        onSubmit={commitFolderCreation}
        onCancel={handleCancel}
      />,
    ]);
  };

  const handleFolderRename = () => {
    setIsOpen(true);
    setEditing(true);
  };

  return (
    <ul id={id} onClick={handleNodeClick} className="StyledFolder tree__folder">
      <section className={styles.VerticalLine}>
        <div className="ActionsWrapper">
          {isEditing ? (
            <PlaceholderInput
              type="folder"
              style={{paddingLeft: 0}}
              defaultValue={name}
              onCancel={handleCancel}
              onSubmit={commitFolderEdit}
            />
          ) : (
            <FolderName
              name={name}
              isOpen={isOpen}
              handleClick={() => setIsOpen(!isOpen)}
            />
          )}

          <div className="actions">
            <AiOutlineEdit onClick={handleFolderRename} />
            <AiOutlineFileAdd onClick={handleFileCreation} />
            <AiOutlineFolderAdd onClick={handleFolderCreation} />
            <AiOutlineDelete onClick={commitDeleteFolder} />
          </div>
        </div>
        <div
          className="Collapse tree__folder--collapsible"
          style={{maxHeight: isOpen ? '800px' : '0px'}}>
          {childs}
        </div>
      </section>
    </ul>
  );
};

export {Folder, FolderName};
