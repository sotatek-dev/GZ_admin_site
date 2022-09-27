import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import { AdminForm } from '@admins/common/components';
import { useCreateNewAdmin } from './mutations/useCreateNewAdmin';
import { Admin } from '@admins/common/types';

export default function CreateAdmin() {
	const goBack = useRedirectBack();
	const { createNewAdmin, isCreateNewAdmin } = useCreateNewAdmin();

	async function handleCreateAdmin(values: Omit<Admin, '_id'>) {
		createNewAdmin(values);
	}

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<AdminForm
				title='CREATE NEW ADMIN'
				finish={{ onSubmit: handleCreateAdmin, isSubmitting: isCreateNewAdmin }}
			/>
		</>
	);
}
