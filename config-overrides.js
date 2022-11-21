const webpack = require('webpack');
const { aliasWebpack, configPaths } = require('react-app-alias');
import dayjs from 'dayjs';

import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);


module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		buffer: require.resolve('buffer'),
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		https: require.resolve('https-browserify'),
		timers: require.resolve('timers-browserify'),
		os: require.resolve('os-browserify'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		url: require.resolve('url'),
	});
	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	]);

	return aliasWebpack({
		alias: configPaths('./tsconfig.paths.json'),
	})(config);
};
