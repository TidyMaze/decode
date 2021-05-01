import * as fs from 'fs'

type Chromosome = string[]
type Book = string

function print(v: any) {
  console.log(v)
}

function readBook(path: string): string {
  return fs.readFileSync(path).toString()
}

function cleanBook(text: Book): Book {
  return text
    .replace(/[^0-9a-z \n]/gi, '')
    .replace(/\s+/gi, ' ')
    .toLowerCase()
}

function analyzeLanguage(letters: string[], book: Book): object {
  let stats = {}

  for (let i = 0; i < book.length - 1; i++) {
    const cur = book[i]
    const next = book[i + 1]

    if (!(cur in stats)) {
      stats[cur] = { total: 0 }
    }

    if (!(next in stats[cur])) {
      stats[cur][next] = 0
    }

    stats[cur][next]++
    stats[cur]['total']++
  }

  let probabilities = {}

  letters.forEach(letter => {
    letters.forEach(letter2 => {
      if (!(letter in probabilities)) {
        probabilities[letter] = {}
      }
      probabilities[letter][letter2] = (stats[letter][letter2] || 0) / stats[letter]['total']
    })
  })

  return probabilities
}

function extractText(book: Book, textTake: number): string {
  return book.slice(book.length / 2 - textTake, book.length / 2 + textTake)
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDict(letters: string[]): string[] {
  let dict = []
  let remaining = [...letters]
  for (let i = 0; i < 27; i++) {
    let idx = getRandomInt(0, remaining.length)
    dict.push(remaining[idx])
    remaining.splice(idx, 1)
  }
  return dict
}

function applyDict(letters: string[], dict: string[], text: String) {
  return text.split('').map(c => dict[letters.indexOf(c)]).join('')
}

function shorten(str: String): String {
  return str.slice(0, 80) + '[...]'
}

function getAttemptScore(probabilities: object, attempt: String) {
  let score = 0
  for (let iLetter = 0; iLetter < attempt.length - 1; iLetter++) {
    const letter = attempt[iLetter]
    const nextLetter = attempt[iLetter + 1]
    score += probabilities[letter][nextLetter]
  }

  return score / (attempt.length - 1)
}

function getScore(probabilities: object, letters: string[], chromosome: Chromosome, encoded: String): { score: number, attempt: string } {
  let attempt = applyDict(letters, chromosome, encoded)
  let score = getAttemptScore(probabilities, attempt)

  return {
    score,
    attempt
  }
}

function mutateChromosome(chromosome: Chromosome): Chromosome {
  let firstLetter = getRandomInt(0, chromosome.length)
  let secondLetter = getRandomInt(0, chromosome.length)
  let newChromosome = [...chromosome]
  let buffer = newChromosome[firstLetter]
  newChromosome[firstLetter] = newChromosome[secondLetter]
  newChromosome[secondLetter] = buffer
  return newChromosome
}

function mutateIfBetter(letters: string[], probabilities: object, encoded: string, chromosome: Chromosome) {
  let newChromosome = mutateChromosome(chromosome)

  let newScored = getScore(probabilities, letters, newChromosome, encoded)
  let oldScored = getScore(probabilities, letters, chromosome, encoded)

  if (newScored.score >= oldScored.score) {
    return {
      chromosome: newChromosome,
      score: newScored.score,
      attempt: newScored.attempt
    }
  } else {
    return {
      chromosome: chromosome,
      score: oldScored.score,
      attempt: oldScored.attempt
    }
  }
}

function main() {
  let textTake = 1000
  let cleaned = cleanBook(readBook('alice.txt'))
  let letters = 'abcdefghijklmnopqrstuvwxyz '.split('')

  let probabilities = analyzeLanguage(letters, cleaned)
  let extract = extractText(cleaned, textTake)
  print('raw text = ' + shorten(extract) + ' ' + ((extract.length / cleaned.length) * 100).toFixed(1) + '%')

  let perfectScore = getAttemptScore(probabilities, extract)

  let dict = randomDict(letters)
  print('dict = ' + dict)

  let encoded = applyDict(letters, dict, extract)
  print('encoded text = ' + shorten(encoded))

  let population: Chromosome[] = []
  for (let iPop = 0; iPop < 10; iPop++) {
    population.push(randomDict(letters))
  }

  let bestScore = 0

  for (let generation = 0; generation < 1000000; generation++) {
    let scored = population.map(chromosome => mutateIfBetter(letters, probabilities, encoded, chromosome)).sort((a, b) => b.score - a.score)

    if (scored[0].score > bestScore) {
      print("Gen " + generation + " best chromosome " + scored[0].chromosome + ' => ' + shorten(scored[0].attempt) + ' score = ' + scored[0].score.toFixed(3) + ' vs perfect ' + perfectScore.toFixed(3))
      bestScore = scored[0].score
    }

    population = scored.map(e => e.chromosome)
  }
}

main()