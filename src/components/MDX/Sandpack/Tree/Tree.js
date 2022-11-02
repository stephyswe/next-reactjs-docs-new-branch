import React, {useReducer} from 'react';
import {v4} from 'uuid';

import {TreeContext, reducer} from './state';

import {Folder} from './Files/TreeFolder';
import {File} from './Files/TreeFile';

const Tree = ({data, onNodeClick}) => {
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <TreeContext.Provider
      value={{
        state,
        dispatch,
        onNodeClick: (node) => {
          onNodeClick && onNodeClick(node);
        },
      }}>
      <div className="StyledTree">
        <TreeRecusive data={state} parentNode={state} />
      </div>
    </TreeContext.Provider>
  );
};

const TreeRecusive = ({data, parentNode}) => {
  return data.map((item) => {
    item.parentNode = parentNode;
    if (!parentNode) {
      item.parentNode = data;
    }
    if (!item.id) item.id = v4();

    if (item.type === 'file') {
      return <File key={item.id} id={item.id} name={item.name} node={item} />;
    }
    if (item.type === 'folder') {
      return (
        <Folder key={item.id} id={item.id} name={item.name} node={item}>
          <TreeRecusive parentNode={item} data={item.files} />
        </Folder>
      );
    }
  });
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
