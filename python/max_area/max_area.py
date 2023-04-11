# You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

# Find two lines that together with the x-axis form a container, such that the container contains the most water.

# Return the maximum amount of water a container can store.

class Solution(object):
    def maxArea(self, height):
        # Check the area formed by the beginning and end lines, which will have the longest possible width
        s, e = 0, len(height)-1
        h = min(height[s], height[e])
        a =  h*e
        while s < e:
            # Since any area formed by any two lines besides the outermost lines will have a shorter width, 
            # one of the two lines forming the new area will have to be taller than the shorter of the 
            # two outermost lines
            if height[e] > height[s]:
                while height[s] <= h and s < e:
                    s += 1
            else:
                while height[e] <= h and s < e:
                    e -= 1
            # Every time a line taller than the current shortest side is found, set a new "shorter side" length, 
            # check for a larger area, and repeat.
            h = min(height[s], height[e])
            a = max(a, h*(e-s))
        return a
    
x = Solution()

inp = [1,8,6,2,5,4,8,3,7]
sol = x.maxArea(inp)
print("For input: "+str(inp)+", solution is "+str(sol))

inp = [1,1]
sol = x.maxArea(inp)
print("For input: "+str(inp)+", solution is "+str(sol))

inp = [3,4,9,2,6,2]
sol = x.maxArea(inp)
print("For input: "+str(inp)+", solution is "+str(sol))
