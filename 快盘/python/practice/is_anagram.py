def is_anagram(w1,w2):
    t1 = list(w1)
    t2 = list(w2)
    t1.sort()
    t2.sort()
    if t1 == t2:
        return True
    else:
        return False
