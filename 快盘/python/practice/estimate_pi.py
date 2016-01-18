from __future__ import division
import math


def factorial(n):
    """Computes factorial of n."""
    if n == 0:
        return 1
    else:
        recurse = factorial(n-1)
        result = n * recurse
        return result
  

def estimate_pi():
    """Computes an estimate of pi.

    Algorithm due to Srinivasa Ramanujan, from 
    http://en.wikipedia.org/wiki/Pi
    """
    k = 0
    total = 0
    a = 2 * math.sqrt(2)/9801
    while True:
        b = factorial(4*k)*(1103 + 26390*k)
        c = factorial(k)**4*396**(4*k)
        term = a*b/c
        total += term
        
        if abs(term) < 1e-15:break
        k += 1
    return 1/ total
print estimate_pi()
            
