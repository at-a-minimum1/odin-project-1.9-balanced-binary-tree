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