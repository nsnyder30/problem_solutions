class Solution(object):
    def convert(self, s, numRows):
        if numRows > 1:
            m1 = 2*(numRows-1)
            m2 = m1/2
            sol = [''] * numRows
            for i in range(len(s)):
                r = i % m1
                r = r if r <= m2 else int(m1-r)
                sol[r] += s[i]
            return ''.join(sol)
        else:
            return s
        
x = Solution()
s = "A"
sol = x.convert(s, 1)
print({'s':s, 'sol':sol})