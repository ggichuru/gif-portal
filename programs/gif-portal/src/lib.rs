use anchor_lang::prelude::*;

declare_id!("7eDtFtH92kuc8dwNgAvoL2dKfbVauELpVcSpbWdF4vX4");

#[program]
pub mod gif_portal {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
