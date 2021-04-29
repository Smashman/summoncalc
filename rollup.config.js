import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        }
    },
    external: ['react', 'react-dom'],
    plugins: [
        postcss({
            modules: true,
            extract: true,
            writeDefinitions: true,
        }),
        commonjs(),
        typescript(),
        nodeResolve(),
    ]
};