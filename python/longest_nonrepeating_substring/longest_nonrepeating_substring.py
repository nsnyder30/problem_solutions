# Given a string s, find the length of the longest substring without repeating characters.

class Solution:
    def lengthOfLongestSubstring(self, s):
        sol = 0
        if len(s) > 0:
            map = {}
            cur = [0, 0]
            for i,c in enumerate(s):
                if c in map:
                    if map[c] >= cur[0]:
                        sol = max(sol, cur[1] - cur[0] + 1)
                        cur = [map[c]+1, i]
                    else:
                        cur[1] = i
                else:
                    cur[1] = i
                map[c] = i
            sol = max(sol, cur[1] - cur[0] + 1)
        return sol
    
x = Solution()

inp = "abcabcbb"
sol = x.lengthOfLongestSubstring(inp)
print("For input \"" + inp + "\" the longest substring is " + str(sol) + " characters long")

inp = "bbbbb"
sol = x.lengthOfLongestSubstring(inp)
print("For input \"" + inp + "\" the longest substring is " + str(sol) + " characters long")

inp = "pwwkew"
sol = x.lengthOfLongestSubstring(inp)
print("For input \"" + inp + "\" the longest substring is " + str(sol) + " characters long")

inp = ""
sol = x.lengthOfLongestSubstring(inp)
print("For input \"" + inp + "\" the longest substring is " + str(sol) + " characters long")
