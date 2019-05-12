import builtins from "builtin-modules";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import json from "rollup-plugin-json";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";

const external = ["sqlite", "levelup", "leveldown"];

export default
  Object.keys(pkg.bin || {}).map(name => {
    return {
      input: `src/${name}-cli.mjs`,
      output: {
        file: pkg.bin[name],
        format: "cjs",
        banner:
          '#!/bin/sh\n":" //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"',
        interop: false
      },
      plugins: [
        resolve({ preferBuiltins: true }),
        commonjs(),
        json({
          preferConst: true,
          compact: true
        }),
        cleanup(),
        executable()
      ],
      external
    };
  });
