function combinationSum2(candidates: number[], target: number): number[][] {
    candidates.sort((a, b) => { return Number(a) < Number(b) ? -1 : 1; });
    let res: number[][] = [];

    function buildSum(arr: number[], nums: number[], target: number): void {
        if (target == 0) {
            res.push(arr);
            return;
        }

        let n = nums.shift();
        while (n <= target && (!arr.length || n >= arr[arr.length - 1])) {
            let a2 = [...arr];
            a2.push(n);
            buildSum([...a2], [...nums], target - n);
            let p = n;
            while (n == p) {
                n = nums.shift();
            }
        }
    }

    buildSum([], [...candidates], target);
    return res;
};

let inp: [number[], number] = [[2, 3, 6, 7], 7];
let sol = combinationSum2(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol)+"\n");

inp = [[2,3,5], 8];
sol = combinationSum2(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");

inp = [[2], 1];
sol = combinationSum2(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");

inp = [[10,1,2,7,6,1,5], 8];
sol = combinationSum2(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");

inp = [[2,5,2,1,2], 5];
sol = combinationSum2(...inp);
console.log("For input" + JSON.stringify(inp));
console.log("The solution is " + JSON.stringify(sol) + "\n");
