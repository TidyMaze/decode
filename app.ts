import * as fs from 'fs'
import { randomInt } from 'node:crypto'
import { encode } from 'node:punycode'

function print(v: any) {
  console.log(v)
}

let textTake = 1000

let book = fs.readFileSync('alice.txt').toString()
let cleaned = book
  .replace(/[^0-9a-z \n]/gi, '')
  .replace(/\s+/gi, ' ')
  .toLowerCase()

let stats = {}

for (let i = 0; i < cleaned.length - 1; i++) {
  const cur = cleaned[i]
  const next = cleaned[i + 1]

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

let letters = 'abcdefghijklmnopqrstuvwxyz '.split('')

letters.forEach(letter => {
  letters.forEach(letter2 => {
    if (!(letter in probabilities)) {
      probabilities[letter] = {}
    }
    probabilities[letter][letter2] = (stats[letter][letter2] || 0) / stats[letter]['total']
  })
})

let extract = cleaned.slice(cleaned.length / 2 - textTake, cleaned.length / 2 + textTake)

let extractRatio = (extract.length / cleaned.length) * 100

print('raw text = ' + extract + ' ' + extractRatio.toFixed(1) + '%')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomDict(): String[] {
  let dict = []
  let remaining = [...letters]
  for (let i = 0; i < 27; i++) {
    let idx = getRandomInt(0, remaining.length)
    dict.push(remaining[idx])
    remaining.splice(idx, 1)
    // print(remaining)
  }
  return dict
}

let dict = randomDict()

print('dict = ' + dict)

function applyDict(dict: String[], text: String) {
  let encoded = ""
  for (let i = 0; i < text.length; i++) {
    encoded = encoded + dict[letters.indexOf(text[i])]
  }
  return encoded
}

function shorten(str: String): String {
  return str.slice(0, 80) + '[...]'
}

let encoded = applyDict(dict, extract)

print('encoded text = ' + shorten(encoded))

let population = []

for (let iPop = 0; iPop < 10; iPop++) {
  let randomChromosome = randomDict()
  population.push(randomChromosome)
}

function getAttemptScore(attempt: String){
  let score = 0
  for (let iLetter = 0; iLetter < attempt.length - 1; iLetter++) {
    const letter = attempt[iLetter]
    const nextLetter = attempt[iLetter + 1]
    score += probabilities[letter][nextLetter]
  }

  let avgScore = score / (attempt.length - 1)
  return avgScore
}

function getScore(chromosome: String[], encoded: String): { score: number, attempt: string } {
  let attempt = applyDict(chromosome, encoded)
  let score = getAttemptScore(attempt)

  return {
    score,
    attempt
  }
}

let bestScore = 0

let perfectScore = getAttemptScore(extract)

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

    let newScored = getScore(newChromosome, encoded)
    let oldScored = getScore(chromosome, encoded)

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