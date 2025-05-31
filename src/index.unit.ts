import {run} from './runcommands';

describe('run', () => {
    it('should extract tarball given install command', () => {
        run('install', '20.8.1');
    });
});
