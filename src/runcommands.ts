import {extractNode, installNodeVersion} from "./commands/install";
import {getAvailableVersions} from "./commands/list";
import {table} from "console-table-without-index";
import {jnvmDirectory} from "./index";

export async function run(arg1: string, arg2: string) {
    switch (arg1) {
        case "install":
            const zipInstallPath = './';
            const unZippedInstallPath = jnvmDirectory
            let nodeVersion = arg2;
            if (nodeVersion.indexOf('v') !== 0) {
                nodeVersion = 'v' + nodeVersion;
            }
            await installNodeVersion(nodeVersion, zipInstallPath);
            await extractNode(unZippedInstallPath, zipInstallPath);
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
            console.log("use command called");
            break;
        default:
            console.log("command not found");
    }
}
