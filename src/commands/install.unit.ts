import {extractNode, installNodeVersion} from "./install";
import fs from "fs";
import assert from "node:assert";
import {rm} from "node:fs/promises";
import path from "node:path";
import {jnvmDirectory} from "../index";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', async () => {
        await installNodeVersion('v20.8.1', './');
        assert.equal(fs.existsSync(process.cwd() + '\\node-v20.8.1.tar.gz'), true);
        await rm('./node-v20.8.1.tar.gz');
    });

    it('extractNode should extract node to the specified directory', async () => {
        await installNodeVersion('v20.8.1', './');
        await extractNode('./node-v20.8.1.tar.gz', jnvmDirectory);
        assert.equal(fs.existsSync(path.join(jnvmDirectory, 'node-v20.8.1')), true);
        await rm('./node-v20.8.1.tar.gz');
    });
});
