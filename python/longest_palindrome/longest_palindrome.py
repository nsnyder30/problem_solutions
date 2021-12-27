# For a given string s, return the longest palindromic substring in s. e.g.
# s = "dssdsfdfdsssddffffddss"
# longest palindromic substring = "sssddffffddss"
class Solution:
	def longestPalindrome(self, s: str) -> str:
        # Declare variables
        # sol - tracks potential solutions and their lengths
        #  sr - reverse of s
        #  sl - length of s
        #   i - counter
		sol = {'mx':0, 's':''}
		sr = s[::-1]
		sl = len(s)
		i = 0
        # Increment i until it exceeds the point of finding larger paldinromes. With each inrcrement, 
        # the forward and reverse strings are shifted one character in either direction and compared
        # against each other for matching characters at the same indices. e.g.
        # Iter 1:
        #    s: dssdsfdfdsssddffffddss
        #   sr: ssddffffddsssdfdfsdssd
        # diff: _s_d_f_fd_ss_df_f_d_s_
        # Iter 2: 
        #    s:  dssdsfdfdsssddffffddss
        #   sr: ssddffffddsssdfdfsdssd
        # diff: ______f__dsssd__f______
        #
        #    s: dssdsfdfdsssddffffddss
        #   sr:  ssddffffddsssdfdfsdssd
        # diff: _ssd_f_f___s___f_f_dss_
        # 
        # Iter 3: 
        #    s:   dssdsfdfdsssddffffddss
        #   sr: ssddffffddsssdfdfsdssd
        # diff: __d____fd__ss__df____d__
        #
        #    s: dssdsfdfdsssddffffddss
        #   sr:   ssddffffddsssdfdfsdssd
        # diff: __s____f________f____s__
		while i < sl-sol['mx']:
			tmx = 0
			diff1 = [a[0] if a[0]==a[1] else 0 for key, a in enumerate(zip(s[:(sl-i)], sr[i:]))]
			diff2 = [a[0] if a[0]==a[1] else 0 for key, a in enumerate(zip(s[i:], sr[:(sl-i)]))]
			diff = diff1 + [0] + diff2
			pal = ''
            # Concatendate the two diff arrays and check for palindromes. Update sol when a new
            # longest palindrome is detected
			for k in diff:
				if k == 0:
					pal = ''
				else:
					pal += k
					if len(pal) > sol['mx'] and pal == pal[::-1]:
						sol = {'mx':len(pal), 's':pal}
			k = 0
			i += 1
		return sol['s']

x = Solution()
s = "dssdsfdfdsssddffffddss"
sol = x.longestPalindrome(s)
print({'s':s, 'sol':sol})