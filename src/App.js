import logo from "./logo.svg";
import "./App.css";
import {
  connectWallet,
  getAccount,
  // claimUtility,
  // transferUtility,
  // redeemUtility,
  // createUtility,
  // rentUtility,
  // transferAndRent,
  generalMint,
} from "./Tezos";

function App() {
  const WalletConnect = async () => {
    await connectWallet();
    const account = await getAccount();
    console.log(account);
  };

  // const createUtilityTransaction = async () => {
  //   let _utilityName = "test";
  //   let _expirable = "True";
  //   let _expiry = 100;
  //   let _redeem_limit = 100;
  //   let nonce = 100;
  //   let ttl = 100;
  //   await createUtility(
  //     _utilityName,
  //     _expirable,
  //     _expiry,
  //     _redeem_limit,
  //     nonce,
  //     ttl
  //   );
  // };

  // const claimUtilityTransaction = async () => {
  //   // _utilityId, tokenId, nonce, ttl
  //   let _utilityId = 1;
  //   let tokenId = 1;
  //   let nonce = 100;
  //   let ttl = 100;
  //   await claimUtility(_utilityId, tokenId, nonce, ttl);
  // };

  // const transferUtilityTransaction = async () => {
  //   // _utilityId, tokenId, receiver, nonce, ttl
  //   let _utilityId = 1;
  //   let tokenId = 1;
  //   let receiver = "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L";
  //   let nonce = 100;
  //   let ttl = 100;
  //   await transferUtility(_utilityId, tokenId, receiver, nonce, ttl);
  // };

  // const redeemUtilityTransaction = async () => {
  //   // _utilityId, tokenId, nonce, ttl
  //   let _utilityId = 1;
  //   let tokenId = 1;
  //   let nonce = 100;
  //   let ttl = 100;
  //   await redeemUtility(_utilityId, tokenId, nonce, ttl);
  // };

  // const rentUtilityTransaction = async () => {
  //   // _utilityId, tokenId, _renter, _rentalDuration, nonce, ttl
  //   let _utilityId = 1;
  //   let tokenId = 1;
  //   let _renter = "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L";
  //   let _rentalDuration = 100;
  //   let nonce = 100;
  //   let ttl = 100;
  //   await rentUtility(
  //     _utilityId,
  //     tokenId,
  //     _renter,
  //     _rentalDuration,
  //     nonce,
  //     ttl
  //   );
  // };

  // const transferAndRentTransaction = async () => {
  //   // _utilityId, tokenId, _rental, _renter, _rentalDuration, nonce, ttl
  //   let _utilityId = 1;
  //   let tokenId = 1;
  //   let _rental = "True";
  //   let _renter = "tz1YvE7Sfo92ueEPEdZceNWd5MWNeMNSt16L";
  //   let _rentalDuration = 100;
  //   let nonce = 100;
  //   let ttl = 100;
  //   await transferAndRent(
  //     _utilityId,
  //     tokenId,
  //     _rental,
  //     _renter,
  //     _rentalDuration,
  //     nonce,
  //     ttl
  //   );
  // };

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
        {/* <button onClick={createUtilityTransaction}>Create Utility</button>
        <button onClick={claimUtilityTransaction}>Claim Utility</button>
        <button onClick={transferUtilityTransaction}>Transfer Utility</button>
        <button onClick={redeemUtilityTransaction}>Redeem Utility</button>
        <button onClick={rentUtilityTransaction}>Rent Utility</button>
        <button onClick={transferAndRentTransaction}>
          Transfer and Rent Utility
        </button> */}
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
