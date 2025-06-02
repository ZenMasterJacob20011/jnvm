import {install} from "./install";
import fs from "fs";
import assert from "node:assert";
import path from "node:path";
import {jnvmDirectory} from "../runcommands";

describe('install', () => {
    it('should install the node version to the jnvm directory', async () => {
        await install('v20.8.1');
        assert.equal(fs.existsSync(path.join(jnvmDirectory, 'v20.8.1')), true);
    });
});
