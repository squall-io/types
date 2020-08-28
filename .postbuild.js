const replaceInFiles = require('replace-in-files');

replaceInFiles({
    from: /(declare type)/g,
    to: 'export declare type',
    files: './index.d.ts',
}).catch(console.error);
