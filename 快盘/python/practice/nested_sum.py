def nested_sum(t):
    total = 0
    for x in t:
        for y in x:
            total += y
    return total
