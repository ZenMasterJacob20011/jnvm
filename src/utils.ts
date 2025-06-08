import {symLinkPath} from "./runcommands";
import fs from "fs";
import Path from "node:path";

export function createSymLinkDirIfNotExits() {
    const symLinkDir = Path.join(symLinkPath, '..');
    if (!fs.existsSync(symLinkDir)) {
        fs.mkdirSync(symLinkDir, {recursive: true});
    }
}
