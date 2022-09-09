import { useNavigate, useParams } from 'react-router';
import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import {
	useDeleteAdmin,
	useGetAdminById,
	useUpdateAdmin,
} from '@admins/common/services/mutations';
import { AdminForm } from '@admins/common/components';
import type { Admin } from '@admins/common/types';
import { DeleteButton } from '@admins/edit/components';
import { PATHS } from '@common/constants/paths';

export default function EditAdmin() {
	const navigate = useNavigate();
	const goBack = useRedirectBack();
	const { id } = useParams<{ id: string }>();
	const adminId = id as string;

	const { data, isLoading } = useGetAdminById(id);
	const { updateAdmin, isUpdateAdmin } = useUpdateAdmin();
	const { deleteAdmin } = useDeleteAdmin();

	async function handleUpdate(values: Omit<Admin, '_id'>) {
		await updateAdmin({ _id: adminId, ...values });
		navigate(PATHS.admins.list());
	}

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<DeleteButton htmlType='submit' onClick={() => deleteAdmin(adminId)}>
				Delete Admin
			</DeleteButton>
			<AdminForm
				title='EDIT ADMIN'
				initData={{
					admin: data,
					isGetAdmin: isLoading,
				}}
				finish={{
					onSubmit: handleUpdate,
					isSubmitting: isUpdateAdmin,
				}}
			/>
		</>
	);
}
