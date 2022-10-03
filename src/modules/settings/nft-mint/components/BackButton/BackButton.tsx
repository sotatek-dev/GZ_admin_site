import { Button } from '@common/components';
import { useRedirectBack } from '@common/hooks';

export default function BackButton() {
	const goBack = useRedirectBack();
	return <Button onClick={goBack}>Back</Button>;
}
