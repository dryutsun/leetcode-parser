const ClassProblemInterface = {
    method_array: [],
    parameter_array: [],
    expected_array: []
}

function isClassProblem(object) {
    return Object.getOwnPropertyNames(ClassProblemInterface).every(key => key in object)
} 