import { TezosToolkit } from "@taquito/taquito";
import { Parser, packDataBytes } from "@taquito/michel-codec";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import { SigningType } from "@airgap/beacon-sdk";
import { char2Bytes } from "@taquito/utils";

export const tezos = new TezosToolkit("https://ghostnet.smartpy.io");

export const wallet = new BeaconWallet({
  name: "Taquito Boilerplate",
  preferredNetwork: NetworkType.GHOSTNET,
});

export const connectWallet = async () => {
  await wallet.requestPermissions({
    network: {
      type: NetworkType.GHOSTNET,
    },
  });
};

export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};

export const getPublicKey = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.publicKey;
  } else {
    return "";
  }
};

tezos.setWalletProvider(wallet);

const makeSignature = async (data, type) => {
  let p = new Parser();

  const dataJSON = p.parseMichelineExpression(data);
  const typeJSON = p.parseMichelineExpression(type);

  const packed = packDataBytes(dataJSON, typeJSON);

  let payload = {
    signingType: SigningType.MICHELINE,
    payload: packed.bytes,
  };

  const signed = await wallet.client.requestSignPayload(payload);

  let result = {
    bytes: packed.bytes,
    sig: signed.signature,
  };
  return result;
};

// export const createUtility = async (
//   _utilityName,
//   _expirable,
//   _expiry,
//   _redeem_limit,
//   nonce,
//   ttl
// ) => {
//   let data = `(Pair "${_utilityName}" (Pair ${_expirable} (Pair ${_expiry} (Pair ${_redeem_limit} (Pair ${nonce} ${ttl}))))))`;
//   let type = `(pair (string) (pair (bool) (pair (nat) (pair (nat) (pair (nat) (nat) )))))`;
//   let result = await makeSignature(data, type);
//   // get public key of signing account
//   const account = await getPublicKey();
//   console.log(account);

//   const params = {
//     utilityName: _utilityName,
//     expirable: _expirable,
//     expiry: _expiry,
//     redeem_limit: _redeem_limit,
//     _meta: {
//       key: account,
//       sig: result.sig,
//       data_bytes: result.bytes,
//     },
//   };
//   console.log(params);
// };

// export const claimUtility = async (_utilityId, tokenId, nonce, ttl) => {
//   let data = `(Pair ${_utilityId} (Pair ${tokenId} (Pair ${nonce} ${ttl})))`;
//   let type = `(pair (nat) (pair (nat) (pair (nat) (nat))))`;

//   let result = await makeSignature(data, type);
//   console.log(result);
// };

// export const transferUtility = async (
//   _utilityId,
//   tokenId,
//   receiver,
//   nonce,
//   ttl
// ) => {
//   let data = `(Pair ${_utilityId} (Pair ${tokenId} (Pair "${receiver}" (Pair ${nonce} ${ttl}))))`;
//   let type = `(pair (nat) (pair (nat) (pair (address) (pair (nat) (nat)))))`;

//   let result = await makeSignature(data, type);
//   console.log(result);
// };

// export const redeemUtility = async (_utilityId, tokenId, nonce, ttl) => {
//   let data = `(Pair ${_utilityId} (Pair ${tokenId} (Pair ${nonce} ${ttl})))`;
//   let type = `(pair (nat) (pair (nat) (pair (nat) (nat))))`;

//   let result = await makeSignature(data, type);
//   console.log(result);
// };

// export const rentUtility = async (
//   _utilityId,
//   tokenId,
//   _renter,
//   _rentalDuration,
//   nonce,
//   ttl
// ) => {
//   let data = `(Pair ${_utilityId} (Pair ${tokenId} (Pair "${_renter}" (Pair ${_rentalDuration} (Pair ${nonce} ${ttl})))))`;
//   let type = `(pair (nat) (pair (nat) (pair (address) (pair (nat) (pair (nat) (nat))))))`;

//   let result = await makeSignature(data, type);
//   console.log(result);
// };

// export const transferAndRent = async (
//   _utilityId,
//   tokenId,
//   _rental,
//   _renter,
//   _rentalDuration,
//   nonce,
//   ttl
// ) => {
//   let data = `(Pair ${_utilityId} (Pair ${tokenId} (Pair ${_rental} (Pair "${_renter}" (Pair ${_rentalDuration} (Pair ${nonce} ${ttl}))))))`;
//   let type = `(pair (nat) (pair (nat) (pair (bool) (pair (address) (pair (nat) (pair (nat) (nat)))))))`;

//   let result = await makeSignature(data, type);
//   console.log(result);
// };

export const generalMint = async (_ipfsUrl, nonce, ttl) => {
  let _ipfsHash = char2Bytes(_ipfsUrl);
  console.log(_ipfsHash);
  let data = `(Pair "${_ipfsHash}" (Pair ${nonce} ${ttl}))`;
  let type = `(pair (bytes) (pair (nat) (nat)))`;

  let result = await makeSignature(data, type);
  console.log(result, _ipfsHash);
};
