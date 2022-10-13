import { AdminRole } from '@common/constants/roles';
import { useAuth } from './useAuth';

export function useIsSuperAdmin() {
	const { admin } = useAuth();

	return admin?.role === AdminRole.SuperAdmin;
}
