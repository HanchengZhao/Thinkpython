def count_1(string, letter):
    word = string
    count = 0
    for letter in word:
        if letter == 'a':
            count += 1
    return count
