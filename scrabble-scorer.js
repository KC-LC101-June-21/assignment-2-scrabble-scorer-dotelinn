// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log(`\nLet's play some scrabble!\n`);
   let answer = input.question("Enter a word to score: ");
  //  console.log(oldScrabbleScorer(answer));
  return answer;
};

function simpleScore (word) {
  let total = word.length;
  return total;
};

function vowelBonusScore (word) {
  let total = 0;
  for (let i = 0; i < word.length; i++){
    let vowel = 'AEIOU'
    if (vowel.includes(word[i].toUpperCase())){
      total += 3;
    } else {
      total += 1;
    }
  }
  return total;
};

function scrabbleScore(word, points) {
  let total = 0;
  for (let i = 0; i < word.length; i++){
    total += points[word[i].toLowerCase()];
  }
  return total;
};

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFunction: simpleScore
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scoringFunction: oldScrabbleScorer
  }
];

// // Simple scoring
// console.log("algorithm name: ", scoringAlgorithms[0].name);
// console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction("JavaScript"));

function scorerPrompt() {
  console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
  let number = Number(input.question("Enter 0, 1, or 2: "));
  let chosenOption = scoringAlgorithms[number];
  return chosenOption;
}

function transform(oldSystem) {
  let singleLetterPoints = {};
  for (let points in oldSystem) {
      let letters = oldSystem[points];
      for (let i=0; i<letters.length; i++){
        singleLetterPoints[letters[i].toLowerCase()] = Number(points);
      }         
  }
  return singleLetterPoints;
};

let newPointStructure = transform(oldPointStructure);
scoringAlgorithms[2].scoringFunction = scrabbleScore;

function runProgram() {
  // console.log(newPointStructure);
   let userWord = initialPrompt();
  //  console.log(userWord);
  //  console.log(typeof userWord);
  let option = scorerPrompt();
  //  console.log(option);
  //  console.log(typeof option);
  let points;
  if(option.name === "Scrabble") {
    points = option.scoringFunction(userWord, newPointStructure);
  } else {
    points = option.scoringFunction(userWord);
  }
  //  console.log(points);
  //  console.log(typeof points);
   console.log(`Score for '${userWord}': ${points}`);  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};