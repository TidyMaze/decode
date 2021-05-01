# decode

Given a book:
- picks an sample
- generates a dictionary (mapping between letter and ciphered letter)
- encodes the sample using dictionary
- analyses the entire book to get language probabilities (if current letter is X, what is the probability that next is Y)
- tries to find (from scratch) a dictionary to decode the encoded sample, using pseudo-genetic algorithm (pool of dictionaries with incremental swapping)
- result is the decoded sample