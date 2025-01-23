import { useNavigate } from "react-router-dom";


function BotaoVoltar() {
    const navigate = useNavigate();
  
    const handleNavigate = () => {
      navigate("/");
    };
  
    return ( <button type="button" onClick={handleNavigate}> Voltar </button> );
    
  }

  export default BotaoVoltar