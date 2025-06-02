import fs from "fs";
import path from "node:path";

export async function useVersion(nodeVersion: string, symLinkPath: string, jnvmPath: string) {
    if (!fs.existsSync(path.join(jnvmPath, nodeVersion))){
        return false;
    }
    try {
        await fs.promises.rmdir(symLinkPath);
    }catch (e) {
        console.log('No symlink directory to remove');
    }
    await fs.promises.symlink(path.join(jnvmPath, nodeVersion), symLinkPath, 'dir');
    return true;
}
