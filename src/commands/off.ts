import {symLinkPath} from "../runcommands";
import fs from "fs";

export async function off(){
    return fs.promises.rmdir(symLinkPath);
}
