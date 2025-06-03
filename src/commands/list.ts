import {nodeVersion} from "../types/nodeversion";
import fs from "fs";
import {jnvmDirectory, symLinkPath} from "../runcommands";

/**
 * Returns an array of the available versions for installing
 */
export async function getAvailableVersions() {
    const res = await fetch('https://nodejs.org/dist/index.json');
    const nodeVersions: nodeVersion[] = await res.json();
    const current = nodeVersions.filter(version => !version.lts)
        .slice(0, 20)
        .map((version) => version.version);
    const LTS = nodeVersions.filter(version => version.lts)
        .slice(0, 20)
        .map(version => version.version);
    const oldStable = nodeVersions
        .filter(version => version.version.substring(0, 2) === 'v0')
        .filter(version => Number(version.version.substring(3, version.version.indexOf('.', 3))) % 2 === 0)
        .slice(0, 20)
        .map(version => version.version);
    const oldUnstable = nodeVersions
        .filter(version => version.version.substring(0, 2) === 'v0')
        .filter(version => Number(version.version.substring(3, version.version.indexOf('.', 3))) % 2 !== 0)
        .slice(0, 20)
        .map(version => version.version);
    const versionTable = [];
    for (let i = 0; i < 20; i++) {
        versionTable.push({
            "CURRENT": current[i],
            "LTS": LTS[i],
            "OLD STABLE": oldStable[i],
            "OLD UNSTABLE": oldUnstable[i]
        });
    }
    return versionTable;
}

export async function listInstalledVersions() {
    const directory = await fs.promises.readdir(jnvmDirectory);
    const installedVersions = directory.filter(file => file.match(/^v\d{1,2}.\d{1,2}.\d{1,2}/));
    const absoluteSymLinkPath = await fs.promises.readlink(symLinkPath);
    const currentVersion = absoluteSymLinkPath.substring(absoluteSymLinkPath.lastIndexOf('\\') + 1);
    let list = '';
    for (const version of installedVersions) {
        if (version === currentVersion) {
            list += `  * ${version} (Currently using 64-bit executable)\n`;
            continue
        }
        list += `    ${version}\n`;
    }
    console.log(list);
}
