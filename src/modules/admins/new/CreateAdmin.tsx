import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import { AdminForm } from '@admins/common/components';
import { useCreateAdmin } from './CreateAdmin.mutation';
import { Admin } from '@admins/common/types';
import { useNavigate } from 'react-router';
import { PATHS } from '@common/constants/paths';

export default function CreateAdmin() {
	const navigate = useNavigate();
	const goBack = useRedirectBack();
	const { createAdmin, isCreatingAdmin } = useCreateAdmin();

	async function handleCreateAdmin(values: Omit<Admin, '_id'>) {
		await createAdmin(values);
		navigate(PATHS.admins.list());
	}

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<AdminForm
				title='CREATE NEW ADMIN'
				finish={{ onSubmit: handleCreateAdmin, isSubmitting: isCreatingAdmin }}
			/>
		</>
	);
}
