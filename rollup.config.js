import commonjs from '@rollup/plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import { terser } from "rollup-plugin-terser"

import babel from '@rollup/plugin-babel'
import ts from '@rollup/plugin-typescript'

import pkg from './package.json'

const extensions = [
  '.ts', '.tsx',
]

export default {
  input: './src/Search',

  external: [
    'pouchdb-adapter-memory',
    'pouchdb-adapter-idb',
    'pouchdb-adapter-http',
    'rxdb',
    'rxjs',
    'mobx'
  ],

  plugins: [
    globals(),

    // Allows node_modules resolution
    resolve({
      modulesOnly: true,
      extensions,
      preferBuiltins: false
    }),

    ts(),
    commonjs({
      include: ['node_modules/**/*'],
      ignore: ["conditional-runtime-dependency"],
      namedExports:  {}
    }),
    builtins(),
    babel({ extensions }),
    terser()
  ],

  output: {
    file: pkg.main,
    format: 'cjs',
    exports: 'default'
  }
}
