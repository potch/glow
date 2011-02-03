"""
seamclean.py
for cleaning up point data
author: me@potch.me
date: 20110124
"""

def remove_seams(a):
    out = list()
    n = len(a)
    i=0
    while i < n:
        out.append(a[i])
        if i < n-2:
            if a[i] == a[i+2]:
                i = i + 2
        i = i + 1
    return out

def process_seams(a):
    out = a
    ol = 0
    while len(out) != ol:
        ol = len(out)
        out = remove_seams(out)
    print "process seams removed %d nodes" % (len(a)-len(out))
    return out

v = [(0,0),(2,0),(2,2),(0,2),(0,1),(1,1),(0,1),(0,0)]
print "in:\t", v
v = process_seams(v)
print "out:\t", v