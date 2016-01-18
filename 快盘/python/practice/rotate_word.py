def rotate_word(string,integer):
    n = integer
    for i in string:
        r = ord(i)+ n
        return chr(r)
print rotate_word('cheer',7)
        
    
