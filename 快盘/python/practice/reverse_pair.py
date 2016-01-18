def make_word_list():
    """Reads lines from a file and builds a list using append."""
    word_list = []
    fin = open('f:\\words.txt')
    for line in fin:
        word = line.strip()
        word_list.append(word)
    return word_list

def reverse_pair():
    """Check if a word has its reverse pair"""
    for i in word_list:
         reverse_pair = []
         t = i[ : :-1]
         if t in word_list:
             reverse_pair.append(t)
    return reverse_pair[:10]    
        
