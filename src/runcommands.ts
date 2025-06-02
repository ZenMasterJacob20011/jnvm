import {extractNode, installNodeVersion} from "./commands/install";
import {getAvailableVersions} from "./commands/list";
import {table} from "console-table-without-index";
import path from "node:path";
import os from "os";
import fs from "fs";
import {useVersion} from "./commands/use";

export const jnvmDirectory = path.join(os.homedir(), 'AppData', 'Local', 'jnvm');

export async function run(arg1: string, arg2: string) {
    switch (arg1) {
        case "install":
            const zipInstallPath = os.tmpdir();
            const unZippedInstallPath = jnvmDirectory
            const nodeVersion = normalizeNodeVersion(arg2);
            await installNodeVersion(nodeVersion, zipInstallPath);
            await extractNode(path.join(zipInstallPath, `node-${nodeVersion}-win-x64.zip`), unZippedInstallPath);
            await fs.promises.rename(path.join(unZippedInstallPath, `node-${nodeVersion}-win-x64`), path.join(unZippedInstallPath, nodeVersion));
            break;
        case "list":
            if (arg2 === 'available') {
                getAvailableVersions().then((versions) => {
                    console.log(table(versions));
                    console.log("This is a partial list. For a complete list, visit https://nodejs.org/en/download/releases");
                });
            }
            console.log("list command called");
            break;
        case "use":
            const nodeUseVersion = normalizeNodeVersion(arg2);
            const symLinkPath = 'C:\\jnvm4w\\nodejs';
            if (await useVersion(nodeUseVersion, symLinkPath, jnvmDirectory)){
                console.log(`Now using node ${nodeUseVersion} (64-bit)`);
            }else{
                console.log('activation error: Version not installed. Run "jnvm ls" to see available versions.');
            }
            break;
        default:
            console.log("command not found");
    }
}

function normalizeNodeVersion(nodeVersion: string){
    if (nodeVersion.indexOf('v') !== 0) {
        nodeVersion = 'v' + nodeVersion;
    }
    return nodeVersion;
}
