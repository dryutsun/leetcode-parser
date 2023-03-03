import {InputType, Token} from "./Token.types.js";


function TreeOrderFormat(element) {
    if (element.length === 1) {
        return new InputToken(InputType.TREE_NODE, element);
    }
    if (isLevelOrder(element)) {
        return new InputToken(InputType.TREE_LEVEL_ORDER, element);
    }
    if (isPostOrder(left, right)) {
        return new InputToken(InputType.TREE_POSTORDER, element);
    }
    const root = element[0];
    const left_side = element.slice(1).filter(value => value < root);
    const right_side = element.slice(1).filter(value => value > root);

    if (isPreOrder(root, left, right)) {
        return new InputToken(InputType.TREE_PREORDER, element)
    }

    if (isInOrder(root, left, right)) {
        return new InputToken(InputType.TREE_INORDER, element)
    }
    return new InputToken(InputType.INVALID_TREE, element)
}

function isLevelOrder(array) {
    return array.every((value, index) => {
        return value !== undefined || index >= Math.floor(array.length/2);
    })
}

function isPreOrder(root, left, right) {
    return left.length === 0;
}

function isInOrder(array) {
    return right.length === 0;
}

function isPostOrder(array) {
    if (array.length <= 1) return true;
    let root = array.at(-1);
    let i = 0;
	// find "center"
    while (array[i] < root) {
        i++;
    }
	// determine if rest of array conforms to postOrder
    while (i < array.length - 1) {
        if (array[i] < root) return false;
        i++;
    }
	// recurse
    let subarray_left = element.slice(0, i);
    let subarray_right = element.slice(i, array.length - 1);
    return isPostOrder(subarray_left) && isPostOrder(subarray_right)
}