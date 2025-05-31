import {extractNode, installNodeVersion} from "./install";
import fs from "fs";
import assert from "node:assert";
import path from "node:path";
import {jnvmDirectory} from "../index";
import os from "os";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', async () => {
        await installNodeVersion('v20.8.1', os.tmpdir());
        assert.equal(fs.existsSync(path.join(os.tmpdir(), 'node-v20.8.1.tar.gz')), true);
    });

    it('extractNode should extract node to the specified directory', async () => {
        await installNodeVersion('v20.8.1', './');
        await extractNode('./node-v20.8.1.tar.gz', jnvmDirectory);
        assert.equal(fs.existsSync(path.join(jnvmDirectory, 'node-v20.8.1')), true);
    });
});
