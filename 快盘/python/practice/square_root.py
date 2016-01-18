def square_root(a, x):
    while True:
        print x
        y = (x + a/x)/2
        epsilon = 0.000001
        if abs(y - x) < epsilon:
            break
