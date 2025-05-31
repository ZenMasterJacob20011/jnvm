import fs from 'fs';
import {Readable} from "node:stream";
import {finished} from "node:stream/promises";
import type * as streamWeb from 'node:stream/web';
declare global {
    interface Response {
        readonly body: streamWeb.ReadableStream<Uint8Array> | null;
    }
}
/**
 * Installs Node.js at the specified directory
 * @param nodeVersion The version to install
 * @param path the path to install Node.js to
 */
export async function installNodeVersion(nodeVersion: string, path: string) {
    if(path.endsWith('/')){
        path = path.substring(0, path.length - 1);
    }
    if (nodeVersion.indexOf('v') !== 0) {
        nodeVersion = 'v' + nodeVersion;
    }
    const installPath = `https://nodejs.org/download/release/${nodeVersion}/node-${nodeVersion}.tar.gz`;
    const response = await fetch(installPath);

    const writeStream = fs.createWriteStream(`${path}/node-${nodeVersion}.tar.gz`, {flags: 'wx'});
    Readable.fromWeb(response.body!).pipe(writeStream);
    return await finished(writeStream);
}
