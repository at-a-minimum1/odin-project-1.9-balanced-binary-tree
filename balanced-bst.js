class Node {
	constructor(data, leftChildren, rightChildren) {
		this.data = data;
		this.leftChildren = leftChildren;
		this.rightChildren = rightChildren;
	}
	setNode(data, leftChildren, rightChildren) {
		this.data = data;
		this.leftChildren = leftChildren;
		this.rightChildren = rightChildren;
	}
}
class Tree {
	constructor(root) {
		this.root = root;
	}
	// Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
	isBalanced() {
		if (!this.root) {
			return;
		}

		let leftHeight = 0;
		let rightHeight = 0;
		if (this.root.leftChildren) {
			leftHeight = this.height(this.root.leftChildren);
		}
		if (this.root.rightChildren) {
			rightHeight = this.height(this.root.rightChildren);
		}

		let difference = Math.abs(leftHeight - rightHeight);

		return difference <= 1;
	}
	// TODO Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.
	insertItem(value) {
		if (value == null || value == undefined) {
			return;
		}
		if (this.findItem(value)) {
			console.error("Value is already in the tree.");
		}
		const insertNode = new Node(value, null, null);
		if (!this.root) {
			this.root = insertNode;
			return;
		}
		let currentNode = this.root;

		while (currentNode) {
			if (currentNode.data < value) {
				if (!currentNode.rightChildren) {
					currentNode.rightChildren = insertNode;
					break;
				} else {
					currentNode = currentNode.rightChildren;
				}
			} else {
				if (!currentNode.leftChildren) {
					currentNode.leftChildren = insertNode;
					break;
				} else {
					currentNode = currentNode.leftChildren;
				}
			}
		}
	}
	deleteItem(deleteValue) {
		if (deleteValue == null || deleteValue == undefined) {
			return;
		}
		if (!this.findItem(deleteValue)) {
			console.error("Item doesn't exist in tree.");
			return;
		}
		let deleteNode = this.findItem(deleteValue);
		// TODO handle cases where the node to be deleted is the root node
		if (deleteNode === this.root) {
			console.log("the node being deleted is the root");
			return;
		}

		let rightNode = null;
		let leftNode = null;
		let parentNode = this.findParent(deleteValue);
		if (!parentNode) {
			console.error("ERROR: Parent Node doesn't exist");
			return;
		}

		if (deleteNode.leftChildren) {
			leftNode = deleteNode.leftChildren;
		}
		if (deleteNode.rightChildren) {
			rightNode = deleteNode.rightChildren;
		}

		// 	Node with no children (Leaf node): Simply remove the node from the tree.
		if (rightNode == null && leftNode == null) {
			console.log(
				"BOTH CHILD IS NULL DND: " +
					deleteNode.data +
					" PND: " +
					parentNode.data
			);
			if (deleteNode.data > parentNode.data) {
				parentNode.setNode(parentNode.data, parentNode.leftChildren, null);
				deleteNode = null;
			} else {
				parentNode.setNode(parentNode.data, null, parentNode.rightChildren);
			}
		}

		// TODO "consider the full process of finding the in-order successor/predecessor, moving its value up, and then properly removing the successor/predecessor node."
		if ((rightNode && !leftNode) || (leftNode && !rightNode)) {
			if (!leftNode) {
				parentNode.setNode(
					parentNode.data,
					parentNode.leftChildren,
					deleteNode.rightChildren
				);
				deleteNode = null;
			} else {
				parentNode.setNode(
					parentNode.data,
					deleteNode.leftChildren,
					parentNode.rightChildren
				);
				// TODO determine if delete should be used rather than setting to null
				// delete deleteNode;
				deleteNode = null;
			}
		}

		// Node with two children: Find the in-order successor of the node (the smallest node in its right subtree) or the in-order predecessor (the largest node in its left subtree), and
		// replace the value of the node to be deleted with the found in-order successor or predecessor.
		// Then, delete the in-order successor (or predecessor) node from the tree, which will now be a leaf node or a node with one child. This way, the binary search tree property is preserved.
		if (rightNode && leftNode) {
			console.log(
				"BOTH CHILD IS NOT NULL DeleteNodeData:" +
					deleteNode.data +
					" PND: " +
					parentNode.data
			);
			// Start down the right path and find the leftmost node from there
			let currentNode = rightNode;

			if (currentNode.leftChildren == null) {
				deleteNode.setNode(currentNode.data, deleteNode.leftChildren, null);
			} else {
				while (currentNode.leftChildren) {
					currentNode = currentNode.leftChildren;
				}

				deleteNode.setNode(
					currentNode.data,
					deleteNode.leftChildren,
					deleteNode.rightChildren
				);
			}
		}
	}

