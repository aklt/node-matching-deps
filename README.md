# Require matching modules `from package.json`

Installing:

    npm install matching-deps

makes it possible to require matching modules from `package.json`:

    requireMatchingDeps = require('matching-deps');
    requireMatchingDeps([/^foobar-.\*/, /^more-stuff.\*/], {dev: true})
    
or simply

    require('matching-deps')([/^foobar-.\*/, /^more-stuff.\*/], {dev: true})
    
The returned function has the signature:

    requireMatchingDeps(match[, opts])

Where `match` is a RegExp or an array of ReqExps.

The argument `opts` is an optional object. If `opts.dev` is truthy
`package.devDependencies` is used instead of `package.dependencies`.
