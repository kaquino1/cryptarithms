import React from 'react';

import styles from './Header.module.css';

const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.header}>
        <h1 className={styles.title}>Cryptarithms</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Decode the puzzle by replacing the letters in the equation with numbers. Each letter corresponds with one
          number in the range [0, 9], but not all may appear. All letters of the same type are represented by the same
          number and no terms may contain a leading zero. All puzzles in this game have only one solution.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Header;
