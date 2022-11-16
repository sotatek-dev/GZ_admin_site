import dayjs from 'dayjs';
import { getCookieStorage, removeOneCookieStorage } from './storage';

const accessToken = 'access_token';
const expireToken = 'expire_token';

export function isJwtTokenExpired() {
	const expiredTime = getCookieStorage('expire_token');
	return !expiredTime || dayjs.unix(expiredTime).isBefore(dayjs());
}

export function hasStorageJwtToken() {
	return !!getCookieStorage(accessToken);
}

export function removeStorageJwtToken() {
	removeOneCookieStorage(accessToken);
	removeOneCookieStorage(expireToken);
}
