import React, { useState } from 'react';

import styles from '../css/pesquisa.module.css';
import HeadPage from '../components/HeadPage';

const Pesquisa = () => {
  const notas = [1, 2, 3, 4, 5];

  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    WhatsApp: '',
    Nota: '',
    Mensagem: ''
  });

  const [success, setSuccess] = useState(false);
  const [successReturn, setSuccessReturn] = useState({});

  const enviarOpiniaoSugestao = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      });
  
      const data = await response.json();

      setSuccess(true);
      setSuccessReturn(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeForm = event => {
    const key = event.target.name;
    const value = event.target.value;

    setForm(old => ({
      ...old,
      [key]: value
    }));
  };

  return (
    <div className={styles.pesquisaContainer}>
      <HeadPage title="Pesquisa" />

      {!success && 
      <div>
        <h1 className={styles.title}>Opinião ou Sugestão</h1>
        <p>O estabelecimento Comida Mineira sempre busca por atender melhor seus clientes.</p>
        <p>Por isso sempre queremos saber a sua opinião ou sugestão.</p>
        <div className={styles.inputGroup}>
          <div className={styles.input}>
            <label htmlFor="name">Nome:</label>
            <input 
              id="name" 
              type="text"
              name="Nome"
              value={form.Nome}
              onChange={changeForm} 
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="email">e-mail:</label>
            <input 
              id="email" 
              type="email"
              name="Email"
              value={form.Email}
              onChange={changeForm} 
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="whatsapp">WhatsApp:</label>
            <input 
              id="whatsapp" 
              type="tel" 
              pattern="[0-9]{2} [0-9]{5}-[0-9]{4}" 
              name="WhatsApp" 
              value={form.WhatsApp}
              onChange={changeForm} 
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="opiniaoSugestao">Opinião / Sugestão:</label>
            <textarea 
              name="opiniaoSugestao" 
              id="opiniaoSugestao" 
              cols="40" 
              rows="10"
              maxLength="500"
              name="Mensagem"
              value={form.Mensagem}
              onChange={changeForm}>
            </textarea>
          </div>
          <div className={styles.radioContainer}>
            <label htmlFor="nota">Nota:</label>
  
            {notas.map((nota, index) => {
              return (
                <div className={styles.radioGroup} key={index}>
                <input 
                  className={styles.radio} 
                  type="radio"
                  name="Nota" 
                  value={nota}
                  onChange={changeForm}
                />
                <span>{nota}</span>
                </div>
              );
            })}

          </div>
          <div className={styles.input}>
            <button 
              className={styles.button} 
              onClick={enviarOpiniaoSugestao}>
                Enviar Opinião / Sugestão
            </button>
          </div>
        </div>
      </div>
      }

      {success && 
      <div className={styles.coupon}>
        <h1>Obrigado pela sua opinião / sugestão!</h1>
        <h2>Cupom:</h2>
        <div>{successReturn.Cupom}</div>
        <h2>Promoção:</h2>
        <p>{successReturn.Promo}</p>
      </div>
      }

    </div>
  );
};

export default Pesquisa;
