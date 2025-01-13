const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
  const isDir = !!nodes;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isDir) return;
    onSelect(path);
  };

  return (
    <div onClick={handleClick} style={{ marginLeft: "10px" }}>
      <p className={isDir ? "dir-node" : "file-node"}>{fileName}</p>
      {nodes && fileName !== "node_modules" && (
        <ul>
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={`${path}/${child}`}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ tree, onSelect }) => {
  return (
    <div className="file-tree">
      <FileTreeNode
        onSelect={onSelect}
        fileName="/"
        path=""
        nodes={tree}
      />
    </div>
  );
};

export default FileTree;