use anchor_lang::prelude::*;

declare_id!("7eDtFtH92kuc8dwNgAvoL2dKfbVauELpVcSpbWdF4vX4");

#[program]
pub mod gif_portal {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Get a reference to the account
        let base_account = &mut ctx.accounts.base_account;

        // initialize total_gifs.
        base_account.total_gifs = 0;
        Ok(())
    }
}

// Attach certain variables to the initiliaze context
#[derive(Accounts)]
pub struct Initialize<'info> {
    // Tell solana how we want to initialize BaseAccount
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    // data passed into the program. (proves user calling progam owns their wallet a/c)
    pub user: Signer<'info>,

    // A reference to the SystemProgram -> create accounts on solana
    pub system_program: Program<'info, System>,
}

// Tell solana what we want to store in this account
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
}
