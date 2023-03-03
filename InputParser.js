import {InputType, Token} from "./src/Token.types.js"

console.log("Hello from Input Parser.")
// Need to reduce cyclomatic complexity
// Should consider strategies to turn conditionals into functions to improve readability
// Should consider having token validation

export function InputParser (array) {
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