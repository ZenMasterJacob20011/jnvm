import {table} from 'console-table-without-index';
import {getAvailableVersions} from "./commands/list";
import {installNodeVersion} from "./commands/install";
import fs from "fs";
import * as tar from 'tar';

const arg1 = process.argv[2];
const arg2 = process.argv[3];
const jnvmBaseDirectory = './';


async function run(arg1: string, arg2: string) {
    switch (arg1) {
        case "install":
            const zipInstallPath = './';
            const destinationPath = './';
            await installNodeVersion(arg2, zipInstallPath);
            await tar.extract({
                file: zipInstallPath
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

run(arg1, arg2);
