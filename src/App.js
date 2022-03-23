import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import ShowPuzzle from './components/Puzzle/ShowPuzzle';
import Guess from './components/Guess/Guess';
import Answer from './components/Answer/Answer';
import Modal from './components/UI/Modal';
import Footer from './components/Footer/Footer';

import { puzzles } from './data';
import styles from './App.module.css';

const randomNumber = elements => {
  return Math.floor(Math.random() * elements);
};

const get_letters = puzzle => {
  const letters = [];
  for (let word of puzzle) {
    let j = word.length;
    while (j--) {
      let char = word.charAt(j);
      if (letters.indexOf(char) < 0) {
        letters.push(char);
      }
    }
  }
  return letters.sort();
};

const wordToNum = (word, guess) => {
  let num = '';
  for (let i = 0; i <= word.length - 1; i++) {
    num += guess[word.charAt(i)].toString();
  }
  return Number(num);
};

const solver = puzzle => {
  const words = puzzle.slice(0, puzzle.length - 1);
  const result = puzzle[puzzle.length - 1];
  const solution = new Map();
  const usedVal = new Set();
  const leadChar = new Set(result[0]);
  const WORDS_COUNT = words.length;
  const MAX_WORD_LEN = result.length;

  for (let i = 0; i < WORDS_COUNT; ++i) {
    if (words[i].length > MAX_WORD_LEN) return false;
    leadChar.add(words[i][0]);
  }
  return helper(1, 0, 0);

  function helper(digit, wordIndex, carry) {
    if (digit > MAX_WORD_LEN) {
      return true;
    }

    if (wordIndex === WORDS_COUNT) {
      const resultNum = carry % 10;
      const resultChar = result[MAX_WORD_LEN - digit];
      const isUsed = solution.has(resultChar);
      if (
        (!isUsed && usedVal.has(resultNum)) ||
        (isUsed && solution.get(resultChar) !== resultNum) ||
        (resultNum === 0 && leadChar.has(resultChar))
      )
        return false;
      usedVal.add(resultNum);
      solution.set(resultChar, resultNum);
      if (helper(digit + 1, 0, (carry - resultNum) / 10)) {
        return true;
      }
      !isUsed && usedVal.delete(resultNum) && solution.delete(resultChar);
      return false;
    }

    const index = words[wordIndex].length - digit;
    if (index < 0) return helper(digit, wordIndex + 1, carry);
    const char = words[wordIndex][index];
    if (solution.has(char)) return helper(digit, wordIndex + 1, carry + solution.get(char));
    for (let i = 0; i < 10; ++i) {
      if (usedVal.has(i) || (i === 0 && leadChar.has(char))) continue;
      usedVal.add(i);
      solution.set(char, i);
      if (helper(digit, wordIndex + 1, carry + i)) {
        return solution;
      }
      usedVal.delete(i);
      solution.delete(char);
    }

    return false;
  }
};

const App = props => {
  const [puzzle, setPuzzle] = useState([]);
  const [letters, setLetters] = useState([]);
  const [showModal, setShowModal] = useState();
  const [answer, setAnswer] = useState();

  const winText = { title: 'Correct!', message: 'Play Again!' };
  const loseText = { title: 'Incorrect!', message: 'Try Again!' };

  useEffect(() => {
    handleNewPuzzle();
  }, []);

  const handleNewPuzzle = () => {
    const chosen = puzzles[randomNumber(puzzles.length)];
    setPuzzle(chosen);
    setLetters(get_letters(chosen));
    setAnswer(null);
  };

  const checkAnswer = guess => {
    console.log(guess);
    const word1 = wordToNum(puzzle[0], guess);
    const word2 = wordToNum(puzzle[1], guess);
    const word3 = wordToNum(puzzle[2], guess);
    setShowModal(word1 + word2 === word3 ? winText : loseText);
  };

  const hideModal = () => {
    setShowModal(null);
    if (showModal.title === winText.title) {
      handleNewPuzzle();
    }
  };

  const showAnswer = () => {
    const result = solver(puzzle);
    const solution = Object.fromEntries(result);
    const solved = [
      wordToNum(puzzle[0], solution).toString(),
      wordToNum(puzzle[1], solution).toString(),
      wordToNum(puzzle[2], solution).toString()
    ];
    setAnswer(solved);
  };

  return (
    <React.Fragment>
      <Header />

      {puzzle.length && (
        <div className={styles.row}>
          <ShowPuzzle puzzle={puzzle} />
        </div>
      )}

      {puzzle.length && (
        <div className={styles.row}>
          <Guess puzzle={puzzle} letters={letters} checkAnswer={checkAnswer} answer={answer} />
        </div>
      )}

      {showModal && <Modal title={showModal.title} message={showModal.message} onConfirm={hideModal} />}

      {answer && (
        <div className={styles.row}>
          <Answer answer={answer} />
        </div>
      )}

      <Footer newPuzzle={handleNewPuzzle} solvePuzzle={showAnswer} answer={answer} />
    </React.Fragment>
  );
};

export default App;
