import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

import styles from './Guess.module.css';

const Guess = ({ letters, checkAnswer, answer }) => {
  const [guess, setGuess] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const start = {};
    letters.forEach(letter => {
      start[letter] = 0;
    });
    setGuess(start);
  }, [letters]);

  const selectBoxes = answer => {
    const options = [...Array(10).keys()];
    return letters.map(el => {
      return (
        <div className={styles.oneSelect} key={el}>
          <label htmlFor={el}>{el}:</label>
          <div className={styles.select}>
            <select
              name={el}
              className={styles.custom}
              value={guess[el]}
              disabled={answer ? true : false}
              onChange={e => {
                setGuess(oldGuess => ({ ...oldGuess, [el]: Number(e.target.value) }));
              }}
            >
              {options.map(i => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <span className={styles.focus}></span>
          </div>
        </div>
      );
    });
  };

  const handleSumbit = e => {
    e.preventDefault();
    if (!isValid()) {
      setError({
        title: 'Invalid Input',
        message: 'Assign Each Letter a Different Number.'
      });
      return;
    }
    checkAnswer(guess);
  };

  const isValid = () => {
    console.log(guess);
    const values = Object.values(guess);
    return new Set(values).size === values.length;
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && <Modal title={error.title} message={error.message} onConfirm={errorHandler} />}

      <div className={styles.container}>
        <Card className={styles.guess}>
          <h2>Assign Values:</h2>
          <form className={styles.guessForm} onSubmit={handleSumbit}>
            <div className={styles.selectBoxes}>{selectBoxes(answer)}</div>
            <Button type='submit' disabled={answer ? true : false}>
              Go!
            </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Guess;
