const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new class TreeNode {
      constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null
      }
    } (data);
    if (this.rootNode == null) {
      this.rootNode = newNode;
    } else {
      this._addNode(this.rootNode, newNode);
    }
  }

  _addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left == null) {
        node.left = newNode;
      } else {
        this._addNode(node.left, newNode);
      }
    } else {
      if (node.right == null) {
        node.right = newNode;
      } else {
        this._addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) != null;
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      return node;
    }
    return data < node.data ? this._findNode(node.left, data) : this._findNode(node.right, data);
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
    } else {
      if (node.left == null) {
        return node.right;
      } else if (node.right == null) {
        return node.left;
      }

      let minNode = this._minNode(node.right);
      node.data = minNode.data;
      node.right = this._removeNode(node.right, minNode.data);
    }
    return node;
  }

  min() {
    let minNode = this._minNode(this.rootNode);
    return minNode ? minNode.data : null;
  }

  _minNode(node) {
    while (node && node.left != null) {
      node = node.left;
    }
    return node;
  }

  max() {
    let maxNode = this._maxNode(this.rootNode);
    return maxNode ? maxNode.data : null;
  }

  _maxNode(node) {
    while (node && node.right != null) {
      node = node.right;
    }
    return node;
  }
}


module.exports = {
  BinarySearchTree
};
