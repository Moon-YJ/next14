/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		// 서버쪽에서 모든 scss 파일에 variable.scss 파일을 import할 수 있게 해주므로 useMedia hook 사용하지 않아도 됨
		includePath: [path.join(__dirname, 'styles')],
		prependData: `@import '@/styles/variables.scss';`
	},
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com' }]
	}
};

module.exports = nextConfig;
