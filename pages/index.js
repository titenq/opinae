import React, { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import HeadPage from '../components/HeadPage';
import styles from '../css/index.module.css';

const fetcher = (...args) => fetch(...args)
  .then(res => res.json());

const Index = () => {
  const [src, setSrc] = useState('/assets/img/ideia-apagado.png');

  const { data, error } = useSWR('/api/get-promo', fetcher);

  const mouseEnter = () => {
    setSrc('/assets/img/ideia-aceso.png');
  };
  
  const mouseLeave = () => {
    setSrc('/assets/img/ideia-apagado.png');
  };
  
  return (
    <>
      <HeadPage title="Home" />
      <div className={styles.message}>
        <p>O estabelecimento Comida Mineira sempre busca pelo melhor atendimento aos seus clientes.</p>
        <p>Por isso queremos saber a sua opinião ou sugestão.</p>
      </div>
      <figure>
        <img 
          id="img"
          className={styles.ideia} 
          src={src} 
          alt="Ideia"
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        />
      </figure>
      <Link href='/pesquisa'>
        <a>
          <div className={styles.buttonContainer}>
            Enviar opinião ou sugestão
          </div>
        </a>
      </Link>
      { !data && <p>Carregando...</p> }

      { !error && data && data.showCoupon &&
        <div className={styles.message}>
          <p>{data.message}</p>
        </div>
      } 
    </>
  );
};

export default Index;
