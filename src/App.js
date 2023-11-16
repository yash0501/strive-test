import logo from "./logo.svg";
import "./App.css";
import { connectWallet, getAccount, generalMint } from "./Tezos";

function App() {
  const WalletConnect = async () => {
    await connectWallet();
    const account = await getAccount();
    console.log(account);
  };

  const callGeneralMint = async () => {
    let _ipfsUrl = "ipfs://QmXmGgxSH9JrCUbAe9oSMb6vNd5aJY6F4ZNpmPkC9FqcRL";
    let nonce = 1;
    let ttl = 1700140653;
    await generalMint(_ipfsUrl, nonce, ttl);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={WalletConnect}>connect Wallet</button>

        <button onClick={callGeneralMint}>General Mint</button>
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
