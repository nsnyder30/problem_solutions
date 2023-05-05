/*
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length
*/
function maxSlidingWindow(nums: number[], k: number): number[] {
    let l = nums.length;
    if (k >= l) {
        return [Math.max(...nums)];
    }

    let res: number[] = [];
    let imax = 0;
    let cmax = nums[imax];
    for (let i = 0; i < l; i++) {
        let nmax = Math.max(cmax, nums[i]);
        if (nmax > cmax) {
            cmax = nmax;
            imax = i;
        }

        if (i < k - 1) {
            continue;
        }

        if (i - k >= imax) {
            let sub = nums.slice(i - k + 1, i + 1);
            cmax = Math.max(...sub);
            imax = sub.lastIndexOf(cmax) + i - k + 1;
        }
        res.push(cmax);
    }
    return res;
};


function testSol(inp: any, func: Function, result?: any) {
    if (result !== undefined) {
        if (JSON.stringify(func(...inp)) === JSON.stringify(result)) {
            console.log("PASS: " + JSON.stringify(inp));
        } else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    } else {
        console.log("For input " + JSON.stringify(inp));
        let sol = func(...inp);
        console.log("The solution is " + JSON.stringify(sol) + "\n");
    }
}

let f = maxSlidingWindow;
testSol([[1, 3, -1, -3, 5, 3, 6, 7], 3], f, [3, 3, 5, 5, 6, 7]);
testSol([[-6, -10, -7, -1, -9, 9, -8, -4, 10, -5, 2, 9, 0, -7, 7, 4, -2, -10, 8, 7], 7], f, [9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8, 8]);