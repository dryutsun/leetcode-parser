/** 
    ProblemFactory will:
    - take in your Solution class
    - the list of commands (typically in leetcode problems);
    - the list of parameters 
    - list of outputs (for testing);

    Footguns:
    Problems, just like in Java need to be wrapped in a solution class. In other words: two functions in global scope won't be found.
        - Perhaps, this is why I need to create an interface...
    TODO:
    - Determine a testing strategy that will accept strange outputs, i.e. 
        - Arrays, Trees, LinkedLists, Nodes, 2D arrays...
        - Determine how to run tests, when the factory passes in instance and breaks
*/
class ProblemFactory {
    constructor(Class, commands, parameters, outputs) {
        this.instance = new Class();
        this.name = Class.name;
        this.tests = [];
        for (let i in commands) {
            let test = "should equal" // this should change? We could modularize it into passing in test objects?
            this.tests.push([test, commands[i], parameters[i], outputs[i]])
        }
        // we remove the constructor
    }
    run() {
        for (const [name, command, params, output] of this.tests) {
                let test = this.execute(command, params); // run the test 
            try {
                let response = `${test} ${name} ${output}`
                if (test !== output) throw Error(response) // if test doesn't pass equality, throw error.
                console.log('✅', response)
            } catch(e) {
                console.log('❌', e, `\n Expected Output Was: ${output}, Recieved ${test}`)
            }         
        }
    }
    execute(command, params) {
        const method = this.instance[command];
        let return_value;
        if (params.length == 1) {
            // apply takes in an array of paramters...
            return_value = method.apply(this.instance, params);
        } else if (params.length > 1) {
            // call takes in a list of paramters...;
            const [first, second, ...rest] = params;
            return_value = method.call(first, second, rest)
        }
        // let return_value = method.apply(this.instance, args);
        return return_value == undefined ? null : return_value;
    }
}

module.exports =  ProblemFactory;
