# Given an input list of numbers and a target value, return the indices of the two numbers
# in the list that add up to the target value. Assume there is exactly one solution, and 
# we cannot use the same element from the list twice.
class Solution:
    def twoSum(self, nums=[], target=0):
        # Use list comprehension to create a list of viable value complementary values
        diffs = [target-i for i in nums]
        # List comprehension again to check nums list for matching complementary valus, excluding same-key matches
        sol = [key for key, val in enumerate(nums) if val in diffs and key != diffs.index(val)]
        # In the case where the two target numbers are the same, the solution list will contain the key of the second of the two values from the nums list
        if len(sol) == 1:
            sol.insert(0,diffs.index(nums[sol[0]]))
        return sol
    
x = Solution()

sol = x.twoSum([2,7,11,15], 9)
print(sol)

sol = x.twoSum([3,2,4], 6)
print(sol)

sol = x.twoSum([3,3], 6)
print(sol)

sol = x.twoSum([0,4,3,0], 0)
print(sol)

sol = x.twoSum([-1,-2,-3,-4,-5], -8)
print(sol)
