'use strict'

export const InputType = {
    PAIR: "pair",
    LIST: "list",
    SINGLE: "single",
    EMPTY: "empty",
    KEY_VALUE: "key_value",
    FUNCTION: "function", // expects camelcase
    CLASS: "class", // expects pascalcase
    METHOD: "method", // expects lowercase
    TREE_NODE: "tree_node",
    TREE_LEVEL_ORDER: "tree_level_order",
    TREE_PREORDER: "tree_preorder",
    TREE_INORDER: "tree_inorder",
    TREE_POSTORDER: "tree_postorder",
    INVALID_TREE: "invalid_tree"
}

export class Token {
	constructor(type, data) {
		// hasty implementation: would probably require 
		if (!(type in InputType)) throw Error("Token constructor requires valid input type.")
		this.type = type == undefined ? "" : type;
    	this.data = data == undefined ? null : data;
	}
}

