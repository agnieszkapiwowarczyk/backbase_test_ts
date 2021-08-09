import {logging} from 'selenium-webdriver';
import Level = logging.Level;

const usernameAut = 'candidatex';
const passwordAut = 'qa-is-cool';
const config = {
    baseURL: `https://${usernameAut}:${passwordAut}@qa-task.backbasecloud.com/`,
    globalLogLevel: logging.Level.DEBUG
}

export default config;