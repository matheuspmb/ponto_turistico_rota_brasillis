import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AtualizaTitulo() {
  const location = useLocation();

  useEffect(() => {

    switch (location.pathname) {
      case "/":
        document.title = "Início";
        break;
      case "/cadastrar":
        document.title = "Cadastro";
        break;
      case "/detalhes":
        document.title = "Detalhes";
        break;
      default:
        document.title = "Minha Aplicação";
    }
  }, [location]); 

  return null; 
}

export default AtualizaTitulo;
