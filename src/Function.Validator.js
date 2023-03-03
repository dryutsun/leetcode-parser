const SingleFunctionInterface = {
    function: "",
    input: "" || 0 || [],
    output: "" || 0 || [],
}

function isSingleFunction(object) {
    return Object.getOwnPropertyNames(SingleFunctionInterface).every(key => key in object)
}
