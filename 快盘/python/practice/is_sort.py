def is_sorted(t):
    a = t[:]
    a.sort()
    if a == t:
        return True
    else:
        return False
