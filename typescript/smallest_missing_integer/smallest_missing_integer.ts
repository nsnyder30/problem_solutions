function firstMissingPositive(nums: number[]): number {
    let s = nums.length + 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        let n = nums[i];
        while (nums[n - 1] !== undefined) {
            let k = n - 1;
            n = nums[k];
            nums[k] = undefined;
        }
        s = nums[i] !== undefined ? i + 1 : s;
    }
    return s;
};

function testSol(inp: any, func: Function) {
    console.log("For input" + JSON.stringify(inp));
    let sol = func(inp);
    console.log("The solution is " + JSON.stringify(sol)+"\n");
}

testSol([1, 2, 0], firstMissingPositive);
testSol([0, 1, 2], firstMissingPositive);
testSol([3,4,-1,1], firstMissingPositive);
testSol([7, 8, 9, 11, 12], firstMissingPositive);
testSol([1], firstMissingPositive);
testSol([-1], firstMissingPositive);
testSol([2], firstMissingPositive);
testSol([2, 2], firstMissingPositive);
testSol([3, 3, 1, 4, 0], firstMissingPositive);