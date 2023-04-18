function combinationSum(candidates: number[], target: number): number[][] {
    let res: number[][] = [];

    function buildSum(arr: number[], target: number) {
        if (target == 0) {
            res.push([...arr]);
            return;
        }

        for (let n of candidates) {
            if (n <= target && (!arr.length || n >= arr[arr.length - 1])) {
                arr.push(n);
                buildSum(arr, target - n);
                arr.pop();
            }
        }
    }

    buildSum([], target);
    return res;
};

let inp: [number[], number] = [[2, 3, 6, 7], 7];
let sol = combinationSum(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));

inp = [[2,3,5], 8];
sol = combinationSum(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));

inp = [[2], 1];
sol = combinationSum(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));

inp = [[8,7,4,3], 11];
sol = combinationSum(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol));


