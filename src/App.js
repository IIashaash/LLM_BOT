import  Index from './Components/index';
import './App.css';
import Login from './Autho/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forgotpwd from './Autho/Forgotpwd';
import { AuthProvider } from './services/AuthContext';
function App() {
  return (
    <div className="App">
         <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpwd" element={<Forgotpwd />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
