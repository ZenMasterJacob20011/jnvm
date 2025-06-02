import {useVersion} from "./use";
import {extractNode, installNodeVersion} from "./install";
import {jnvmDirectory} from "../runcommands";
import path from "node:path";
import os from "os";
import fs from "fs";
import assert from "node:assert";

describe('Use', () => {
    it('useVersion function should create a symlink between jnvm4w\\nodejs and the nodejs binary', async () => {
        await installNodeVersion('v20.8.1', os.tmpdir());
        await extractNode(path.join(os.tmpdir(), 'node-v20.8.1-win-x64.zip'), jnvmDirectory);
        await fs.promises.rename(path.join(jnvmDirectory, `node-v20.8.1-win-x64`), path.join(jnvmDirectory, 'v20.8.1'));
        await useVersion('v20.8.1', 'C:\\jnvm4w\\nodejs', jnvmDirectory);
        const stats = await fs.promises.lstat('C:\\jnvm4w\\nodejs');
        assert.equal(stats.isSymbolicLink(), true);
        assert.equal(await fs.promises.readlink('C:\\jnvm4w\\nodejs'), path.join(jnvmDirectory, 'v20.8.1'));
    });
});
