import fs from 'fs';
import {Readable} from "node:stream";
import {finished} from "node:stream/promises";
import type * as streamWeb from 'node:stream/web';
import path from "node:path";
import * as tar from "tar";
declare global {
    interface Response {
        readonly body: streamWeb.ReadableStream<Uint8Array> | null;
    }
}

/**
 * Installs Node.js at the specified directory
 * @param nodeVersion The version to install
 * @param installPath the path to install Node.js to
 */
export async function installNodeVersion(nodeVersion: string, installPath: string) {
    const fullInstallPath = path.join(installPath, `node-${nodeVersion}.tar.gz`);
    if (fs.existsSync(fullInstallPath)){
        return;
    }
    const downloadPath = `https://nodejs.org/download/release/${nodeVersion}/node-${nodeVersion}.tar.gz`;
    const response = await fetch(downloadPath);

    const writeStream = fs.createWriteStream(fullInstallPath, {flags: 'wx'});
    Readable.fromWeb(response.body!).pipe(writeStream);
    return finished(writeStream);
}

/**
 * Takes a source path to compressed file and outputs the uncompressed files to destination path
 * @param source The path to the compressed file
 * @param destination The path to the uncompressed output
 */
export async function extractNode(source: string, destination: string) {
    if (fs.existsSync(path.join(__dirname, source)) || fs.existsSync(source)){
        return;
    }
    await tar.extract({
        file: source,
        C: destination
    })
}
