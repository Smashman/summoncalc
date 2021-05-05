import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const prod = process.env.NODE_ENV === 'production';

const plugins = [
    postcss({
        modules: true,
        extract: true,
        writeDefinitions: true,
    }),
    commonjs(),
    typescript(),
    nodeResolve(),
];

if (prod) {
    plugins.push(terser());
}

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: !prod,
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
    },
    external: ['react', 'react-dom'],
    plugins,
};
