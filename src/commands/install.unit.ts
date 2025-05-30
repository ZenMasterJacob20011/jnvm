import {installNodeVersion} from "./install";
import fs from "fs";
import assert from "node:assert";
import {rm} from "node:fs/promises";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', async () => {
        await installNodeVersion('20.8.1', './zippednodejs.tar.gz');
        assert.equal(fs.existsSync(process.cwd() + '\\zippednodejs.tar.gz'), true);
        await rm('./zippednodejs.tar.gz');
    });
});
