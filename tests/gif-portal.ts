import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

const main = async () => {
  console.log("😀 Starting Test");

  /**
   * @description tell anchor to set our provider
   *  - It gets the data from `solana config get`
   *  - In this case, its grabbing our local env, for anchor to know it should run the code locally
   */
  anchor.setProvider(anchor.AnchorProvider.env());

  /**
   * @description tell anchor to automatically compile our code in lib.rs and get it deployed on a local validator.
   */
  const program = anchor.workspace.GifPortal;
  const tx = await program.rpc.initialize();

  console.log("🤖 Your transaction Signature", tx);
};

/**
 * @description run the main function asynchronously
 */
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
