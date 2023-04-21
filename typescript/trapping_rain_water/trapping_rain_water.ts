function trap(height: number[]): number {
    let i:number = 0, max: number = height[0];
    let x = 0;
    for (i = 1; i < height.length; i++) {
        let h = height[i];
        if (h > max) {
            max = height[i];
        }
        x += max - h;
    }
    i -= 1;

    let h = height[i];
    let min = h;
    while (h != max) {
        x += min - max;
        i -= 1;
        h = height[i];
        if (h > min) {
            min = h;
        }
    }
    return x;
};

function testSol(inp: any, func: Function) {
    console.log("For input" + JSON.stringify(inp));
    let sol = func(inp);
    console.log("The solution is " + JSON.stringify(sol) + "\n");
}

let f = trap;
testSol([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], f);
testSol([4, 2, 0, 3, 2, 5], f);
testSol([4], f);
testSol([0], f);
testSol([1, 2, 3], f);
testSol([3, 2, 1], f);
testSol([0, 10, 3], f);
testSol([3, 2, 3], f);
testSol([3, 2, 3, 0, 0, 3], f);
testSol([4, 2, 3], f);
testSol([4, 2, 3, 4, 3], f);
testSol([3, 2, 4], f);
