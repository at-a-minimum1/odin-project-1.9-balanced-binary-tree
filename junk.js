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


// if (currentNode.data > value) {
// 			console.log("53 entered");
// 			while (currentNode.leftChildren) {
// 				console.log("55 entered");
// 				if (currentNode.data < value) {
// 					insertNode.leftChildren = currentNode.leftChildren;
// 					currentNode.leftChildren = insertNode;
// 				}
// 				currentNode = currentNode.leftChildren;
// 				if (!currentNode) {
// 					currentNode = insertNode;
// 				}
// 			}
// 		}
// 		// If the midpoint is smaller than the value then put the value on the right side of the binary tree
// 		else {
// 			console.log("68 entered");

// 			while (currentNode.rightChildren) {
// 				console.log("71 entered");
// 				if (currentNode.data > value) {
// 					console.log("73 entered");

// 					insertNode.rightChildren = currentNode.rightChildren;
// 					currentNode.rightChildren = insertNode;
// 				}
// 				currentNode = currentNode.rightChildren;
// 				if (!currentNode) {
// 					currentNode = insertNode;
// 				}
// 			}

	// isBalanced(inputTree = this.root) {
	// 	let leftValue = -1;
	// 	let rightValue = -2;

	// 	if (!inputTree || !inputTree.data) {
	// 		return;
	// 	}
	// 	if (inputTree.leftChildren != null) {
	// 		leftValue = inputTree.leftChildren.data;
	// 		if (inputTree.rightChildren != null) {
	// 			rightValue = inputTree.rightChildren.data;
	// 			if (leftValue > rightValue) {
	// 				console.error(
	// 					`Tree is not balanced: ${leftValue} is greater than ${rightValue}`
	// 				);
	// 				return false;
	// 			}
	// 		}

	// 		if (inputTree.rightChildren == null) {
	// 			return this.isBalanced(inputTree.leftChildren);
	// 		} else {
	// 			return (
	// 				this.isBalanced(inputTree.rightChildren) &
	// 				this.isBalanced(inputTree.leftChildren)
	// 			);
	// 		}
	// 	}
	// 	return true;
	// }


		// if ((rightNode && !leftNode) || (leftNode && !rightNode)) {
		// 	console.log("ONE CHILD IS NULL " + deleteNode.data);
		// 	parentNode = this.findParent(deleteNode.data);
		// 	if (!leftNode) {
		// 		deleteNode.setNode(
		// 			rightNode.data,
		// 			rightNode.leftChildren,
		// 			rightNode.rightChildren
		// 		);
		// 		parentNode.rightChildren = deleteNode;

		// 		rightNode = null;
		// 		console.log("LEFT NODE IS NULL");
		// 	} else {
		// 		deleteNode.setNode(
		// 			leftNode.data,
		// 			leftNode.leftChildren,
		// 			leftNode.rightChildren
		// 		);
		// 		parentNode.leftChildren = deleteNode;

		// 		leftNode = null;
		// 		console.log("RIGHT NODE IS NULL");
		// 	}