	findItem(value, inputNode = this.root) {
		if (inputNode === null) {
			return;
		}

		if (value === inputNode.data) {
			return inputNode;
		}

		let rightNode = inputNode.rightChildren || null;
		let leftNode = inputNode.leftChildren || null;
		if (inputNode.data < value) {
			return this.findItem(value, rightNode);
		} else {
			return this.findItem(value, leftNode);
		}
	}
	findParent(value, inputNode = this.root) {
		if (!inputNode) {
			return;
		}
		let rightNode = null;
		let leftNode = null;
		if (inputNode.rightChildren) {
			rightNode = inputNode.rightChildren;
			if (rightNode.data === value) {
				return inputNode;
			}
		}
		if (inputNode.leftChildren) {
			leftNode = inputNode.leftChildren;
			if (leftNode.data === value) {
				return inputNode;
			}
		}

		if (inputNode.data < value) {
			return this.findParent(value, rightNode);
		} else {
			return this.findParent(value, leftNode);
		}
	}
	// Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept an optional callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided callback. The functions should return an array of values if no callback is given as an argument.
	inOrder(callback, node = this.root) {
		let arrayOfValues = [];
		if (!callback) {
			return arrayOfValues;
		}
		if (node) {
			if (typeof callback === "function") {
				this.inOrder(callback, node.leftChildren);
				callback(node);
				this.inOrder(callback, node.rightChildren);
			} else {
				console.error("Callback is not a function");
			}
		}
	}

	preOrder(callback, node = this.root) {
		let arrayOfValues = [];
		if (!callback) {
			return arrayOfValues;
		}
		if (node) {
			if (typeof callback === "function") {
				callback(node);
				this.preOrder(callback, node.leftChildren);
				this.preOrder(callback, node.rightChildren);
			} else {
				console.error("Callback is not a function");
			}
		}
	}

	postOrder(callback, node = this.root) {
		let arrayOfValues = [];
		if (!callback) {
			return arrayOfValues;
		}
		if (node) {
			if (typeof callback === "function") {
				this.postOrder(callback, node.leftChildren);
				this.postOrder(callback, node.rightChildren);
				callback(node);
			} else {
				console.error("Callback is not a function");
			}
		}
	}
	// Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
	height(node, nodeHeight = 0) {
		if (!node) {
			return -1;
		}

		if (!node.rightChildren && !node.leftChildren) {
			return nodeHeight;
		}

		const leftHeight = this.height(node.leftChildren, nodeHeight + 1);
		const rightHeight = this.height(node.rightChildren, nodeHeight + 1);

		return Math.max(leftHeight, rightHeight);
	}
	// Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
	depth(node) {
		if (!node) {
			return -1;
		}
		let currentNode = this.root;
		let depthNumber = 0;
		while (currentNode) {
			if (node === currentNode) {
				return depthNumber;
			}
			if (currentNode.data > node.data) {
				currentNode = currentNode.leftChildren;
			} else {
				currentNode = currentNode.rightChildren;
			}
			depthNumber++;
		}
		return -1;
	}

	// Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
	rebalance(inputTree = this.root) {
		// Error checking
		if (inputTree === null) {
			return;
		}

		let currentNode = this.root;
		const unpreparedArray = [];
		const nodeStack = [this.root];
		// Traverse the tree's nodes
		while (nodeStack.length > 0) {
			if (currentNode.rightChildren != null) {
				nodeStack.push(currentNode.rightChildren);
			}
			if (currentNode.leftChildren != null) {
				nodeStack.push(currentNode.leftChildren);
			}
			unpreparedArray.push(currentNode.data);
			currentNode = nodeStack.pop();
		}

		const balancedTree = buildTree(unpreparedArray);
		this.root = balancedTree;

		return balancedTree;
	}
}

function randomizeArray() {
	const arraySize = Math.trunc(Math.random() * (20 - 2));
	const randomArray = new Array();
	for (let i = 0; i < arraySize; i++) {
		randomArray.push(Math.trunc(Math.random() * (100 - 1)));
	}
	return randomArray;
}

function prepareArray(inputArray) {
	let unique = [];
	if (inputArray.length < 1) {
		return null;
	}
	if (inputArray.length === 1) {
		return [inputArray[0]];
	} else {
		inputArray.sort(function (a, b) {
			return a - b;
		});
		inputArray.forEach((element) => {
			if (!unique.includes(element)) {
				unique.push(element);
			}
		});
	}

	return unique;
}

