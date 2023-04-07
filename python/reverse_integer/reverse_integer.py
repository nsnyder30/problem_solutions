# Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
class Solution(object):
    def reverse(self, x):
        sign = -1 if x < 0 else 1
        xs = str(x*sign)
        xl = len(xs)
        if xl < 10 or xl == 10 and int(xs[-1]) < 2:
            return sign*int(xs[::-1])
        elif xl > 10 or int(xs[-1]) > 2:
            return 0
        else:
            ts = xs[:-1]
            if sign == 1 and int(ts[::-1]) > 147483647 or sign == -1 and int(ts[::-1]) > 147483648:
                return 0
            else:
                return sign*int(xs[::-1])
    
x = Solution()

inp = 123
sol = x.reverse(inp)
print("For input: "+str(inp)+", solution is "+str(sol))

inp = -123
sol = x.reverse(inp)
print("For input: "+str(inp)+", solution is "+str(sol))

inp = 120
sol = x.reverse(inp)
print("For input: "+str(inp)+", solution is "+str(sol))
