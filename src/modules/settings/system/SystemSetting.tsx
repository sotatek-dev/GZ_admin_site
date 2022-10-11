import './SystemSetting.style.scss';
import { Button, Card, Col, Input, Loading, Row } from '@common/components';
import { useRedirectBack } from '@common/hooks';
import { MESSAGES } from '@common/constants/messages';
import useSetting from './services/useSetting';
const TitleComponent = ({ title }: { title: string }) => {
	return (
		<p className='system-setting-form__title'>
			{title}
			<span className='system-setting-form__title__star'>*</span>
		</p>
	);
};
const ErrorComponent = ({ value }: { value: string }) => {
	return value === '' ||
		parseFloat(value) <= 0 ||
		value.charAt(value.length - 1) === '.' ? (
		<p className='system-setting-form__titleError'>{MESSAGES.MSC115}</p>
	) : (
		<div></div>
	);
};
const InputComponent = ({
	priceType,
	value,
	title,
	keyValue,
	handleRegexField,
}: {
	priceType?: string;
	value: string;
	title: string;
	keyValue: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleRegexField: any;
}) => {
	return (
		<>
			<TitleComponent title={title} />
			<Input
				suffix={priceType ? priceType : ''}
				onChange={(e) => handleRegexField(e, keyValue)}
				value={value}
				status={
					value === '' ||
					parseFloat(value) <= 0 ||
					value.charAt(value.length - 1) === '.'
						? 'error'
						: ''
				}
			/>
			<ErrorComponent value={value} />
		</>
	);
};
export default function SystemSetting() {
	const goBack = useRedirectBack();
	const {
		isLoadingSystemStatus,
		handleSubmit,
		isLoadingInitialData,
		treasuryAddressCommon,
		fieldCommon,
		disableUpdateBtn,
		handleRegexAddress,
		handleRegexField,
	} = useSetting();
	const defaultPriceType = 'BUSD';
	if (isLoadingSystemStatus || isLoadingInitialData) {
		return <Loading />;
	}
	return (
		<>
			<Button onClick={goBack}>Back</Button>
			<Row className='system-setting'>
				<Col xs={24} sm={24} md={24} lg={12} xl={12}>
					<Card
						size='small'
						title='System Setting'
						className='system-setting-form'
					>
						<TitleComponent title='Treasury Address' />
						<Input
							onChange={handleRegexAddress}
							value={treasuryAddressCommon.treasury_address}
							status={
								treasuryAddressCommon.statusAddressAfterRegex ? 'error' : ''
							}
						/>
						{treasuryAddressCommon.statusAddressAfterRegex && (
							<p className='system-setting-form__titleError'>
								{MESSAGES.MSC121}
							</p>
						)}
						<InputComponent
							priceType={defaultPriceType}
							value={fieldCommon.key_price}
							title='Key Price'
							keyValue='key_price'
							handleRegexField={handleRegexField}
						/>
						<InputComponent
							priceType={defaultPriceType}
							value={fieldCommon.rescure_price}
							title='Rescue Price'
							keyValue='rescure_price'
							handleRegexField={handleRegexField}
						/>
						<InputComponent
							priceType={defaultPriceType}
							value={fieldCommon.launch_price}
							title='Launch Price'
							keyValue='launch_price'
							handleRegexField={handleRegexField}
						/>
						<InputComponent
							priceType='DAY'
							value={fieldCommon.mint_days}
							title='Users may mint key for the first (x) days of the month'
							keyValue='mint_days'
							handleRegexField={handleRegexField}
						/>
						<InputComponent
							value={fieldCommon.key_mint_min_token}
							title='User must have minimum (x) token to mint key'
							keyValue='key_mint_min_token'
							handleRegexField={handleRegexField}
						/>
						<div className='system-setting-form__btn'>
							<Button onClick={handleSubmit} disabled={disableUpdateBtn}>
								Update
							</Button>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
}
