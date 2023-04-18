function combinationSum(candidates: number[], target: number): number[][] {
    let sets = buildSum([[[], 0]], candidates, target);
    return sets.map(function (a) { return a[0]; });
};

function buildSum(sets: [number[], number][], candidates: number[], target: number): [number[], number][] {
    let recurse = false;
    for (let i = sets.length - 1; i >= 0; i--) {
        if (sets[i][1] != target) {
            for (let n of candidates) {
                let s = [...sets[i][0]];
                let sum = sets[i][1] + n;
                if (sum <= target && (s.length == 0 || n >= s[s.length - 1])) {
                    s.push(n);
                    sets.push([s, sum]);
                    if (sum < target) {
                        recurse = true;
                    }
                }
            }
            sets.splice(i, 1);
        }
    }

    if (recurse) {
        return buildSum(sets, candidates, target);
    } else {
        return sets;
    }
}

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


