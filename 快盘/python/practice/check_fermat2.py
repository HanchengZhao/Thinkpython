a = int(raw_input('please input "a" \n'))
b = int(raw_input('please input "b" \n'))
c = int(raw_input('please input "c" \n'))
n = int(raw_input('please input "n" \n'))
def check_fermat(a,b,c,n):    
    if a ** n + b ** n == c ** n and n > 2:
        print('Holy smokes, Fermat was wrong!')
    elif n > 2:
        check_fermat(a,b,c,n-1)
    else:
        print("No, that doesn't work")

check_fermat(a,b,c,n)
