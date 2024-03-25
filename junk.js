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
