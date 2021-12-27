# Definition for singly-linked list.
# Given two non-empty linked lists representing two non-negative integers, add the two numbers 
# and return the sum as a linked list. Integers in linked lists are stored in reverse order.
#       l1 = ListNode(val: 8, next: ListNode(val: 1, next: ListNode(val: 2, None)))
#       l1 = ListNode(val: 5, next: ListNode(val: 4, next: ListNode(val: 6, None)))
# solution = ListNode(val: 3, next: ListNode(val: 6, next: ListNode(val: 8, None)))
class ListNode(object):
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __str__(self):
        ln = self
        s = str(self.val)
        while not ln.next is None:
            s += str(ln.next.val)
            ln = ln.next
        return s[::-1]

class Solution(object):
    # Helper class for converting ListNodes to Lists
    def lnode_to_list(self, lnode):
        ret = []
        ret.append(lnode.val)
        while not lnode.next is None:
            ret.append(lnode.next.val)
            lnode = lnode.next
        return ret
        
    # Helper class for converting lists to listnodes
    def list_to_lnode(self, nodelist):
        ret = ListNode(nodelist.pop(0))
        if len(nodelist) > 0:
            ret.next = self.list_to_lnode(nodelist)
        return ret

    # Add ListNodes funciton
    def addTwoNumbers(self, l1, l2):
        # Assign values to add by ternary assignment
        v1 = 0 if l1 is None else l1.val
        v2 = 0 if l2 is None else l2.val
        # Calculate sum, single-digit to assign to solution, and remainder
        v = v1 + v2
        d = v % 10
        rem = int((v-d)/10)
        sol = ListNode(d)
        # If there are values to add in the next order of magnitude, recursively call addTwoNumbers()
        if not l1.next is None or not l2.next is None or rem > 0:
            l1.next = ListNode(0) if l1.next is None else l1.next
            l2.next = ListNode(0) if l2.next is None else l2.next
            l1.next.val += rem
            sol.next = self.addTwoNumbers(l1.next, l2.next)
        return sol

x = Solution()
l1 = [8,1,2]
l2 = [5,4,6]

ln1 = x.list_to_lnode(l1)
ln2 = x.list_to_lnode(l2)

print(ln1)
print(ln2)
sol = x.addTwoNumbers(ln1, ln2)
print(sol)