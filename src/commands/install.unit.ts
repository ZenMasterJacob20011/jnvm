import {installNodeVersion} from "./install";

describe('install', () => {
    it('installNodeVersion should install the node version to the specified directory', () => {
        installNodeVersion('20.8.1', './test.zip');
    });
});
