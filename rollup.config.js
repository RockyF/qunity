/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity';

const prod = process.env.BUILD === 'production';

const options = {
	input: 'src/index.ts',
	output: [
		/*{
			file: `dist/index.js`,
			sourcemap: true,
			format: 'cjs',
		},
		{
			file: `dist/index.es.js`,
			sourcemap: true,
			format: 'es',
		},*/
		{
			file: prod ? 'dist/index.min.js' : 'dist/index.js',
			sourcemap: !prod,
			format: 'umd',
			name,
		}
	],
	plugins: [
		resolve({
			browser: true,
		}),
		typescript({
			typescript: require('typescript'),
		}),
		commonjs(),
	]
};

if (prod) {
	options.plugins.push(uglify({}));
}

export default options;
