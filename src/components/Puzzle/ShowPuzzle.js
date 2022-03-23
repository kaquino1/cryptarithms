import React from 'react';

import Card from '../UI/Card';

import styles from './ShowPuzzle.module.css';

const ShowPuzzle = ({ puzzle }) => {
  const word1 = puzzle[0];
  const word2 = puzzle[1];
  const word3 = puzzle[2];

  const spacer1 = ' '.repeat(word3.length - word1.length + 2);
  const spacer2 = '+' + ' '.repeat(word3.length - word2.length + 1);
  const spacer3 = ' '.repeat(2);
  const divider = '-'.repeat(word3.length + 4);

  return (
    <div className={styles.container}>
      <Card className={styles.puzzle}>
        <div>
          <span>{spacer1 + word1}</span>
        </div>
        <div>
          <span>{spacer2 + word2}</span>
        </div>
        <div>
          <span>{divider}</span>
        </div>
        <div>
          <span>{spacer3 + word3}</span>
        </div>
      </Card>
    </div>
  );
};

export default ShowPuzzle;
