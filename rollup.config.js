/**
 * Created by rockyl on 2018/11/16.
 */

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const {uglify} = require('rollup-plugin-uglify');

const name = 'qunity';

export default {
	input: 'src/index.ts',
	output: [
		{
			file: `dist/index.cjs.js`,
			format: 'cjs',
		},
		{
			file: `dist/index.es.js`,
			format: 'es',
		},
		{
			file: `dist/scilla.js`,
			format: 'umd',
			name,
		},
		{
			file: `dist/index.js`,
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
			tslib: require('tslib'),
			declaration: false,
		}),
		commonjs(),
		//uglify({}),
	]
};
