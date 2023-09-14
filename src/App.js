import logo from "./logo.svg";
import "./App.css";
import { tranasction, connectWallet, getAccount } from "./Tezos";

function App() {
  const WalletConnect = async () => {
    await connectWallet();
    const account = await getAccount();
    console.log(account);
  };

  const makeTransaction = async () => {
    await tranasction();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={WalletConnect}>connect Wallet</button>
        <button onClick={makeTransaction}>Click me</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
