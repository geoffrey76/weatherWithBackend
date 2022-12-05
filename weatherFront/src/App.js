import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import MainWeather from './pages/MainWeather';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWeather />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
