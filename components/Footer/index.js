import React from 'react';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.devBy}>
        <span>Desenvolvido por:</span>
        <a 
          className='hover:underline' 
          href='https://github.com/titenq' 
          target='_blank' 
          rel='noreferrer'>
            TitenQ
        </a>
      </div>
    </div>
  );
};

export default Footer;
