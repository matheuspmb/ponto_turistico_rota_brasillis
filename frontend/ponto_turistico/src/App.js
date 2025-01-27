import Home from './components/pages/Home';
import CadastroPontoTuristico from './components/pages/CadastroPontoTuristico';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AtualizaTitulo from './components/AtualizaTitulo';

function App() {
  return (
    <div>
      <Router>
        <AtualizaTitulo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastroPontoTuristico />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

