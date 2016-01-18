def is_triangle(a,b,c):
    if a >= b + c or b >= a + c or c >= b + a:
        print ('no')
    else:
        print ('yes')
a = int(raw_input('please input a\n'))
b = int(raw_input('please input b\n'))
c = int(raw_input('please input c\n'))
is_triangle(a, b, c)
