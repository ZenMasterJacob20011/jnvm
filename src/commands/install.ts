import fs from 'fs';
import {Readable} from "node:stream";
import {finished} from "node:stream/promises";
import type * as streamWeb from 'node:stream/web';
import path from "node:path";
import extract from "extract-zip";
import os from "os";
import {jnvmDirectory} from "../runcommands";

declare global {
    interface Response {
        readonly body: streamWeb.ReadableStream<Uint8Array> | null;
    }
}

/**
 * Installs Node.js at the specified directory
 * @param nodeVersion The version to install
 */
async function installNodeVersion(nodeVersion: string) {
    const fullInstallPath = path.join(os.tmpdir(), `node-${nodeVersion}-win-x64.zip`);
    if (fs.existsSync(fullInstallPath)) {
        return;
    }
    const downloadPath = `https://nodejs.org/download/release/${nodeVersion}/node-${nodeVersion}-win-x64.zip`;
    const response = await fetch(downloadPath);

    const writeStream = fs.createWriteStream(fullInstallPath, {flags: 'wx'});
    Readable.fromWeb(response.body!).pipe(writeStream);
    return finished(writeStream);
}

export async function install(nodeVersion: string) {
    if (fs.existsSync(path.join(jnvmDirectory, nodeVersion))) {
        console.log(`Installation complete\nIf you want to use this version, type:\n\nnvm use ${nodeVersion}`);
        return;
    }
    const zipFileName = `node-${nodeVersion}-win-x64`;
    await installNodeVersion(nodeVersion);
    await extract(path.join(os.tmpdir(), `${zipFileName}.zip`), {
        dir: jnvmDirectory
    });
    await fs.promises.rename(path.join(jnvmDirectory, zipFileName), path.join(jnvmDirectory, nodeVersion));
    console.log(`Installation complete\nIf you want to use this version, type:\n\nnvm use ${nodeVersion}`);
}
