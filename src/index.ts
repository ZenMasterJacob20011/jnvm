import {run} from './runcommands';
import path from "node:path";
import os from "os";
const arg1 = process.argv[2];
const arg2 = process.argv[3];
run(arg1, arg2);
export const jnvmDirectory = path.join(os.homedir(), 'AppData', 'Local', 'jnvm');
