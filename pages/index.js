import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import HeadPage from '../components/HeadPage';
import styles from '../css/index.module.css';

if (process.browser) {
  const img = document.getElementById('img');
  
  img.addEventListener('mouseenter', () => {
    return img.src = '/assets/img/ideia-aceso.png';
  });
  
  img.addEventListener('mouseleave', () => {
    return img.src = '/assets/img/ideia-apagado.png';
  });
}

const fetcher = (...args) => fetch(...args)
  .then(res => res.json());

const Index = () => {

  const { data, error } = useSWR('/api/get-promo', fetcher);
  
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
          src="/assets/img/ideia-apagado.png" 
          alt="Ideia"
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
