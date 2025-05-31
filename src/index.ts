import {run} from './runcommands';
import path from "node:path";
import os from "os";
const arg1 = process.argv[2];
const arg2 = process.argv[3];
export const jnvmDirectory = path.join(os.homedir(), 'AppData', 'Local', 'jnvm');
if (process.argv[1].endsWith('index.ts') || process.argv[1].endsWith('index.js')) {
    run(arg1, arg2);
}
