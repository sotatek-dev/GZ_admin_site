export interface Admin {
	_id: string;
	created_at: string;
	updated_at: string;
	wallet_address: string;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	role: string;
}

export interface Pagination {
	total: number;
	page: number;
	limit: number;
}
