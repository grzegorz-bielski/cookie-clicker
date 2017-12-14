import { defineConstants } from 'webpack-blocks';

export default function (config, env, helpers) {
	const PUBLIC_PATH = env.production ? '/cookie-clicker/' : '/';
	config.output.publicPath = PUBLIC_PATH;
	config.plugins.push(defineConstants({ PUBLIC_PATH }));
}