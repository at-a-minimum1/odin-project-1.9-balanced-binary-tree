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
}

// TODO Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function randomizeArray() {
	const arraySize = Math.trunc(Math.random() * (20 - 1));
	const randomArray = new Array();
	for (let i = 0; i < arraySize; i++) {
		randomArray.push(Math.trunc(Math.random() * (400 - 1)));
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
function isBalanced(inputTree) {
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

	if (leftValue > rightValue) {
		console.error("Tree is not balanced!");
		return false;
	} else {
		console.log(`M: ${inputTree.data} L: ${leftValue} R: ${rightValue}`);
		isBalanced(inputTree.leftChildren);
		isBalanced(inputTree.rightChildren);
	}

	return true;
}

// TODO Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video with several visual examples.
function insertItem(value) {}
function deleteItem(value) {}

// TODO Write a find(value) function that returns the node with the given value.
function findItem(value, inputNode) {
	if (inputNode === null) {
		// console.error("Node not found.");
		return;
	}

	if (value === inputNode.data) {
		// console.log("NODE IS FOUND!");
		return inputNode;
	}
	let rightNode = inputNode.rightChildren;
	let leftNode = inputNode.leftChildren;
	if (inputNode.data < value) {
		findItem(value, rightNode);
	} else {
		findItem(value, leftNode);
	}
}

// TODO Write a levelOrder(callback) function that accepts an optional callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. levelOrder may be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no callback is given as an argument. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (as you saw in the video).
function levelOrder(callback) {}

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
	const nodeStack = [];
	while (currentNode != null) {
		nodeStack.push(currentNode);
		unpreparedArray.push(currentNode.data);
		currentNode = currentNode.leftChildren;
	}
	let poppedNode = nodeStack.pop();
	console.log(poppedNode.data);
	while (nodeStack.length > 0) {
		if (poppedNode.rightChildren === null) {
			poppedNode = nodeStack.pop();
		} else {
			unpreparedArray.push(poppedNode.rightChildren.data);
			nodeStack.push(poppedNode.rightChildren);
			poppedNode = nodeStack.pop();
		}
		// poppedNode = nodeStack.pop();
	}

	const preparedArray = prepareArray(unpreparedArray);

	return preparedArray;
}

// TODO Write a driver script that does the following:
function driverScript() {
	// 1) Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
	// let sampleArray = [33, 42, 90, 33, 400, 86, 30, 45];
	// let builtTree = buildTree(sampleArray);
	// console.log(builtTree);

	let sampleArray2 = [33, 42, 90, 30, 400, 86, 45, 50, 2];
	let builtTree2 = buildTree(sampleArray2);
	// console.log(builtTree2);
	// let randoArray = randomizeArray();
	// console.log(randoArray);
	// let builtTree3 = buildTree(randoArray);
	// console.log(builtTree3);

	// 2) Confirm that the tree is balanced by calling isBalanced.
	let balancedArray = [1, 2, 3, 4, 5, 6, 7];
	let balancedTree = buildTree(balancedArray);
	isBalanced(balancedTree);
	console.log(balancedTree);
	console.log(balancedArray);

	// console.log(randoArray);
	// console.log(builtTree3);
	// isBalanced(builtTree3);

	// 3) Print out all elements in level, pre, post, and in order.
	// 4) Unbalance the tree by adding several numbers > 100.
	// 5) Confirm that the tree is unbalanced by calling isBalanced.
	// 6) Balance the tree by calling rebalance.
	// 7) Confirm that the tree is balanced by calling isBalanced.
	// 8) Print out all elements in level, pre, post, and in order.

	// Other tests:
	findItem(7, balancedTree);
	findItem(2, balancedTree);
	findItem(20, balancedTree);

	findItem(30, builtTree2);
	findItem(400, builtTree2);
	findItem(69, builtTree2);

	console.log(rebalance(balancedTree));
}

driverScript();