function buildTree(inputArray) {
	let rootNode;
	let preparedArray = prepareArray(inputArray);
	if (preparedArray === null) {
		return null;
	}

	if (preparedArray.length === 1) {
		rootNode = new Node(preparedArray[0], null, null);
	} else {
		let midPointLocation = Math.trunc(preparedArray.length / 2);

		let leftArray = preparedArray.slice(0, midPointLocation);
		let rightArray = preparedArray.slice(midPointLocation + 1);
		let midPointRoot = preparedArray[midPointLocation];

		let leftChild = buildTree(leftArray);
		let rightChild = buildTree(rightArray);
		rootNode = new Node(midPointRoot, leftChild, rightChild);
	}

	return rootNode;
}

// Write a levelOrder(callback) function that accepts an optional callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. levelOrder may be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no callback is given as an argument. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).
function levelOrder(callback) {
	const nodeStack = [this.Tree];
	const resultArray = [this.Tree];
	let currentNode;
	while (nodeStack.length > 0) {
		currentNode = nodeStack.shift();
		if (currentNode.leftChildren) {
			nodeStack.push(currentNode.leftChildren);
		}
		if (currentNode.rightChildren) {
			nodeStack.push(currentNode.rightChildren);
		}
		if (callback) {
			callback(currentNode);
		} else {
			resultArray.push(currentNode);
		}
	}
	if (!callback) {
		return resultArray;
	}
}

function printElement(element) {
	let message = `Current Node Value: `;
	if (element) {
		message += `${element.data}`;
		if (element.leftChildren) {
			message += ` Left Node Value: ${element.leftChildren.data}`;
		}
		if (element.rightChildren) {
			message += ` Right Node Value: ${element.rightChildren.data}`;
		}
		console.log(message);
	}
}

// Write a driver script that does the following:
function driverScript() {
	// 1) Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
	let randomArray = randomizeArray();
	let randomTree = new Tree(buildTree(randomArray));

	// 2) Confirm that the tree is balanced by calling isBalanced.
	console.assert(
		randomTree.isBalanced() != false,
		"isBalanced should return true and not false"
	);

	// 3) Print out all elements in level, pre, post, and in order.
	// console.log(randomArray);
	// //---- Pre order
	// console.log("-----------------Pre-Order:-----------------");
	// randomTree.preOrder(printElement);
	// //---- Post order
	// console.log("-----------------Post-Order-----------------");
	// randomTree.postOrder(printElement);
	// //---- In order
	// console.log("-----------------In Order-----------------");
	// randomTree.inOrder(printElement);
	// console.log("-----------------End of log-----------------");

	// 4) Unbalance the tree by adding several numbers > 100.
	randomTree.insertItem(188);
	randomTree.insertItem(123);
	randomTree.insertItem(143);
	randomTree.insertItem(199);
	// Adding the values to the array just for the display.
	randomArray.push(188, 123, 143, 199);

	// 5) Confirm that the tree is unbalanced by calling isBalanced.
	console.assert(
		randomTree.isBalanced() == false,
		"is Balanced should return false and not true"
	);
	// 6) Balance the tree by calling rebalance.
	randomTree.rebalance();

	// 7) Confirm that the tree is balanced by calling isBalanced.
	console.assert(
		randomTree.isBalanced() == true,
		"isBalanced should return true and not false"
	);

	// 8) Print out all elements in level, pre, post, and in order.
	// console.log(randomArray);
	// //---- Pre order
	// console.log("-----------------Pre-Order:-----------------");
	// randomTree.preOrder(printElement);
	// //---- Post order
	// console.log("-----------------Post-Order-----------------");
	// randomTree.postOrder(printElement);
	// //---- In order
	// console.log("-----------------In Order-----------------");
	// randomTree.inOrder(printElement);
	// console.log("-----------------End of log-----------------");

	// Other tests:
	let testArray = [1, 2, 3, 4, 5, 6, 7, 8];
	let testTree = new Tree(buildTree(testArray));
	console.log("-----------DELETE TEST SECTION-----------------|");

	testTree.inOrder(printElement);

	testTree.deleteItem(2);
	testTree.deleteItem(1);
	testTree.deleteItem(7);
	// testTree.deleteItem(60);
	testTree.inOrder(printElement);
	console.log("-----------DELETE TEST SECTION-----------------|");

	console.assert(
		testTree.isBalanced() != false,
		"isBalanced should return true and not false"
	);

	// console.assert(
	// 	testTree.findItem(7).data == 7,
	// 	"Find Item should return the node with 7 as it's value"
	// );
	console.assert(
		testTree.findItem(4).data == 4,
		"Find Item should return the node with 4 as it's value"
	);
	console.assert(
		testTree.findItem(20) == null,
		"Find Item should return null since 20 is not in the tree."
	);
}

driverScript();
