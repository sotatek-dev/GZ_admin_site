export type InitialProps =
	| {
			key_price: number;
			mint_days: number;
			rescure_price: number;
			treasury_address: string;
			updated_at: string;
			launch_price?: string;
			key_mint_min_token?: string;
			_id: string;
	  }
	| undefined;
export type SubmitProps<T> = {
	treasury_address: string;
	key_price: T;
	rescure_price: T;
	launch_price: T;
	mint_days: T;
	key_mint_min_token: T;
};
