import {run} from './runcommands';

const arg1 = process.argv[2];
const arg2 = process.argv[3];
if (process.argv[1].endsWith('index.ts') || process.argv[1].endsWith('index.js') || process.argv[1].endsWith('nvm.js')) {
    run(arg1, arg2);
}
