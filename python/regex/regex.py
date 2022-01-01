# Given an input string s and pattern p, implement regular expression matching
# with support for '.' and '*'
#       '.' Matches any single character
#       '*' Matches zero or more of the preceding element
# The matching should cover the entire input string (not partial)
#        s = "baabbbaccbccacacc"
#        p = "c*..b*a*a.*a..*c"
# solution = True
class Solution(object):
    def isMatch(self, s, p):
        # To prevent hitting max recursion limit, iterate over list of test cases.
        # This limits recursive calls to isMatch to only conditions when the 
        # entire string or entire pattern has been consumed.
        test_cases = [[s, p]]
        while len(test_cases) > 0:
            s, p = test_cases.pop()
            sl = len(s)
            pl = len(p)
            # Check success/failure conditions
            if sl == 0 and pl == 0:
                return True
            elif pl == 0:
                return False
            elif sl == 0 and p[-1] == '*':
                return self.isMatch(s, p[:-2])
            elif sl == 0:
                return False
            # Iterate over the string and pattern
            while len(s) > 0 and len(p) > 0:
                # Handle wildcards
                if p[-1] == '*':
                    # When wildcard character matches, add test cases for single-character
                    # matches and multi-character matches
                    if p[-2] == s[-1] or p[-2] == '.':
                        test_cases.append([s, p[:-1]])
                        test_cases.append([s[:-1], p])
                    # Whether the wildcard character matches or not, always check for
                    # zero-character matches
                    s, p = s, p[:-2]
                # For non-wildcard matches, consume the last character of
                # the pattern and the string
                elif s[-1] == p[-1] or p[-1] == '.':
                    s = s[:-1]
                    p = p[:-1]
                # For non-wildcard mismatches, terminate this test case
                else:
                    s, p = '0', ''
            # Once either the pattern or string has been consumed, 
            # recheck success/failure conditions. On failure, move
            # on to next test case
            if self.isMatch(s, p):
                return True
        # If loop is exited with no successful test cases, return False
        return False

x = Solution()
s = "baabbbaccbccacacc"
p = "c*..b*a*a.*a..*c"
sol = x.isMatch(s, p)
print({'s':s, 'p':p})
print(sol)
