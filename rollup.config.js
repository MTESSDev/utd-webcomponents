import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import css2 from 'rollup-plugin-css-porter';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default [{
    input: 'src/utd-components.js',
    output: {
        sourcemap: false,
        format: 'iife',
        name: 'app',
        file: 'public/js/utd-webcomponents-v1.1.0.js'
    },
    plugins: [
        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
                customElement: true
            }
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        //        css({ output: 'bundle.css' }),
        css2({ dest: 'public/css/utd-webcomponents-v1.1.0.css' }),
        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs

        // compile to IE11 compatible ES5
        babel({
            runtimeHelpers: true,
            extensions: [ '.js', '.mjs', '.html', '.svelte' ],
            exclude: [ 'node_modules/@babel/**', 'node_modules/core-js/**' ],
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                        ie: '11'
                        },
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ]
            ],
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                [
                '@babel/plugin-transform-runtime',
                    {
                        useESModules: true
                    }
                ]
            ]
        }),
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
},
{
    input: 'src/siteDemo.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/siteDemo.js'
    },
    plugins: [
        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            }
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'siteDemo.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
}];