if (!process.env.TOKEN_BRIDGE_MAINNET) {
  throw new Error("TOKEN_BRIDGE_MAINNET is empty");
}
export const TOKEN_BRIDGE_MAINNET: string = process.env.TOKEN_BRIDGE_MAINNET;

if (!process.env.TOKEN_BRIDGE_TESTNET) {
  throw new Error("TOKEN_BRIDGE_TESTNET is empty");
}
export const TOKEN_BRIDGE_TESTNET: string = process.env.TOKEN_BRIDGE_TESTNET;

if (!process.env.INFURA_PROJECT_ID) {
  throw new Error("INFURA_PROJECT_ID is empty");
}
export const INFURA_PROJECT_ID: string = process.env.INFURA_PROJECT_ID;
