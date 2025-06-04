import {jnvmDirectory, symLinkPath} from "../runcommands";
import fs from "fs";
import {useVersion} from "./use";

export async function on() {
    const directory = await fs.promises.readdir(jnvmDirectory);
    const nodeVersions = directory.filter(version => version.match(/^v\d{1,2}.\d{1,2}.\d{1,2}/));
    const highestNodeVersion = nodeVersions.sort()[0];
    await useVersion(highestNodeVersion);
    console.log('jnvm enabled');
    console.log(`Now using node ${highestNodeVersion} (64-bit)`);
}
