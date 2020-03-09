/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: `dist/index.js`,
			sourcemap: true,
			format: 'cjs',
		},
		{
			file: `dist/index.es.js`,
			sourcemap: true,
			format: 'es',
		},
		{
			file: `dist/index.umd.js`,
			sourcemap: true,
			format: 'umd',
			name,
		}
	],
	plugins: [
		typescript({
			typescript: require('typescript'),
		}),
		//uglify({}),
	]
};
