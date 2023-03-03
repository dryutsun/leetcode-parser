import {InputType, Token} from "./Token.types.js";

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
		// this is a hack, should consider a better way to return true once recursion reaches case where it is an array of integers...
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

