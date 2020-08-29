// @ts-ignore
import replaceInFiles from 'replace-in-files';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import * as ts from 'typescript';


(async () => {
    const config: {
        files: string[];
        compilerOptions: ts.CompilerOptions;
    } = await run( `${ __dirname }/node_modules/.bin/tsc`, [
        '--showConfig',
        '--project',
        __dirname,
    ] ).then( JSON.parse.bind( JSON ) );
    // Remove this option, only set for build.ts
    delete config.compilerOptions.moduleResolution;
    const program = ts.createProgram( config.files, config.compilerOptions );

    // Build the program
    program.emit();

    // Add export modifiers
    await replaceInFiles( {
        from: /(declare type)/gm,
        to: 'export declare type',
        files: `${ __dirname }/index.d.ts`,
    } );

    // Extract documentation
    const documents: string[] = [];
    const sourceFilePath = `${ __dirname }/index.d.ts`;
    const readFileContent = readFileSync( sourceFilePath ).toString();
    const sourceFile = ts.createSourceFile( sourceFilePath, readFileContent, ts.ScriptTarget.ES2020 );

    ts.forEachChild( sourceFile, node => {
        const triviaWidth = node.getLeadingTriviaWidth( sourceFile );
        const trivial = sourceFile.text.substr( node.pos, triviaWidth )
            .replace( /^\s*\/\*[\s*]*(.*)$/gm, '$1' )
            .replace( /(.*)[\t *]*\/\s*$/gm, '$1' )
            .replace( /^([\t *]*\*[\t *]*)?(.*)/gm, '$2' )
            .replace( /^\s*(.*)\s*$/, '$1' );

        trivial.trim() && documents.push( trivial );
    } );
    await replaceInFiles( {
        files: `${ __dirname }/README.md`,
        from: /(<!-- WhatIsIn:start -->(\s|.)*<!-- WhatIsIn:end -->)/gm,
        to: `<!-- WhatIsIn:start -->${documents.join('\n\n')}<!-- WhatIsIn:end -->`,
    } );
})().catch( error => {
    console.error( error );
    process.exit( -1 );
} );

function run ( command: string, parameters: string[] = [] ): Promise<string> {
    return new Promise( ( resolve, reject ) => {
        const result = spawnSync( command, parameters );
        const output = result.stdout.toString();

        if ( result.status ) {
            reject( [
                `${ command } ${ parameters.join( ' ' ) }`,
                output,
            ].join( ' ' ) );
        } else {
            resolve( output );
        }
    } );
}
