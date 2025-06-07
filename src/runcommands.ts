import {install} from "./commands/install";
import {list} from "./commands/list";
import {useVersion} from "./commands/use";
import {on} from "./commands/on";
import {off} from "./commands/off";
import fs from "fs";

const [root, symPath] = fs.readFileSync('settings.txt').toString().split('\r\n');
export const jnvmDirectory = root.substring(root.indexOf(':') + 2);
export const symLinkPath = symPath.substring(symPath.indexOf(':') + 2);

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
