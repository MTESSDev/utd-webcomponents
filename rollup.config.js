import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import css2 from 'rollup-plugin-css-porter';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';
import replace from '@rollup/plugin-replace';

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
    output: [
        // Version pour site démo
        {
            sourcemap: false,
            format: 'iife',
            name: 'utd',
            file: `public/js/utd-webcomponents.min.js`
        },
        // Version pour diffusion
        {
            sourcemap: false,
            format: 'iife',
            name: 'utd',
            file: `dist/js/utd-webcomponents.min.js`
        }
    ],
    plugins: [
        replace({            
            _versionUtd_ : `?v=${pkg.version}`,
            _vUtd_ : `v${pkg.version}`,
            delimiters: ['', '']
        }),
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
        css2({ dest: `public/css/utd-webcomponents.css` }),
        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs

        // compile to IE11 compatible ES5
        copy({
            targets: [
              { src: `src/librairie/sprites/dist/view/svg/sprite.view.svg`, dest: `public/images`, rename: `utd-sprite.svg` },
              { src: `src/librairie/sprites/dist/view/svg/sprite.view.svg`, dest: `dist/images`, rename: `utd-sprite.svg` },
              { src: `src/librairie/components/fonts/*`, dest: `dist/fonts`},
              { src: `src/librairie/components/fonts/*`, dest: `public/fonts`},
            ]
          }),
    
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
    ]
},
//TODO ici trouver moyen de passer des fichiers bidon pour éviter erreur
{
    input: 'src/utd-dummy.js',
    output: {
      file: 'build/dummy.js',
      format: 'cjs'
    },
    plugins: [
        copy({
            targets: [
                { src: `public/css/utd-webcomponents.min.css`, dest: `dist/css`}
            ]
        })
    ]
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
        // ICI on fait exprès de faire un serve suivi d'un terser pour simuler le code de prod (histoire de tester notre module code source et s'assurer que ce n'est pas compressé ou mal formaté)
        !production && serve(),
        !production && terser({compress: false, mangle: false, format: {keep_numbers: true, keep_quoted_props: true, comments: 'all'}}),
        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser({compress: false, mangle: false, format: {keep_numbers: true, keep_quoted_props: true, comments: 'all'}})
        //production && terser()
    ],
    watch: {
        clearScreen: false
    }
}];