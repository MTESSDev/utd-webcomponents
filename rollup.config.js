import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import css from 'rollup-plugin-css-only';
//import css2 from 'rollup-plugin-css-porter';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import postcss from 'postcss'
import cssReplace from 'postcss-replace'
import autoprefixer from 'autoprefixer'
import pkg from './package.json';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;
const demoPath = './_demo/public'
const distPath = './dist'

const scssOptions = {
    processor: () =>
        postcss([
            autoprefixer(),
            cssReplace({
                pattern: /_([^\s]+?)_/,
                data: {
                    'pkg-version': pkg.version,
                    'versionUtd' : `?v=${pkg.version}`,
                    'vUtd' : pkg.version,
        
                }
            })
        ]),
    // Choose files to include in processing (default: ['/**/*.css', '/**/*.scss', '/**/*.sass'])
    sourceMap: false,
    //TODO Voir ce que nous avons réellement besoin dans les includePaths
/*        includePaths: [
        path.join(__dirname, '../../node_modules/'),
        'node_modules/',
        'src/scss',
    ],*/
    outputStyle: production ?  'compressed': 'expanded',
    watch: './src/scss'
};


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
        {
            sourcemap: false,
            format: 'iife',
            name: 'utd',
            file: demoPath + `/js/utd-webcomponents.min.js`
        }
    ],
    plugins: [
        replace({            
            _versionUtd_ : `?v=${pkg.version}`,
            _vUtd_ : `${pkg.version}`,
            customElements$1 : 'customElements', //Ici c'est une patch pour notre wrapper de customElement (permettant les attributs kebab). Je n'ai pas trouvé de façon d'avoir le code au bon format après que svelte ait compilé.
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
//        css2({ dest: demoPath + `/css/utd-webcomponents.css` }),


        // IMPORTANT! On conserve Babel pour le moment, sinon nous avons de problèmes avec certains fureteurs ex. Safari < 14.
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
        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs

        //TODO voir éventuellement si c'est vraiment requis commonjs ici
        commonjs(),

        //Build pour production (code js minifié)
        production && terser(),

        //Génération du css
        scss(Object.assign(scssOptions, {
            output: demoPath + '/css/utd-webcomponents.min.css',
        })),
    ]
},
/*=======================================================================================================*/
/*  Génération du site démo + copie de fichiers et ajout code vérification custom elements déjà chargés  */
/*=======================================================================================================*/
{
    input: '_demo/siteDemo.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: demoPath + `/js/siteDemo.js`
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
        //TODO voir éventuellement si c'est vraiment requis commonjs ici
        commonjs(),

        //Copie de fichiers et ajout code vérification custom elements déjà chargés
        copy({
            targets: [
                { src: demoPath + `/css/utd-webcomponents.min.css`, dest: `dist/css`},
                {
                    src: demoPath + `/js/utd-webcomponents.min.js`,
                    dest: distPath + '/js',
                    transform: (contents, filename) => contents.toString().replace('/*!_VerifierSiDejaCharge_*/', "if (customElements.get('utd-infobulle')) { return true; }")
                },
                { src: `./src/assets/sprites/dist/view/svg/sprite.view.svg`, dest: demoPath + `/images`, rename: `utd-sprite.svg` },
                { src: `./src/assets/sprites/dist/view/svg/sprite.view.svg`, dest: distPath + `/images`, rename: `utd-sprite.svg` },
                { src: `./src/assets/fonts/*`, dest: distPath + `/fonts`},
                { src: `./src/assets/fonts/*`, dest: demoPath + `/fonts`},  
                { src: `./src/assets/images/*`, dest: distPath + `/images`},
                { src: `./src/assets/images/*`, dest: demoPath + `/images`}  

            ]
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        // ICI on fait exprès de faire un serve suivi d'un terser pour simuler le code de prod (histoire de tester notre module code source et s'assurer que ce n'est pas compressé ou mal formaté)
        // Aussi on désactive la compression de code (modification lors de la minification afin que nos exemples fonctionnent bien)
        !production && serve(),
        !production && terser({compress: false, mangle: false, format: {keep_numbers: true, keep_quoted_props: true, comments: 'all'}}),
        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload(demoPath),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser({compress: false, mangle: false, format: {keep_numbers: true, keep_quoted_props: true, comments: 'all'}})
        //production && terser()
    ],
    watch: {
        clearScreen: false
    }
}
];