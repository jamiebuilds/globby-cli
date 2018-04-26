#!/usr/bin/env node
// @flow
'use strict';
const meow = require('meow');
const globby = require('globby');
const arrify = require('arrify');

const cli = meow({
  help: `
    Usage
      $ globby <...patterns> <...flags>

    Options
      --ignore, -i <pattern>              Ignore glob patterns to exclude matches
      --[no-]expand-dirs, -e [pattern]    Glob directories (default: true)
      --[no-]gitignore                    Respect .gitignore files (default: false)
      --[no-]deep [depth]                 Traverse the entire tree, or to a set depth (default: true)
      --[no-]dot                          Match files and dirs starting with a period (default: false)
      --[no-]only-files                   . (default: true)
      --[no-]only-dirs                    . (default: false)
      --[no-]follow                       Follow symlinked directories when expanding ** patterns (default: true)
      --[no-]unique                       Prevent duplicate results (default: true)
      --[no-]mark-dirs                    Add a / character to directory entries (default: false)
      --[no-]absolute                     Return absolute paths for matched entries (default: false)
      --[no-]brace                        Toggle expansion of brace patterns ({a,b}, {1..3}) (default: true)
      --[no-]globstar                     Toggle matching with globstars (**) (default: false)
      --[no-]ext                          Toggle extglob support (patterns like +(a|b)) (default: true)
      --[no-]case                         Toggle case-insensitive regex for matching files (default: true)
      --[no-]match-base                   Toggle patterns without slashes to match a file's basename (default: false)
      --json                              Output JSON instead of line by line

    Examples
      $ globby "images/**"
      $ globby "images/**" -i "**/*.gif"
      $ globby "configs/*" --dot
  `,
  flags: {
    ignore     : { type: null,      default: [],    alias: ['i'] },
    expandDirs : { type: null,      default: true,  alias: ['e'] },
    gitignore  : { type: 'boolean', default: false },
    deep       : { type: null,      default: true  },
    dot        : { type: 'boolean', default: false },
    onlyFiles  : { type: 'boolean', default: true  },
    onlyDirs   : { type: 'boolean', default: false },
    follow     : { type: 'boolean', default: true },
    unique     : { type: 'boolean', default: true  },
    markDirs   : { type: 'boolean', default: false },
    absolute   : { type: 'boolean', default: false },
    brace      : { type: 'boolean', default: true  },
    globstar   : { type: 'boolean', default: false },
    ext        : { type: 'boolean', default: true  },
    case       : { type: 'boolean', default: true  },
    matchBase  : { type: 'boolean', default: false },
    json       : { type: 'boolean', default: false },
  },
});

globby(cli.input, {
  ignore: arrify(cli.flags.ignore),
  expandDirectories: typeof cli.flags.expandDirs === 'boolean'
    ? cli.flags.expandDirs
    : arrify(cli.flags.expandDirs),
  gitignore: cli.flags.gitignore,
  deep: cli.flags.deep,
  dot: cli.flags.dot,
  onlyFiles: cli.flags.onlyFiles,
  onlyDirectories: cli.flags.onlyDirs,
  followSymlinkedDirectories: cli.flags.follow,
  unique: cli.flags.unique,
  markDirectories: cli.flags.markDirs,
  absolute: cli.flags.absolute,
  brace: cli.flags.brace,
  globstar: cli.flags.globstar,
  extension: cli.flags.ext,
  case: cli.flags.case,
  matchBase: cli.flags.matchBase,
}).then(filePaths => {
  if (cli.flags.json) {
    console.log(JSON.stringify(filePaths, null, 2));
  } else {
    console.log(filePaths.join('\n'));
  }
});
