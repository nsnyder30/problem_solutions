/*
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length
*/
function maxSlidingWindow(nums, k) {
    var l = nums.length;
    var q = [[nums[0], 0]];
    var res = [];
    if (k >= l) {
        res.push(q[0][0]);
    }
    for (var i = 1; i < l; i++) {
        // Remove elements from beginning of queue if they are outside window
        if (i - q[0][1] >= k) {
            q.shift();
        }
        // Add new value to the correct place in queue, removing any elements less than the value
        while (q.length && nums[i] >= q[q.length - 1][0]) {
            q.pop();
        }
        // Add the newest element of nums to the queue
        q.push([nums[i], i]);
        // Add the largest element in queue to the result
        if (i >= k - 1) {
            res.push(q[0][0]);
        }
    }
    return res;
}
;
function testSol(inp, func, result) {
    if (result !== undefined) {
        if (JSON.stringify(func.apply(void 0, inp)) === JSON.stringify(result)) {
            console.log("PASS: " + JSON.stringify(inp));
        }
        else {
            console.log("FAIL: " + JSON.stringify(inp));
        }
    }
    else {
        console.log("For input " + JSON.stringify(inp));
        var sol = func.apply(void 0, inp);
        console.log("The solution is " + JSON.stringify(sol) + "\n");
    }
}
var f = maxSlidingWindow;
testSol([[1, 3, -1, -3, 5, 3, 6, 7], 3], f, [3, 3, 5, 5, 6, 7]);
testSol([[-6, -10, -7, -1, -9, 9, -8, -4, 10, -5, 2, 9, 0, -7, 7, 4, -2, -10, 8, 7], 7], f, [9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8, 8]);
