import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import { AdminForm } from '@admins/common/components';
import { useCreateAdmin } from './CreateAdmin.mutation';
import { Admin } from '@admins/common/types';

export default function CreateAdmin() {
	const goBack = useRedirectBack();
	const { createAdmin } = useCreateAdmin();

	function handleCreateAdmin(values: Omit<Admin, '_id'>) {
		createAdmin(values);
	}

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<AdminForm title='CREATE NEW ADMIN' handleSubmit={handleCreateAdmin} />
		</>
	);
}
