class Solution(object):
    def findComplement(self, num):
        s = bin(num)
        comp = s[0:2]
        for i in range(2, len(s)):
            comp += '0' if s[i] == '1' else '1'
        return int(comp,2)
        
x = Solution()
num = 2034
sol = x.findComplement(num)
print({'num':num, 'sol':sol})