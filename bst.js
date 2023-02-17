class Node {
  constructor(value){
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }
  
  insert(value){
    if(this.root == null) {
      this.root = new Node(value)
    } else {
      let currentNode = this.root
      let parentNode = this.root
      while (currentNode != null) {
        if(value > currentNode.value) {
          if (currentNode.right == null) {
            parentNode = currentNode
          }
          currentNode = currentNode.right 
        } else {
          if (currentNode.left == null) {
            parentNode = currentNode
          }
          currentNode = currentNode.left
        }
      }
      
      if (value > parentNode.value) {
        parentNode.right = new Node(value)
      } else {
        parentNode.left = new Node(value)
      }

    }
  }
  lookup(value){
    if(this.root == null) {
      return false
    } else {
      let currentNode = this.root
      while(currentNode != null) {
        if(value == currentNode.value) {
          return true
        }
        if(value > currentNode.value) {
          currentNode = currentNode.right
        } else {
          currentNode = currentNode.left
        }
      }
    }
    return false
  }

  remove(value) {
    let currentNode = this.root
    let parentNode = this.root
    let flag = true
    while(flag && currentNode !== null) {
      if(value == currentNode.value) {
        flag = false
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right
      } else {
        parentNode = currentNode;
        currentNode = currentNode.left
      }
    }

    console.log("current node value is: " + currentNode.value)
    
    if (currentNode == null) {
      return false;
    }

    if (currentNode.left == null && currentNode.right == null) {
      if(currentNode.value > parentNode.value) {
        parentNode.right = null
      } else{
        parentNode.left = null
      }
      currentNode = null
      return true
    } else if (currentNode.right == null && currentNode.left !== null) {
      let successorNode = currentNode.left
      currentNode = null
      parentNode.left = successorNode
    } else if (currentNode.left == null && currentNode.right !== null) {
      let successorNode = currentNode.right
      currentNode = null
      parentNode.right = successorNode
    } else {
      let successorNode = currentNode;
      successorNode = successorNode.right
      if(successorNode.left == null) {
        successorNode.left = currentNode.left
        currentNode = null
        if(successorNode.value > parentNode.value) {
          parentNode.right = successorNode 
        } else {
          parentNode.left = successorNode
        }
        return true
      }
      while (successorNode.left !== null) {
        successorNode = successorNode.left
      }
      currentNode.value = successorNode.value
      successorNode = null
      return true 
    }
  }
}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(170)
tree.insert(180)
tree.insert(1)
console.log(tree.remove(20))
// console.log(tree.lookup(9))
console.log(JSON.stringify(traverse(tree.root)))

//     9
//  4     20
//1  6  15  170

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}





