if (!process.env.TOKEN_BRIDGE_MAINNET) {
  throw new Error("TOKEN_BRIDGE_MAINNET is empty");
}
export const TOKEN_BRIDGE_MAINNET: string = process.env.TOKEN_BRIDGE_MAINNET;

if (!process.env.TOKEN_BRIDGE_TESTNET) {
  throw new Error("TOKEN_BRIDGE_TESTNET is empty");
}
export const TOKEN_BRIDGE_TESTNET: string = process.env.TOKEN_BRIDGE_TESTNET;

if (!process.env.TOKEN_BRIDGE_DEV) {
  throw new Error("TOKEN_BRIDGE_DEV is empty");
}
export const TOKEN_BRIDGE_DEV: string = process.env.TOKEN_BRIDGE_DEV;
