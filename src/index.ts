import {table} from 'console-table-without-index';
import {getAvailableVersions} from "./commands/list";

const arg1 = process.argv[2];
const arg2 = process.argv[3];
console.log(arg2);
switch (arg1) {
    case "install":
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

