import { useNavigate, useParams } from 'react-router';
import { Button } from '@common/components';
import { Popconfirm } from 'antd';
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
import { useIsSuperAdmin } from '@common/hooks/useIsSuperAdmin';

export default function EditAdmin() {
	const navigate = useNavigate();
	const goBack = useRedirectBack();
	const isSuperAdmin = useIsSuperAdmin();

	const { id } = useParams<{ id: string }>();
	const adminId = id as string;

	const { data } = useGetAdminById(id);
	const { updateAdmin, isUpdateAdmin } = useUpdateAdmin();
	const { deleteAdmin, isDeleting } = useDeleteAdmin();

	async function handleUpdate(values: Omit<Admin, '_id'>) {
		await updateAdmin({ _id: adminId, ...values });
		navigate(PATHS.admins.list());
	}

	const handleDeleteAdmin = () => {
		if (!data) {
			return;
		}

		deleteAdmin(data.wallet_address);
	};

	return (
		<>
			<Button onClick={goBack}>Back</Button>

			<Popconfirm
				className='pl-10'
				title='Sure to remove'
				onConfirm={handleDeleteAdmin}
			>
				<DeleteButton
					danger
					htmlType='submit'
					loading={isDeleting}
					disabled={!isSuperAdmin}
				>
					Delete Admin
				</DeleteButton>
			</Popconfirm>

			<AdminForm
				title='EDIT ADMIN'
				finish={{
					onSubmit: handleUpdate,
					isSubmitting: isUpdateAdmin,
				}}
			/>
		</>
	);
}
