function fillWithZero(intValue) {
  return intValue > 9 ? intValue : '0' + intValue;
}
export function list_to_tree(list) {
  var map = {},
    i;
  var root = [];
  root.files = [];
  map['/'] = root;
  for (i = 0; i < list.length; i += 1) {
    var node = list[i].substring(1);
    var current = {};
    current.type = 'file';
    current.name = node;
    var parent = root;
    if (node.indexOf('/') > 0) {
      var paths = node.split('/');
      for (var j = 0; j < paths.length - 1; j += 1) {
        var dirId = paths[j];
        var dir = map[dirId];
        if (dir == null) {
          dir = {};
          dir.type = 'folder';
          dir.name = dirId;
          dir.files = [];
          map[dirId] = dir;
          parent.files.push(dir);
        }
        parent = dir;
      }
      current.type = 'file';
      current.name = node.substr(node.lastIndexOf('/') + 1, node.length);
    }
    parent.files.push(current);
  }
  return parent.files;
}
