def do_twice(f):
    f()
    f()
def do_four(f):
    do_twice(f)
    do_twice(f)

def print_beam():
    print('+ - - - - ',end= '')
    
def print_beams():
    do_twice(print_beam)
    print('+')

def print_edge():
    print('|         ',end= '')#在python2.0里，可以直接用”，“来使语句在一行里，3.0里必须用end=''



def print_edges():
    do_twice(print_edge)
    print('|')

def half():
    print_beams()
    do_four(print_edges)
def prid():
    do_twice(half)
    print_beams()

prid()
