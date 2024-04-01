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
	// TODO Write an isBalanced function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
	isBalanced(inputTree = this.root) {
		let leftValue = -1;
		let rightValue = -2;

		if (!inputTree || !inputTree.data) {
			return;
		}
		if (inputTree.leftChildren != null) {
			leftValue = inputTree.leftChildren.data;
			if (inputTree.rightChildren != null) {
				rightValue = inputTree.rightChildren.data;
				if (leftValue > rightValue) {
					console.error(
						`Tree is not balanced: ${leftValue} is greater than ${rightValue}`
					);
					return false;
				}
			}

			if (inputTree.rightChildren == null) {
				return this.isBalanced(inputTree.leftChildren);
			} else {
				return (
					this.isBalanced(inputTree.rightChildren) &
					this.isBalanced(inputTree.leftChildren)
				);
			}
		}
		return true;
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
	deleteItem(value) {}

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
	// TODO Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept an optional callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided callback. The functions should return an array of values if no callback is given as an argument.
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
	// TODO Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
	height(node, nodeHeight = 0) {
		if (!node) {
			return -1;
		}
		// console.log(node);
		console.log(`height: ${nodeHeight}`);

		if (!node.rightChildren && !node.leftChildren) {
			return nodeHeight;
		}

		const leftHeight = this.height(node.leftChildren, nodeHeight + 1);
		const rightHeight = this.height(node.rightChildren, nodeHeight + 1);

		return Math.max(leftHeight, rightHeight);
	}
	// TODO Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
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

	// TODO Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
	rebalance(inputTree = this.root) {
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
}

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
		if (callback) {
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
	} else {
		message += `Null`;
	}
	console.log(message);
}

// TODO Write a driver script that does the following:
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
	console.log(randomArray);
	//---- Pre order
	console.log("-----------------Pre-Order:-----------------");
	randomTree.preOrder(printElement);
	//---- Post order
	console.log("-----------------Post-Order-----------------");
	randomTree.postOrder(printElement);
	//---- In order
	console.log("-----------------In Order-----------------");
	randomTree.inOrder(printElement);
	console.log("-----------------End of log-----------------");

	// 4) Unbalance the tree by adding several numbers > 100.
	randomTree.insertItem(1);
	randomTree.insertItem(100);
	randomTree.insertItem(50);

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
	console.log(randomArray);
	//---- Pre order
	console.log("-----------------Pre-Order:-----------------");
	randomTree.preOrder(printElement);
	//---- Post order
	console.log("-----------------Post-Order-----------------");
	randomTree.postOrder(printElement);
	//---- In order
	console.log("-----------------In Order-----------------");
	randomTree.inOrder(printElement);
	console.log("-----------------End of log-----------------");

	// Other tests:
	let balancedArray = [1, 2, 3, 4, 5, 6, 7];
	let balancedTree = new Tree(buildTree(balancedArray));

	console.assert(
		balancedTree.isBalanced() != false,
		"isBalanced should return true and not false"
	);

	console.assert(
		balancedTree.findItem(7).data == 7,
		"Find Item should return the node with 7 as it's value"
	);
	console.assert(
		balancedTree.findItem(2).data == 2,
		"Find Item should return the node with 2 as it's value"
	);
	console.assert(
		balancedTree.findItem(20) == null,
		"Find Item should return null since 20 is not in the tree."
	);

	let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	let testTree = new Tree(buildTree(testArray));
	testTree.insertItem(90);
	testTree.insertItem(42);
	testTree.insertItem(41);
	testTree.insertItem(9);
	// console.log(testTree.inOrder(printElement));
	// console.log(testTree.depth(testTree.findItem(6)));
	// console.log(testTree.depth(testTree.findItem(3)));
	// console.log(testTree.depth(testTree.findItem(2)));
	// console.log(testTree.depth(testTree.findItem(1)));
	// console.log(testTree.depth(testTree.findItem(4)));
	// console.log(testTree.depth(testTree.findItem(42)));
	// console.log(testTree.depth(testTree.findItem(41)));
	// console.log("-----------------------");
	// console.log(testTree.height(testTree.findItem(6).rightChildren));
	// console.log(testTree.height(testTree.findItem(6).leftChildren));
	console.log("-----------------------");
	console.log(balancedTree);
	console.log(balancedTree.inOrder(printElement));
	console.log(balancedTree.height(balancedTree.root.rightChildren));
	console.log(balancedTree.height(balancedTree.root.leftChildren));
	let heightArray = [1, 2, 3, 4, 5];
	let heightTree = new Tree(buildTree(heightArray));
	console.log(heightTree);
	console.log(heightTree.height(heightTree.root.leftChildren));
	console.log(heightTree.height(heightTree.root.rightChildren));
	// console.log(testTree.height(testTree.findItem(41)));
	// console.log(testTree.height(testTree.findItem(3)));
	// console.log(testTree.depth(testTree.findItem(90)));
}

driverScript();

// // A simple test using console.assert
// console.assert(add(2, 2) === 4, 'add(2, 2) should equal 4');
// console.assert(add(-1, 1) === 0, '-1 + 1 should equal 0');
