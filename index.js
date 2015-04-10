/*global global*/
var fs = require('fs'),
    path = require('path');

delete require.cache[__filename];

function toCamelCase(str) {
    return str.replace(/[_-][a-z.]/ig, function (s) {
        return s.substring(1).toUpperCase();
    });
}

function requireDeps(match, o) {
    if ('undefined' === typeof match) match = [/.*/];
    match = Array.isArray(match) ? match : [match];
    var pkg,
        dir   = __dirname,
        deps  = 'dependencies';

    while (dir.length > 0) {
        dir = dir.replace(/[\/\\]?[^\/\\]+[\/\\]?$/, '');
        if (fs.existsSync(dir + '/package.json'))
            break;
    }
    
    if (dir.length === 0) throw new Error('Could not find package.json');

    pkg = require(dir + '/package.json');
    if ((o || {}).dev) deps = 'devDependencies';

    Object.keys(pkg[deps]).forEach(function (dep) {
        match.forEach(function (m) {
            if (m.test(dep))
               global[toCamelCase(dep)] = require(dep);
        });
    });
}

module.exports = requireDeps;
