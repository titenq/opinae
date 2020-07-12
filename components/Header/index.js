import React from 'react';
import Link from 'next/link';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className="p-4 shadow-md">
        <ul className={styles.ul}>
          <li>
            <Link href='/'>
              <a className="m-4">
                <figure className={styles.figure}>
                  <img 
                    className={styles.img} 
                    src="/assets/img/logo-palpitebox.png" 
                    alt="Palpite Box"
                  />
                </figure>
              </a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className="m-4">Home</a>
            </Link>
          </li>
          <li>
            <Link href='/sobre'>
              <a className="m-4">Sobre</a>
            </Link>
          </li>
          <li>
            <Link href='/contato'>
              <a className="m-4">Contato</a>
            </Link>
          </li>
          <li>
            <Link href='/pesquisa'>
              <a className="m-4">Pesquisa</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
