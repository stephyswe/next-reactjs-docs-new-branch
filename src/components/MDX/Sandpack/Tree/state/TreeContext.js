import { createContext, useContext } from "react";

const defaultValue = {
  dispatch: null,
  state: null,
  onNodeClick: () => {}
};
const TreeContext = createContext(defaultValue);

const useTreeContext = () => useContext(TreeContext);

export { TreeContext, useTreeContext };
