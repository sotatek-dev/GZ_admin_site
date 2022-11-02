import { message } from 'antd';

message.config({
	top: 20,
	duration: 3,
	rtl: true,
});

export {
	Typography,
	Space,
	Row,
	Col,
	Spin,
	message,
	Form,
	Input,
	Table,
	Pagination,
	Radio,
} from 'antd';
export { default as Button } from './Button';
export { default as Loading } from './Loading';
export { default as Card } from './Card';
export { default as DatePicker } from './DatePicker';
export { default as InputNumber } from './InputNumber';
export { default as Skeleton } from './Skeleton';
