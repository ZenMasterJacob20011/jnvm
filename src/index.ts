import {table} from 'console-table-without-index';
import {getAvailableVersions} from "./commands/list";
import {installNodeVersion} from "./commands/install";

const arg1 = process.argv[2];
const arg2 = process.argv[3];
const jnvmBaseDirectory = 'C:/Users/Jacob/AppData/Local';

switch (arg1) {
    case "install":
        installNodeVersion(arg2, jnvmBaseDirectory);
        console.log("install command called");
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

