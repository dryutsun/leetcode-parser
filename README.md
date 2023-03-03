# leetcode-parser

# TODO:

## LONG TERM
- Build Proper Testing Harness Architecture
- Consider if I need to use a strategy && adapter to modularize handling of input types.
- Perhaps a more rigorous implementation (tree-walking, visitor, AST)

## SHORT TERM
- Reorganize Into separate modules.
- Build Input Validator
- Rewrite recursive nested array validator to return when it has reached it's "base" i.e. an array of integers. Code is not fully to spec. Maybe should return nested depth vs. boolean (is nested)

## FEATURES:
- Build Parser to determine input types for more advanced data-structures (serialized) or problem types.
- If there is a more advanced data-structure (serialized tree in x-order), have it be able to generate the data-structure without user intervention.
- Build Parser feature that can determine if problem is formatted like a leetcode problem, input text (hackerrank, codeforces) or just involves a typical copy-paste (structy).



# INPUT TYPES:
## Leetcode
## Hacker Rank
## CodeForces
