// Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.
// Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:
//  - Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
//  - Return k.
function removeElement(nums, val) {
    for (var i = nums.length; i >= 0; i--) {
        if (nums[i] == val) {
            nums.splice(i, 1);
        }
    }
    return nums.length;
}
;
var nums = [0, 1, 2, 2, 3, 0, 4, 2];
var val = 2;
var expectedNums = [0, 1, 4, 0, 3];
var test = ['a', 'c', 'd'];
console.log(test);
test.splice(1, 1);
console.log(test);
console.log('nums before: ' + JSON.stringify(nums));
var k = removeElement(nums, val); // Calls your implementation
console.log('nums after: ' + JSON.stringify(nums));
console.log(k == expectedNums.length);
nums.sort(function (a, b) { return a < b ? -1 : a == b ? 0 : 1; });
for (var i = 0; i < nums.length; i++) {
    console.log({ ni: nums[i], en: expectedNums[i], eq: nums[i] == expectedNums[i] });
}
