import { message } from 'antd';

message.config({
	top: 50,
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
	InputNumber,
	Table,
} from 'antd';
export { default as Button } from './Button';
export { default as Loading } from './Loading';
export { default as Card } from './Card';
export { default as DatePicker } from './DatePicker';
