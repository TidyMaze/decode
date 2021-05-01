import * as fs from 'fs'

function print(v: any) {
  console.log(v)
}

function readBook(path: string): string {
  return fs.readFileSync(path).toString()
}

function cleanBook(text: string): string {
  return text
    .replace(/[^0-9a-z \n]/gi, '')
    .replace(/\s+/gi, ' ')
    .toLowerCase()
}

function analyzeLanguage(letters: string[], book: string): object {
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

function extractText(book: string, textTake: number): string {
  return book.slice(book.length / 2 - textTake, book.length / 2 + textTake)
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDict(letters: string[]): String[] {
  let dict = []
  let remaining = [...letters]
  for (let i = 0; i < 27; i++) {
    let idx = getRandomInt(0, remaining.length)
    dict.push(remaining[idx])
    remaining.splice(idx, 1)
  }
  return dict
}

function applyDict(letters: string[], dict: String[], text: String) {
  let encoded = ""
  for (let i = 0; i < text.length; i++) {
    encoded = encoded + dict[letters.indexOf(text[i])]
  }
  return encoded
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

  let avgScore = score / (attempt.length - 1)
  return avgScore
}

function getScore(probabilities: object, letters: string[], chromosome: String[], encoded: String): { score: number, attempt: string } {
  let attempt = applyDict(letters, chromosome, encoded)
  let score = getAttemptScore(probabilities, attempt)

  return {
    score,
    attempt
  }
}

function main() {
  let textTake = 1000
  let cleaned = cleanBook(readBook('alice.txt'))
  let letters = 'abcdefghijklmnopqrstuvwxyz '.split('')

  let probabilities = analyzeLanguage(letters, cleaned)
  let extract = extractText(cleaned, textTake)
  print('raw text = ' + extract + ' ' + ((extract.length / cleaned.length) * 100).toFixed(1) + '%')

  let dict = randomDict(letters)
  print('dict = ' + dict)

  let encoded = applyDict(letters, dict, extract)
  print('encoded text = ' + shorten(encoded))

  let population = []
  for (let iPop = 0; iPop < 10; iPop++) {
    population.push(randomDict(letters))
  }

  let bestScore = 0
  let perfectScore = getAttemptScore(probabilities, extract)

  for (let generation = 0; generation < 1000000; generation++) {
    let newPopulation = []
    let scored = []

    population.forEach(chromosome => {
      let firstLetter = getRandomInt(0, 27)
      let secondLetter = getRandomInt(0, 27)

      let newChromosome = [...chromosome]

      let buffer = newChromosome[firstLetter]
      newChromosome[firstLetter] = newChromosome[secondLetter]
      newChromosome[secondLetter] = buffer

      let newScored = getScore(probabilities, letters, newChromosome, encoded)
      let oldScored = getScore(probabilities, letters, chromosome, encoded)

      if (newScored.score >= oldScored.score) {
        scored.push({
          chromosome: newChromosome,
          score: newScored.score,
          attempt: newScored.attempt
        })
      } else {
        scored.push({
          chromosome: chromosome,
          score: oldScored.score,
          attempt: oldScored.attempt
        })
      }
    });

    scored.sort((a, b) => b.score - a.score)

    if (scored[0].score > bestScore) {
      print("Gen " + generation + " best chromosome " + scored[0].chromosome + ' => ' + shorten(scored[0].attempt) + ' score = ' + scored[0].score.toFixed(3) + ' vs perfect ' + perfectScore.toFixed(3))
      bestScore = scored[0].score
    }
    scored.forEach(el => newPopulation.push(el.chromosome))

    population = newPopulation
  }
}

main()