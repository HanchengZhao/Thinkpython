from swampy.TurtleWorld import *
world = TurtleWorld()
t = Turtle()
print t

def Koch(t,x):
    if x < 3:
        fd(t, x)
    else:
        y = x/3
        Koch(t, y)
        lt(t, 60)
        Koch(t, y)
        rt(t, 120)
        Koch(t, y)
        lt(t, 60)
        Koch(t, y)
def snowflake(t, n):
    for i in range(3):
        Koch(t, n)
        rt(t, 120)
t.delay = 0
t.x = -150
t.y = 90
snowflake(t, 100)
