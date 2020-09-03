import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
// @ts-ignore
import replaceInFiles from 'replace-in-files';
import * as ts from 'typescript';


(async () => {
    // Emit output
    await emitOutput();
    // Add export modifiers
    await replaceInFiles( {
        from: /(declare type)/gm,
        to: 'export declare type',
        files: `${ __dirname }/index.d.ts`,
    } );
    // Extract documentation
    await extractDocumentation();
})().catch( error => {
    console.error( error );
    process.exit( -1 );
} );

async function extractDocumentation (): Promise<void> {
    const documents: string[] = [];
    const sourceFilePath = `${ __dirname }/index.d.ts`;
    const readFileContent = readFileSync( sourceFilePath ).toString();
    const sourceFile = ts.createSourceFile( sourceFilePath, readFileContent, ts.ScriptTarget.ES2020 );

    ts.forEachChild( sourceFile, node => {
        const triviaWidth = node.getLeadingTriviaWidth( sourceFile );
        const trivial = sourceFile.text.substr( node.pos, triviaWidth )
            // Remove leading multiline comments
            .replace( /^(?:\s*\/[ \t*]+)\r?\n?(.*)$/gm, '$1' )
            // Remove trailing multiline comments
            .replace( /^(.*)\r?\n?[ \t*]*\*\/(?:\r?\n?)*$/gm, '$1' )
            // Remove eventual leading whitespaces and asterisk at line beginning
            .replace( /^(\r?\n)?[ \t]*\**[ \t]*(.*)/gm, '$1$2' )
            // Remove trailing whitespaces at line ends
            .replace( /^(.*)[ \t]*(\r?\n?)*$/g, '$1$2' )
            // Set type description an H3 heading
            .replace( /^\s*(`[^`])(.*)/m, '### $1$2' );

        console.log(trivial);
        trivial.trim() && documents.push( trivial );
    } );
    await replaceInFiles( {
        files: `${ __dirname }/README.md`,
        from: /(<!-- WhatIsIn:start -->(\s|.)*<!-- WhatIsIn:end -->)/gm,
        to: `<!-- WhatIsIn:start -->\r\n${ documents.sort().join( '\n\n' ) }\r\n<!-- WhatIsIn:end -->`,
    } );
}

async function emitOutput (): Promise<void> {
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
}

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
