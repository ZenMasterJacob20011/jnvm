import {installNodeVersion} from "./commands/install";
import * as tar from "tar/dist/esm";
import {getAvailableVersions} from "./commands/list";
import {table} from "console-table-without-index";

export async function run(arg1: string, arg2: string) {
    switch (arg1) {
        case "install":
            let nodeVersion = arg2;
            if (nodeVersion.indexOf('v') !== 0) {
                nodeVersion = 'v' + nodeVersion;
            }
            const zipInstallPath = './';
            const unZippedInstallPath = './tmp';
            await installNodeVersion(nodeVersion, zipInstallPath);
            const tarFileName = `node-${nodeVersion}.tar.gz`;
            await tar.extract({
                file: tarFileName,
                C: unZippedInstallPath
            })
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
