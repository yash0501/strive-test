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

export const generalMint = async (_ipfsUrl, nonce, ttl) => {
  let _ipfsHash = char2Bytes(_ipfsUrl);
  console.log(_ipfsHash);
  let data = `(Pair "${_ipfsHash}" (Pair ${nonce} ${ttl}))`;
  let type = `(pair (bytes) (pair (nat) (nat)))`;

  let result = await makeSignature(data, type);
  console.log(result, _ipfsHash);
};
