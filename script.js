const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");

// Relace by your own mnemonic. Usually 24 words form the BIP-39 english list
const mnemonic = "";

// Convert the mnemonic to a seed
const seed = bip39.mnemonicToSeedSync(mnemonic.mnemonic);

// Create an HD wallet key from the seed
const hdWallet = hdkey.fromMasterSeed(seed);

function generateAddress(index) {
  const ledgerPath = `m/44'/60'/${index}'/0/0`; // metamask use BIP-44 path aka m/44'/60'/0'/0/${index}
  const wallet = hdWallet.derivePath(ledgerPath).getWallet();
  const address = wallet.getAddressString();
  const privateKey = wallet.getPrivateKeyString();

  return {
    address,
    path: ledgerPath,
    privateKey,
  };
}

// Generate and log the first 5 addresses
for (let i = 0; i < 5; i++) {
  const info = generateAddress(i);
  console.log(`Address ${i}:`, info);
}
