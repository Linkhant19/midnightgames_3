const nums = [
    1772, 3145, 89, 69, 71134, 4314, 9, 135284, 51, 890, 
    13415, 356, 13413516, 262451, 9507, 320459246, 13535, 1324, 135346, 1241
];

let currentIndex = 0;
let guess = parseInt(document.getElementById('guessInput').value);

// check if the num is a prime number (as in if it matches the guess being prime or not)
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

function primeSame(guess) {
    const guessedPrime = isPrime(guess);
    const currentPrime = isPrime(nums[currentIndex]);
    return guessedPrime === currentPrime;
}

// check the length of the num is same as guessed
function lengthSame(guess) {
    const guessedLength = guess.toString().length;
    const currentLength = nums[currentIndex].toString().length;
    return guessedLength === currentLength;
}

// check the sum of all digits (same with guess or not)
function sumSame(guess) {
    const sumDigits = num => num.toString().split('').reduce((acc, d) => acc + Number(d), 0);
    const guessedSum = sumDigits(guess);
    const currentSum = sumDigits(nums[currentIndex]);
    return guessedSum === currentSum;
}


// idk, maybe more? 

//////////////////////////////////////////////////////////////

document.getElementById('GuessButton').addEventListener('click', submitGuess);

function submitGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    document.getElementById('currentGuess').textContent = guess || "__________";  
    updateHintBox('primeHint', primeSame(guess));
    updateHintBox('lengthHint', lengthSame(guess));
    updateHintBox('sumHint', sumSame(guess));
}

function updateHintBox(hintId, isCorrect) {
    const hintBox = document.getElementById(hintId);
    if (isCorrect) {
        hintBox.className = 'hintBox correct';
    } else {
        hintBox.className = 'hintBox incorrect';
    }
}

function resetHintBoxes() {
    const hintBoxes = document.querySelectorAll('.hintBox');
    hintBoxes.forEach(box => {
        box.className = 'hintBox';
    });
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % nums.length;  
    document.getElementById('guessInput').value = '';
    resetHintBoxes();
}

