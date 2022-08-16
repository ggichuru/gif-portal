import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("😀 Starting Test");

  /**
   * @description tell anchor to set our provider
   *  - It gets the data from `solana config get`
   *  - In this case, its grabbing our local env, for anchor to know it should run the code locally
   */
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  /**
   * @description tell anchor to automatically compile our code in lib.rs and get it deployed on a local validator.
   */
  const program = anchor.workspace.GifPortal;

  // create an account keypair for our program to use -> create some credentials for the BaseAccount we are creating
  const baseAccount = anchor.web3.Keypair.generate();

  // call intiliaze, passing the needed parameters
  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("🤖 Your transaction Signature", tx);

  // Fetch Data from the Account
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("😶‍🌫️ GIF COUNT: => ", account.totalGifs.toString());

  // Call add_gif
  await program.rpc.addGif({
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });

  // Get the account again to see what changed
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("😶‍🌫️ (new) GIF COUNT: => ", account.totalGifs.toString());
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
