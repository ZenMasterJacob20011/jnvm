import {nodeVersion} from "../types/nodeversion";

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
