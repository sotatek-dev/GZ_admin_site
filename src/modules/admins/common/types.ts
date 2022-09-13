export interface Admin {
	_id: string;
	created_at: string;
	updated_at: string;
	wallet_address: string;
	email: string;
	username: string;
	firstname: string;
	lastname: string;
	role: string;
	full_name: string; // infer type field = firstname + lastname
}

export interface Pagination {
	total: number;
	page: number;
	limit: number;
}