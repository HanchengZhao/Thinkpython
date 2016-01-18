def make_word_list():
    """Reads lines from a file and builds a list using append."""
    word_list = []
    fin = open('f:\\words.txt')
    for line in fin:
        word = line.strip()
        word_list.append(word)
    return word_list

def dictionary():
    contract = dict()
    for i in word_list:
        contract[ i ] = 'whatever'
    return contract
make_word_list()
dictionary()
        
