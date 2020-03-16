/**
 * Created by rockyl on 2018/11/16.
 */

const typescript = require('rollup-plugin-typescript');
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
		typescript({
			typescript: require('typescript'),
		}),
	]
};

if (prod) {
	options.plugins.push(uglify({}));
}

export default options;
