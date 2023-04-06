// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

function isValid(s: string): boolean {
    let map: object = {')':'(', '}':'{', ']':'['};
    let stack: string[] = [];
    for(let i=0;i<s.length;i++) {
        let c = s[i];
        if(c in map) {
            if(stack.pop() != map[c]) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.length == 0;
};    
let inp = "()";
let sol = isValid(inp);
console.log("For input "+inp+", the result is "+sol+'\n');

inp = "()[]{}";
sol = isValid(inp);
console.log("For input "+inp+", the result is "+sol+'\n');

inp = "(]";
sol = isValid(inp);
console.log("For input "+inp+", the result is "+sol+'\n');

inp = "(";
sol = isValid(inp);
console.log("For input "+inp+", the result is "+sol+'\n');
