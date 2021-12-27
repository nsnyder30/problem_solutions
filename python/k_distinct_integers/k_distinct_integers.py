from itertools import islice

# For a given array of integers, this script counts the number of good subarrays with k distinct integers, allowing for duplicate values. e.g.
# nums = [1,2,1,3,4]
# k = 3
# Good subarrays are: 
# [1,2,1,3]
# [2,1,3]
# [1,3,4]
class Solution(object):
    # Set global variables
    #      level - Because subarraysWithKDistinct() is used recursively, tracks which level of recursion the function is currently operating at
    #        sol - Final solution value
    #       lkey - Tracks the left side of the sliding window
    #  maxlength - Used for early termination if nums is too small to hold k distinct integers
    level = 0
    sol = 0
    lkey = 0
    maxlength = 0
    def subarraysWithKDistinct(self, nums, k):
        self.level += 1
        if self.level == 1:
            self.maxlength = len(nums)
            # Terminate early if the size of the array is less than k.
            if(len(set(nums))) < k:
                return self.sol
        # Create an iterator so we can jump forward in iterations when necessary to minimize unneeded loops.
        rng = iter(range(self.lkey+k, len(nums)+1))
        for rkey in rng:
            # Take a snapshot of the current window and count distinct integers.
            sub = nums[self.lkey:rkey]
            cmp = len(set(sub))
            # Increment solution whenever a matching subarray is found. Once the right side of the sliding windows reaches the end of nums, advance the left side of the window forward and run subarraysWithKDistinct on each resultant subarray.
            if cmp == k:
                self.sol += 1
                if rkey == self.maxlength:
                    while len(set(nums[self.lkey:rkey])) >= k:
                        self.lkey += 1
                        self.subarraysWithKDistinct(nums[:rkey], k)
            # If more than k distinct integers are detected, advance the left side of the window forward and run subarraysWithKDistinct on each resultant subarray until the subarray is back down to k distinct integers.
            elif cmp > k:
                while len(set(nums[self.lkey:rkey])) > k:
                    self.lkey += 1
                    self.subarraysWithKDistinct(nums[:rkey], k)
            # If less than k distinct integers are detected, advance the iterator forward by the difference.
            else:
                next(islice(rng, k-cmp-1, k-cmp-1), None)
        self.level -= 1
        return self.sol

x = Solution()
nums = [1,2,1,3,4]
k = 3
sol = x.subarraysWithKDistinct(nums, k)
print({'nums':nums, 'k':k, 'sol':sol})