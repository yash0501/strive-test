import { TezosToolkit } from "@taquito/taquito";
import { Parser, packDataBytes } from "@taquito/michel-codec";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import { SigningType } from "@airgap/beacon-sdk";

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

tezos.setWalletProvider(wallet);

export const tranasction = async () => {
  let _utilityName = "ABC";
  let _expirable = false;
  let _expiry = 0;
  let _redeem_limit = 0;
  let accountAddress = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb";
  let nonce = 0;
  let ttl = 0;

  let data = `(Pair "${_utilityName}" (Pair "${_expirable}" (Pair ${_expiry} (Pair ${_redeem_limit} (Pair ${nonce} (Pair ${ttl} "${accountAddress}")))))))`;
  //   // let data = `(Pair (Pair (Pair (Pair (Pair (Pair ))))))`
  let type = `(pair (string) (pair (bool) (pair (nat) (pair (nat) (pair (nat) (pair (nat) (address)))))))`;

  // let data = `(Pair "${_utilityName}" "${_expirable}")`;
  // let type = `(pair (string) (bool))`;

  let p = new Parser();

  const dataJSON = p.parseMichelineExpression(data);
  const typeJSON = p.parseMichelineExpression(type);

  console.log(dataJSON);
  console.log(typeJSON);

  const packed = packDataBytes(dataJSON, typeJSON);
  console.log(packed);

  let payload = {
    signingType: SigningType.MICHELINE,
    payload:
      "05010000004254657a6f73205369676e6564204d6573736167653a206d79646170702e636f6d20323032312d30312d31345431353a31363a30345a2048656c6c6f20776f726c6421",
    sourceAddress: accountAddress,
  };
  await wallet.requestPermissions({
    network: {
      type: NetworkType.GHOSTNET,
    },
  });
  const signed = await wallet.client.requestSignPayload(payload);

  console.log(signed);
};
