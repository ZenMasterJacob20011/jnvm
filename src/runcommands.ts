import {install} from "./commands/install";
import {list} from "./commands/list";
import path from "node:path";
import os from "os";
import {useVersion} from "./commands/use";
import {on} from "./commands/on";
import {off} from "./commands/off";

export const jnvmDirectory = path.join(os.homedir(), 'AppData', 'Local', 'jnvm');
export const symLinkPath = 'C:\\jnvm4w\\nodejs';

export async function run(arg1: string, arg2: string) {
    switch (arg1) {
        case "install":
            const nodeVersion = normalizeNodeVersion(arg2);
            await install(nodeVersion);
            break;
        case "list":
            await list(arg2);
            break;
        case "ls":
            await list(arg2);
            break;
        case "use":
            const nodeUseVersion = normalizeNodeVersion(arg2);
            if (await useVersion(nodeUseVersion)) {
                console.log(`Now using node ${nodeUseVersion} (64-bit)`);
            } else {
                console.log('activation error: Version not installed. Run "jnvm ls" to see available versions.');
            }
            break;
        case "on":
            await on();
            break;
        case "off":
            await off();
            break;
        default:
            console.log("command not found");
    }
}

function normalizeNodeVersion(nodeVersion: string) {
    if (nodeVersion.indexOf('v') !== 0) {
        nodeVersion = 'v' + nodeVersion;
    }
    return nodeVersion;
}
