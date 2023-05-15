import logo from './rok.png';
import './App.css';
import Form from './form.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
      </header>
    </div>
  );
  
}

export default App;
