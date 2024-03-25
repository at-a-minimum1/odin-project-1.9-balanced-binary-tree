class Node {
	constructor(data, leftChildren, rightChildren) {
		this.data = data;
		this.leftChildren = leftChildren;
		this.rightChildren = rightChildren;
	}
}
class Tree {
	constructor(root) {
		this.root = root;
	}
	isBalanced(inputTree = this.root) {
		// let inputTree = this.root;
		let leftValue = 0;
		let rightValue = 0;

		if (!inputTree || !inputTree.data) {
			return;
		}
		if (inputTree.leftChildren != null) {
			leftValue = inputTree.leftChildren.data;
			if (inputTree.rightChildren != null) {
				rightValue = inputTree.rightChildren.data;
			}
		}
		console.log(leftValue + " >? " + rightValue);
		// Checks to see if the value on the left is greater than the one on the right. If so the tree is not balanced. Checking to see if the right value is 0 or not.
		if (leftValue > rightValue && rightValue != 0) {
			console.error(
				`Tree is not balanced: ${leftValue} is greater than ${rightValue}`
			);
			return false;
		} else {
			let rightTreeIsBalanced = this.isBalanced(inputTree.rightChildren);
			let leftTreeIsBalanced = this.isBalanced(inputTree.leftChildren);
			return rightTreeIsBalanced & leftTreeIsBalanced;
		}

		return true;
	}
	// TODO Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.
	insertItem(value) {}
	deleteItem(value) {}

	// TODO Write a find(value) function that returns the node with the given value.
	findItem(value) {
		let inputNode = this.root;
		if (inputNode === null) {
			return;
		}

		if (value === inputNode.data) {
			return inputNode;
		}
		let rightNode = inputNode.rightChildren;
		let leftNode = inputNode.leftChildren;
		if (inputNode.data < value) {
			return rightNode.findItem(value);
		} else {
			return leftNode.findItem(value);
		}
	}
}

// TODO Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function randomizeArray() {
	const arraySize = Math.trunc(Math.random() * (20 - 1));
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
// function isBalanced(inputTree) {
// 	let leftValue = 0;
// 	let rightValue = 0;

// 	if (!inputTree || !inputTree.data) {
// 		return;
// 	}
// 	if (inputTree.leftChildren != null) {
// 		leftValue = inputTree.leftChildren.data;
// 		if (inputTree.rightChildren != null) {
// 			rightValue = inputTree.rightChildren.data;
// 		}
// 	}
// 	// Checks to see if the value on the left is greater than the one on the right. If so the tree is not balanced. Checking to see if the right value is 0 or not.
// 	if (leftValue > rightValue && rightValue != 0) {
// 		console.error(
// 			`Tree is not balanced: ${leftValue} is greater than ${rightValue}`
// 		);
// 		return false;
// 	} else {
// 		isBalanced(inputTree.leftChildren);
// 		isBalanced(inputTree.rightChildren);
// 	}

// 	return true;
// }

// TODO Write a levelOrder(callback) function that accepts an optional callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. levelOrder may be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no callback is given as an argument. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).
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
		// currentNode = nodeStack.shift();

		if (callback) {
			//
			callback(currentNode);
			console.log("Callback was provided");
		} else {
			resultArray.push(currentNode);
		}
	}
	if (!callback) {
		return resultArray;
	}
}

// TODO Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept an optional callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided callback. The functions should return an array of values if no callback is given as an argument.
function inOrder(callback) {}

function preOrder(callback) {}

function postOrder(callback) {}

function height(node) {}

function depth(node) {}

// TODO Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
function rebalance(inputTree) {
	// Error checking
	if (inputTree === null) {
		return;
	}

	let currentNode = inputTree;
	const unpreparedArray = [];
	const nodeStack = [inputTree];
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

	return balancedTree;
}

function printElement(element) {
	console.log(element);
}

// TODO Write a driver script that does the following:
function driverScript() {
	// 1) Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
	let randomArray = randomizeArray();
	let randomTree = new Tree(buildTree(randomArray));

	// 2) Confirm that the tree is balanced by calling isBalanced.
	// randomTree.isBalanced();
	// console.assert(
	// 	randomTree.isBalanced() != false,
	// 	"isBalanced should return true and not false"
	// );

	// 3) Print out all elements in level, pre, post, and in order.
	//---- In level
	//---- Pre order
	//---- Post order
	//---- In order
	// 4) Unbalance the tree by adding several numbers > 100.
	// 5) Confirm that the tree is unbalanced by calling isBalanced.
	// 6) Balance the tree by calling rebalance.
	// 7) Confirm that the tree is balanced by calling isBalanced.
	// 8) Print out all elements in level, pre, post, and in order.

	// Other tests:
	let balancedArray = [1, 2, 3, 4, 5, 6, 7];
	let balancedTree = new Tree(buildTree(balancedArray));

	balancedTree.isBalanced();
	console.assert(
		balancedTree.isBalanced() != false,
		"isBalanced should return true and not false"
	);

	// console.assert(
	// 	balancedTree.findItem(7).data == 7,
	// 	"Find Item should return the node with 7 as it's value"
	// );
	// console.assert(
	// 	balancedTree.findItem(2).data == 2,
	// 	"Find Item should return the node with 2 as it's value"
	// );
	// console.assert(
	// 	balancedTree.findItem(20) == null,
	// 	"Find Item should return null since 20 is not in the tree."
	// );

	// levelOrder();
	// console.log(rebalance(balancedTree));
	// console.log(balancedArray);
	// console.log(rebalance(builtTree2));
	// console.log(sampleArray2);
	// console.log(rebalance(builtTree3));
	// console.log(randomArray);
}

driverScript();

// // A simple test using console.assert
// console.assert(add(2, 2) === 4, 'add(2, 2) should equal 4');
// console.assert(add(-1, 1) === 0, '-1 + 1 should equal 0');
