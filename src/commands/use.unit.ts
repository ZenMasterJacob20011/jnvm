import {useVersion} from "./use";
import {install} from "./install";
import {jnvmDirectory} from "../runcommands";
import path from "node:path";
import fs from "fs";
import assert from "node:assert";

describe('Use', () => {
    it('useVersion function should create a symlink between jnvm4w\\nodejs and the nodejs binary', async () => {
        await install('v20.8.1');
        await useVersion('v20.8.1');
        const stats = await fs.promises.lstat('C:\\jnvm4w\\nodejs');
        assert.equal(stats.isSymbolicLink(), true);
        assert.equal(await fs.promises.readlink('C:\\jnvm4w\\nodejs'), path.join(jnvmDirectory, 'v20.8.1'));
    });
    it('useVersion function should return false if version does not exist', async () => {
        assert.equal(await useVersion('v20.30.1'), false);
    });
});
