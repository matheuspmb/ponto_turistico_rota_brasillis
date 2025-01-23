import { useNavigate } from "react-router-dom";

function BotaoNavegarTelaCadastro() {

    const navigate = useNavigate();

    const BotaoTelaCadastrar = () => {
        navigate("/cadastrar");
    }

    return ( <button type="button" onClick={BotaoTelaCadastrar}>Cadastrar um ponto turístico</button> )

}

export default BotaoNavegarTelaCadastro