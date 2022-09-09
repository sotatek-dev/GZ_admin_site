import { useParams } from 'react-router';
import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import {
	useDeleteAdmin,
	useGetAdminById,
	useUpdateAdmin,
} from '@admins/common/services';
import { AdminForm } from '@admins/common/components';
import type { Admin } from '@admins/common/types';
import { DeleteButton } from '@admins/edit/components';

export default function EditAdmin() {
	const goBack = useRedirectBack();
	const { id } = useParams<{ id: string }>();
	const adminId = id as string;

	const { data, isLoading } = useGetAdminById(id);
	const { updateAdmin } = useUpdateAdmin();
	const { deleteAdmin } = useDeleteAdmin();

	const handleSubmitUpdate = (values: Omit<Admin, '_id'>) => {
		updateAdmin({ _id: adminId, ...values });
	};

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<DeleteButton htmlType='submit' onClick={() => deleteAdmin(adminId)}>
				Delete Admin
			</DeleteButton>
			<AdminForm
				title='EDIT ADMIN'
				admin={data}
				handleSubmit={handleSubmitUpdate}
				loading={isLoading}
			/>
		</>
	);
}
