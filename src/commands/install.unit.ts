import {extractNode, installNodeVersion} from "./install";
import fs from "fs";
import assert from "node:assert";
import path from "node:path";
import {jnvmDirectory} from "../runcommands";
import os from "os";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', async () => {
        await installNodeVersion('v20.8.1', os.tmpdir());
        assert.equal(fs.existsSync(path.join(os.tmpdir(), 'node-v20.8.1-win-x64.zip')), true);
    });

    it('extractNode should extract node to the specified directory', async () => {
        await installNodeVersion('v20.8.1', os.tmpdir());
        await extractNode(path.join(os.tmpdir(), 'node-v20.8.1-win-x64.zip'), jnvmDirectory);
        assert.equal(fs.existsSync(path.join(jnvmDirectory, 'node-v20.8.1')), true);
    });
});
