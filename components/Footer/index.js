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
        <figure className={styles.imgs}>
          <img className={styles.fsm} src="/assets/img/logo-semana-fsm.png" alt="Semana FSM" />
          <img className={styles.dev} src="/assets/img/logo-devpleno.png" alt="Dev Pleno" />
        </figure>
      </div>
    </div>
  );
};

export default Footer;
