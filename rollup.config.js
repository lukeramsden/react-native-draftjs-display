import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
	// CommonJS (for Node) and ES module (for bundlers) build.
	{
		input: 'src/main.ts',
		external: [],
		plugins: [
			typescript() // so Rollup can convert TypeScript to JavaScript
		],
		output: [

			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
