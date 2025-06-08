import fs from "fs";
import path from "node:path";
import {jnvmDirectory, symLinkPath} from "../runcommands";
import {createSymLinkDirIfNotExits} from "../utils";

export async function useVersion(nodeVersion: string) {
    if (!fs.existsSync(path.join(jnvmDirectory, nodeVersion))) {
        return false;
    }
    try {
        await fs.promises.rmdir(symLinkPath);
    } catch (e) {
        console.log('No symlink directory to remove');
    }
    createSymLinkDirIfNotExits();
    await fs.promises.symlink(path.join(jnvmDirectory, nodeVersion), symLinkPath, 'dir');
    return true;
}
