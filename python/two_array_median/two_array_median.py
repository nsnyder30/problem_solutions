class Solution(object):
    def binsearch(self, arr, v):
        if len(arr) < 1:
            return 0
        elif v <= arr[0]:
            return 0
        elif v >= arr[-1]:
            return len(arr)
        else:
            s, e = 0, len(arr)-1
            m = 0
            while e-s > 1:
                m = int((e+s)/2)
                if v > arr[m]:
                    s = m
                else:
                    e = m
            if v > arr[e]:
                m = e + 1
            elif v < arr[s]:
                m = s-1
            else:
                m = e
            return m

    def findMedianSortedArrays(self, nums1, nums2):
        numsort = []
        for i in range(len(nums1)):
            numsort.insert(self.binsearch(numsort, nums1[i]), nums1[i])
        for i in range(len(nums2)):
            numsort.insert(self.binsearch(numsort, nums2[i]), nums2[i])
        m = int(len(numsort)/2)
        if len(numsort) % 2 == 0:
            sol = (numsort[m] + numsort[m-1])/2
        else:
            sol = numsort[m]
        return [sol, numsort]

x = Solution()
num1 = [1,2]
num2 = [3,4]
tgt = 2
sol = x.findMedianSortedArrays(num1, num2)
print({'num1':num1})
print({'num2':num2})
print({'sol':sol})
