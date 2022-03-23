import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Button from '../UI/Button';

import styles from './Footer.module.css';

const Footer = ({ newPuzzle, solvePuzzle, answer }) => {
  return (
    <React.Fragment>
      <div className={styles.footer}>
        <div className={styles.inner}>
          <Button onClick={newPuzzle} className={styles.button}>
            New Puzzle
          </Button>
          <Button onClick={solvePuzzle} className={styles.button} disabled={answer ? true : false}>
            See Answer
          </Button>
        </div>

        <a href='https://github.com/kaquino1/cryptarithms' className={styles.github}>
          <FontAwesomeIcon icon={faGithub} size='2x' /> <span className={styles.text}>GitHub</span>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Footer;
