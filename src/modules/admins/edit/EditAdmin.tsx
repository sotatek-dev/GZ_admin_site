import { useNavigate, useParams } from 'react-router';
import LoadingPage from 'src/router/components/LoadingPage';
import { Button } from '@common/components';
import { useGetAdminById, useUpdateAdmin } from '@admins/common/services';
import { AdminForm } from '@admins/common/components';
import type { Admin } from '@admins/common/types';

export default function EditAdmin() {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	const { id } = useParams<{ id: string }>();
	const adminId = id as string;

	const { data, isLoading } = useGetAdminById(id);
	const { updateAdmin } = useUpdateAdmin();

	if (isLoading) {
		return <LoadingPage />;
	}

	const handleSubmitUpdate = (values: Omit<Admin, '_id'>) => {
		updateAdmin({ _id: adminId, ...values });
	};

	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<AdminForm
				title='EDIT ADMIN'
				admin={data}
				handleSubmit={handleSubmitUpdate}
			/>
		</>
	);
}
