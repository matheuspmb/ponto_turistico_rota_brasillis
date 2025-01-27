import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import ListaPontosTuristicos from '../../components/ListaPontosTuristicos'
import BotaoNavegarTelaCadastro from "../../components/BotaoNavegarTelaCadastro";
import logoEmpresa from '../../imagens/logoEmpresa.png'

function Home() {

  return (
    <section className={styles.home_container}>
      <div className={styles.logotipoHome}>
        <img src={logoEmpresa} alt="logotipo da empresa" title="logotipo da empresa" />
        <BotaoNavegarTelaCadastro />
      </div>
      <ListaPontosTuristicos/>
    </section>
  );
}

export default Home;
