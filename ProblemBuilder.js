const ClassProblemInterface = {
    method_array: [],
    parameter_array: [],
    expected_array: []
}

function isClassProblem(object) {
    return Object.getOwnPropertyNames(ClassProblemInterface).every(key => key in object)
} 

const SingleFunctionInterface = {
    function: "",
    input: "" || 0 || [],
    output: "" || 0 || [],
}

function isSingleFunction(object) {
    return Object.getOwnPropertyNames(SingleFunctionInterface).every(key => key in object)
}

// Messy Array Methods
function ArrayValidator (array) {
    const object_check = array instanceof Array;
    const method_check = Array.isArray(array);
    const constructor_check = array.constructor === Array;
    // const prototype_check = Reflect.getPrototypeOf(array) === Array.prototype;
    const representation_check = Object.prototype.toString.call(array) === "[object Array]";
    return object_check && method_check && constructor_check && representation_check
}

function isNestedArray (array, depth=0) {
    if (!ArrayValidator(array)) return false;
    for (let element of array) {
        if (typeof element == "number" && depth >= 1) return true;
        if (ArrayValidator(element)) {
            // DFS
            if (!isNestedArray(element, depth+1)) return false;
        } else {
            return false;
        }
    }
    return true;
}
// flatten it to at least a 1D rep
function flatten (entry) {
    return isNestedArray(entry) ? entry.flat(2) : entry;
}

// TODO: 
// - Nested Compare
// - Object Compare
//

const InputType = {
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

function InputToken (type, data) {
    this.type = type == undefined ? "" : type;
    this.data = data == undefined ? null : data;
}

function InputParser (array) {
    let result = []
    for (const element of array) {
        console.trace()
        const Token = new InputToken()
        if (element.length == 0) {
            Token.type = InputType.EMPTY;
            Token.data = []
            continue;
        }
        if (typeof element == "string") {
            if (element.match(/^[a-z]+$/)) {
                Token.type = InputType.METHOD;
                Token.data = element;
                result.push(Token);
                continue;
            } else if (element.match(/^[a-z]+(?:[A-Z][a-z]*)*$/)) {
                Token.type = InputType.METHOD;
                Token.data = element;
                result.push(Token);
                continue;
            } else if (element.match(/^[A-Z][a-z]+(?:[A-Z][a-z]*)*$/)) {
                Token.type = InputType.CLASS;
                Token.data = element;
                result.push(Token);
                continue;
            } 
        }

        if (ArrayValidator(element) && isNestedArray(element)) {
            Token.type = InputType.PAIR;
            Token.data = element;
            result.push(Token)
            continue;
        }
        if (element.length == 1 && typeof element[0] == "number") {
            Token.type = InputType.SINGLE;
            Token.data = element;
            result.push(Token)
            continue
        }
        if (element.length == 2) {
            if (element.every(x => typeof x == "number")) {
                Token.type = InputType.PAIR;
                Token.data = element;
                result.push(Token);
                continue;
            }
            if (typeof element[0] == "number" && typeof element[1] == "string") {
                Token.type = InputType.KEY_VALUE;
                Token.data = element;
                result.push(Token)
                continue;
            }
            continue;
        }
        if (element.length > 2 && element.every(x => typeof x == "number")) {
            Token.type = InputType.LIST;
            Token.data = element;
            result.push(Token);
            continue;
        }
    }
    return result;
}

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
