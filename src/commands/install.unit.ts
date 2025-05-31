import {installNodeVersion} from "./install";
import fs from "fs";
import assert from "node:assert";
import {rm} from "node:fs/promises";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', async () => {
        await installNodeVersion('20.8.1', './');
        assert.equal(fs.existsSync(process.cwd() + '\\node-v20.8.1.tar.gz'), true);
        await rm('./node-v20.8.1.tar.gz');
    });
});
