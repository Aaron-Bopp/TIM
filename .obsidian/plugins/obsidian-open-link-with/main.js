'use strict';

var obsidian = require('obsidian');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var os = require('os');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const DEFAULT_OPEN_WITH = 'system-default';
const PRESET_BROWSERS = {
    safari: {
        darwin: {
            sysCmd: 'open',
            sysArgs: ['-a'],
            cmd: 'safari',
            optional: {},
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return true;
            }),
        },
    },
    firefox: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Firefox.app', 'Contents', 'MacOS', 'firefox'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'firefox',
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files', 'Mozilla Firefox', 'firefox.exe'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
    chrome: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Google Chrome.app', 'Contents', 'MacOS', 'Google Chrome'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'google-chrome',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
    chromium: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        linux: {
            cmd: 'chromium-browser',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                const c = child_process.spawnSync('which', [b.cmd]);
                return c.status === 0;
            }),
        },
    },
    edge: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Microsoft Edge.app', 'Contents', 'MacOS', 'Microsoft Edge'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            test: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return fs.existsSync(b.cmd);
            }),
        },
    },
};

const log = (msg_type, title, message) => {
    let wrapper;
    if (msg_type === 'warn') {
        wrapper = console.warn;
    }
    else if (msg_type === 'error') {
        wrapper = console.error;
    }
    else {
        wrapper = console.info;
    }
    if (typeof message === 'string') {
        wrapper('[open-link-with] ' + title + ':\n' + message);
    }
    else {
        wrapper('[open-link-with] ' + title);
        wrapper(message);
    }
};

class Browser {
    constructor(name, defaultCMD) {
        this.name = name;
        this.profiles = defaultCMD;
    }
}
const openWith = (url, cmd, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const _spawn = (args) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((res) => {
            var _a, _b;
            const _args = [...args];
            const reg = RegExp(/^[^"|'](.+)(?<!\\)(\ ){1}/);
            const match = reg.exec(_args[0]);
            if (match !== null) {
                // TODO: may have potential issues
                _args[0] = `"${_args[0]}"`;
            }
            reg.exec(_args[0]);
            if ((_a = options === null || options === void 0 ? void 0 : options.enableLog) !== null && _a !== void 0 ? _a : false) {
                log('info', 'opening', _args.join(' '));
            }
            const child = child_process.spawn(_args[0], args.slice(1), {
                stdio: 'ignore',
                shell: true,
            });
            child.on('exit', (code) => {
                res(code);
            });
            setTimeout(() => {
                res(0);
            }, (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : 250);
        });
    });
    const target = '$TARGET_URL';
    let match = false;
    const _cmd = cmd.map((arg) => {
        const idx = arg.indexOf(target);
        if (idx !== -1) {
            match = true;
            return (arg.substr(0, idx) +
                encodeURIComponent(url) +
                arg.substr(idx + target.length));
        }
        else {
            return arg;
        }
    });
    if (!match) {
        _cmd.push(url);
    }
    return yield _spawn(_cmd);
});
const getPresetBrowser = () => {
    const presets = [];
    presets.push(new Browser('safari', PRESET_BROWSERS['safari']));
    presets.push(new Browser('firefox', PRESET_BROWSERS['firefox']));
    presets.push(new Browser('chrome', PRESET_BROWSERS['chrome']));
    presets.push(new Browser('chromium', PRESET_BROWSERS['chromium']));
    presets.push(new Browser('edge', PRESET_BROWSERS['edge']));
    return presets;
};
const getValidBrowser = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = getPresetBrowser();
    const os$1 = os.platform();
    const preset = {};
    browser.forEach(({ profiles, name }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let app = profiles[os$1];
        if (typeof app !== 'undefined' &&
            app.test &&
            (yield app.test(app))) {
            for (const pvt of [0, 1]) {
                const cmds = [];
                if (pvt) {
                    if (!((_a = app === null || app === void 0 ? void 0 : app.optional) === null || _a === void 0 ? void 0 : _a.private)) {
                        continue;
                    }
                    app = Object.assign(Object.assign({}, app), ((_b = app.optional.private) !== null && _b !== void 0 ? _b : {}));
                }
                if (app.sysCmd) {
                    cmds.push(app.sysCmd);
                }
                if (app.sysArgs) {
                    app.sysArgs.forEach((arg) => cmds.push(arg));
                }
                cmds.push(app.cmd);
                if (app.args) {
                    app.args.forEach((arg) => cmds.push(arg));
                }
                preset[name + (pvt ? '-private' : '')] =
                    cmds;
            }
        }
    }));
    return preset;
});

const DEFAULT_SETTINGS = {
    selected: DEFAULT_OPEN_WITH,
    custom: {},
    enableLog: false,
    timeout: 500,
};
class OpenLinkPlugin extends obsidian.Plugin {
    get profiles() {
        return Object.assign(Object.assign({}, this.presetProfiles), this.settings.custom);
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.presetProfiles = yield getValidBrowser();
            this.addSettingTab(new SettingTab(this.app, this));
            this.registerDomEvent(document, 'click', (evt) => __awaiter(this, void 0, void 0, function* () {
                const ele = evt.target;
                if (ele.className === 'external-link') {
                    const url = ele.getAttribute('href');
                    const cur = this.settings.selected;
                    if (cur !== DEFAULT_OPEN_WITH) {
                        evt.preventDefault();
                        const code = yield openWith(url, this.profiles[cur], {
                            enableLog: this.settings.enableLog,
                            timeout: this.settings.timeout,
                        });
                        if (code !== 0) {
                            if (this.settings.enableLog) {
                                log('error', 'failed to open', `'spawn' exited with code ${code} when ` +
                                    `trying to open an external link with ${cur}.`);
                            }
                            open(url);
                        }
                    }
                }
            }));
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.settings.enableLog) {
                log('info', 'saving settings', this.settings);
            }
            yield this.saveData(this.settings);
        });
    }
}
class PanicModal extends obsidian.Modal {
    constructor(app, message) {
        super(app);
        this.message = message;
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.message);
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class SettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this._profileChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const profiles = JSON.parse(val);
                this.plugin.settings.custom = profiles;
                yield this.plugin.saveSettings();
                this._render();
            }
            catch (e) {
                this.panic((_b = (_a = e.message) !== null && _a !== void 0 ? _a : e.toString()) !== null && _b !== void 0 ? _b : 'some error occurred in open-link-with');
            }
        }), 1500, true);
        this._timeoutChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            const timeout = parseInt(val);
            if (Number.isNaN(timeout)) {
                this.panic('Value of timeout should be interger.');
            }
            else {
                this.plugin.settings.timeout = timeout;
                yield this.plugin.saveSettings();
                this._render();
            }
        }), 1500, true);
    }
    panic(msg) {
        new PanicModal(this.app, msg).open();
    }
    _render() {
        let { containerEl } = this;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName('Browser')
            .setDesc('Open external link with selected browser.')
            .addDropdown((dd) => {
            const cur = this.plugin.settings.selected;
            const items = [];
            const profiles = this.plugin.profiles;
            let _match = false;
            for (const p of Object.keys(profiles)) {
                if (p === cur) {
                    _match = true;
                    items.unshift(p);
                }
                else {
                    items.push(p);
                }
            }
            if (!_match) {
                items.unshift(DEFAULT_OPEN_WITH);
            }
            else {
                items.push(DEFAULT_OPEN_WITH);
            }
            items.forEach((i) => dd.addOption(i, i));
            dd.onChange((p) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.selected = p;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Customization')
            .setDesc('Customization profiles in JSON.')
            .addText((text) => text
            .setPlaceholder('{}')
            .setValue(JSON.stringify(this.plugin.settings.custom, null, 4))
            .onChange(this._profileChangeHandler));
        new obsidian.Setting(containerEl)
            .setName('Logs')
            .setDesc('Display logs in console (open developer tools to view).')
            .addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.enableLog)
                .onChange((val) => {
                this.plugin.settings.enableLog = val;
                this.plugin.saveSettings();
                this._render();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Timeout')
            .addText((text) => text
            .setPlaceholder('500')
            .setValue(this.plugin.settings.timeout.toString())
            .onChange(this._timeoutChangeHandler));
    }
    display() {
        this._render();
    }
}

module.exports = OpenLinkPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9jb25zdGFudC50cyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9vcGVuLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgeyBCcm93c2VyUHJvZmlsZSB9IGZyb20gJy4vdHlwZXMnXG5cbmNvbnN0IERFRkFVTFRfT1BFTl9XSVRIID0gJ3N5c3RlbS1kZWZhdWx0J1xuXG5jb25zdCBQUkVTRVRfQlJPV1NFUlMgPSB7XG4gICAgc2FmYXJpOiB7XG4gICAgICAgIGRhcndpbjoge1xuICAgICAgICAgICAgc3lzQ21kOiAnb3BlbicsXG4gICAgICAgICAgICBzeXNBcmdzOiBbJy1hJ10sXG4gICAgICAgICAgICBjbWQ6ICdzYWZhcmknLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHt9LFxuICAgICAgICAgICAgdGVzdDogYXN5bmMgKGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGZpcmVmb3g6IHtcbiAgICAgICAgZGFyd2luOiB7XG4gICAgICAgICAgICBjbWQ6IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICAnL0FwcGxpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgJ0ZpcmVmb3guYXBwJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudHMnLFxuICAgICAgICAgICAgICAgICdNYWNPUycsXG4gICAgICAgICAgICAgICAgJ2ZpcmVmb3gnXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHtcbiAgICAgICAgICAgICAgICBwcml2YXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnLS1wcml2YXRlLXdpbmRvdyddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVzdDogYXN5bmMgKGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhpc3RzU3luYyhiLmNtZClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGxpbnV4OiB7XG4gICAgICAgICAgICBjbWQ6ICdmaXJlZm94JyxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB7XG4gICAgICAgICAgICAgICAgcHJpdmF0ZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJy0tcHJpdmF0ZS13aW5kb3cnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlc3Q6IGFzeW5jIChiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHNwYXduU3luYygnd2hpY2gnLCBbYi5jbWRdKVxuICAgICAgICAgICAgICAgIHJldHVybiBjLnN0YXR1cyA9PT0gMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2luMzI6IHtcbiAgICAgICAgICAgIGNtZDogcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICdjOicsXG4gICAgICAgICAgICAgICAgJ1Byb2dyYW0gRmlsZXMnLFxuICAgICAgICAgICAgICAgICdNb3ppbGxhIEZpcmVmb3gnLFxuICAgICAgICAgICAgICAgICdmaXJlZm94LmV4ZSdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcHRpb25hbDoge1xuICAgICAgICAgICAgICAgIHByaXZhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogWyctLXByaXZhdGUtd2luZG93J10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXN0OiBhc3luYyAoYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdHNTeW5jKGIuY21kKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNocm9tZToge1xuICAgICAgICBkYXJ3aW46IHtcbiAgICAgICAgICAgIGNtZDogcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICcvQXBwbGljYXRpb25zJyxcbiAgICAgICAgICAgICAgICAnR29vZ2xlIENocm9tZS5hcHAnLFxuICAgICAgICAgICAgICAgICdDb250ZW50cycsXG4gICAgICAgICAgICAgICAgJ01hY09TJyxcbiAgICAgICAgICAgICAgICAnR29vZ2xlIENocm9tZSdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcHRpb25hbDoge1xuICAgICAgICAgICAgICAgIHByaXZhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogWyctaW5jb2duaXRvJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXN0OiBhc3luYyAoYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdHNTeW5jKGIuY21kKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbGludXg6IHtcbiAgICAgICAgICAgIGNtZDogJ2dvb2dsZS1jaHJvbWUnLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHtcbiAgICAgICAgICAgICAgICBwcml2YXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnLWluY29nbml0byddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVzdDogYXN5bmMgKGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3Bhd25TeW5jKCd3aGljaCcsIFtiLmNtZF0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuc3RhdHVzID09PSAwXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB3aW4zMjoge1xuICAgICAgICAgICAgY21kOiBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgJ2M6JyxcbiAgICAgICAgICAgICAgICAnUHJvZ3JhbSBGaWxlcyAoeDg2KScsXG4gICAgICAgICAgICAgICAgJ0dvb2dsZScsXG4gICAgICAgICAgICAgICAgJ0Nocm9tZScsXG4gICAgICAgICAgICAgICAgJ0FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnY2hyb21lLmV4ZSdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcHRpb25hbDoge1xuICAgICAgICAgICAgICAgIHByaXZhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogWyctaW5jb2duaXRvJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXN0OiBhc3luYyAoYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdHNTeW5jKGIuY21kKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNocm9taXVtOiB7XG4gICAgICAgIGRhcndpbjoge1xuICAgICAgICAgICAgY21kOiBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgJy9BcHBsaWNhdGlvbnMnLFxuICAgICAgICAgICAgICAgICdDaHJvbWl1bS5hcHAnLFxuICAgICAgICAgICAgICAgICdDb250ZW50cycsXG4gICAgICAgICAgICAgICAgJ01hY09TJyxcbiAgICAgICAgICAgICAgICAnQ2hyb21pdW0nXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb3B0aW9uYWw6IHtcbiAgICAgICAgICAgICAgICBwcml2YXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFsnLWluY29nbml0byddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVzdDogYXN5bmMgKGIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhpc3RzU3luYyhiLmNtZClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGxpbnV4OiB7XG4gICAgICAgICAgICBjbWQ6ICdjaHJvbWl1bS1icm93c2VyJyxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB7XG4gICAgICAgICAgICAgICAgcHJpdmF0ZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJy1pbmNvZ25pdG8nXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlc3Q6IGFzeW5jIChiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHNwYXduU3luYygnd2hpY2gnLCBbYi5jbWRdKVxuICAgICAgICAgICAgICAgIHJldHVybiBjLnN0YXR1cyA9PT0gMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGVkZ2U6IHtcbiAgICAgICAgZGFyd2luOiB7XG4gICAgICAgICAgICBjbWQ6IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICAnL0FwcGxpY2F0aW9ucycsXG4gICAgICAgICAgICAgICAgJ01pY3Jvc29mdCBFZGdlLmFwcCcsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnRzJyxcbiAgICAgICAgICAgICAgICAnTWFjT1MnLFxuICAgICAgICAgICAgICAgICdNaWNyb3NvZnQgRWRnZSdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBvcHRpb25hbDoge1xuICAgICAgICAgICAgICAgIHByaXZhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogWyctaW5wcml2YXRlJ10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXN0OiBhc3luYyAoYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdHNTeW5jKGIuY21kKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgd2luMzI6IHtcbiAgICAgICAgICAgIGNtZDogcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICdjOicsXG4gICAgICAgICAgICAgICAgJ1Byb2dyYW0gRmlsZXMgKHg4NiknLFxuICAgICAgICAgICAgICAgICdNaWNyb3NvZnQnLFxuICAgICAgICAgICAgICAgICdFZGdlJyxcbiAgICAgICAgICAgICAgICAnQXBwbGljYXRpb24nLFxuICAgICAgICAgICAgICAgICdtc2VkZ2UuZXhlJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG9wdGlvbmFsOiB7XG4gICAgICAgICAgICAgICAgcHJpdmF0ZToge1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbJy1pbnByaXZhdGUnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlc3Q6IGFzeW5jIChiKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4aXN0c1N5bmMoYi5jbWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59IGFzIFJlY29yZDxcbiAgICBzdHJpbmcsXG4gICAgUGFydGlhbDxSZWNvcmQ8Tm9kZUpTLlBsYXRmb3JtLCBCcm93c2VyUHJvZmlsZT4+XG4+XG5cbmV4cG9ydCB7IERFRkFVTFRfT1BFTl9XSVRILCBQUkVTRVRfQlJPV1NFUlMgfVxuIiwiaW1wb3J0IHsgTE9HX1RZUEUgfSBmcm9tICcuL3R5cGVzJ1xuXG5jb25zdCBsb2cgPSAoXG4gICAgbXNnX3R5cGU6IExPR19UWVBFLFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogYW55XG4pID0+IHtcbiAgICBsZXQgd3JhcHBlcjogKG1zZzogc3RyaW5nKSA9PiBhbnlcbiAgICBpZiAobXNnX3R5cGUgPT09ICd3YXJuJykge1xuICAgICAgICB3cmFwcGVyID0gY29uc29sZS53YXJuXG4gICAgfSBlbHNlIGlmIChtc2dfdHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICB3cmFwcGVyID0gY29uc29sZS5lcnJvclxuICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBjb25zb2xlLmluZm9cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICB3cmFwcGVyKFxuICAgICAgICAgICAgJ1tvcGVuLWxpbmstd2l0aF0gJyArIHRpdGxlICsgJzpcXG4nICsgbWVzc2FnZVxuICAgICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlcignW29wZW4tbGluay13aXRoXSAnICsgdGl0bGUpXG4gICAgICAgIHdyYXBwZXIobWVzc2FnZSlcbiAgICB9XG59XG5cbmV4cG9ydCB7IGxvZyB9XG4iLCJpbXBvcnQgeyBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJ29zJ1xuXG5pbXBvcnQge1xuICAgIEJyb3dzZXIgYXMgX0Jyb3dzZXIsXG4gICAgQnJvd3NlclByb2ZpbGUsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBQUkVTRVRfQlJPV1NFUlMgfSBmcm9tICcuL2NvbnN0YW50J1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi91dGlscydcblxuY2xhc3MgT3BlbkVyciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtc2cpXG4gICAgfVxufVxuXG5jbGFzcyBCcm93c2VyIGltcGxlbWVudHMgX0Jyb3dzZXIge1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHByb2ZpbGVzOiBQYXJ0aWFsPFxuICAgICAgICBSZWNvcmQ8Tm9kZUpTLlBsYXRmb3JtLCBCcm93c2VyUHJvZmlsZT5cbiAgICA+XG4gICAgY3VzdG9tQ01EOiBzdHJpbmdcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgICBkZWZhdWx0Q01EPzogUGFydGlhbDxcbiAgICAgICAgICAgIFJlY29yZDxOb2RlSlMuUGxhdGZvcm0sIEJyb3dzZXJQcm9maWxlPlxuICAgICAgICA+XG4gICAgKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5wcm9maWxlcyA9IGRlZmF1bHRDTURcbiAgICB9XG59XG5cbmNvbnN0IG9wZW5XaXRoID0gYXN5bmMgKFxuICAgIHVybDogc3RyaW5nLFxuICAgIGNtZDogc3RyaW5nW10sXG4gICAgb3B0aW9uczogUGFydGlhbDx7XG4gICAgICAgIGVuYWJsZUxvZzogYm9vbGVhblxuICAgICAgICB0aW1lb3V0OiBudW1iZXJcbiAgICB9PiA9IHt9XG4pOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgIGNvbnN0IF9zcGF3biA9IGFzeW5jIChcbiAgICAgICAgYXJnczogc3RyaW5nW11cbiAgICApOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgX2FyZ3M6IHN0cmluZ1tdID0gWy4uLmFyZ3NdXG4gICAgICAgICAgICBjb25zdCByZWcgPSBSZWdFeHAoL15bXlwifCddKC4rKSg/PCFcXFxcKShcXCApezF9LylcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gcmVnLmV4ZWMoX2FyZ3NbMF0pXG4gICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBtYXkgaGF2ZSBwb3RlbnRpYWwgaXNzdWVzXG4gICAgICAgICAgICAgICAgX2FyZ3NbMF0gPSBgXCIke19hcmdzWzBdfVwiYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVnLmV4ZWMoX2FyZ3NbMF0pXG4gICAgICAgICAgICBpZiAob3B0aW9ucz8uZW5hYmxlTG9nID8/IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgbG9nKCdpbmZvJywgJ29wZW5pbmcnLCBfYXJncy5qb2luKCcgJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHNwYXduKF9hcmdzWzBdLCBhcmdzLnNsaWNlKDEpLCB7XG4gICAgICAgICAgICAgICAgc3RkaW86ICdpZ25vcmUnLFxuICAgICAgICAgICAgICAgIHNoZWxsOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNoaWxkLm9uKCdleGl0JywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXMoY29kZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXMoMClcbiAgICAgICAgICAgIH0sIG9wdGlvbnM/LnRpbWVvdXQgPz8gMjUwKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSAnJFRBUkdFVF9VUkwnXG4gICAgbGV0IG1hdGNoID0gZmFsc2VcbiAgICBjb25zdCBfY21kID0gY21kLm1hcCgoYXJnKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGFyZy5pbmRleE9mKHRhcmdldClcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIG1hdGNoID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBhcmcuc3Vic3RyKDAsIGlkeCkgK1xuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICtcbiAgICAgICAgICAgICAgICBhcmcuc3Vic3RyKGlkeCArIHRhcmdldC5sZW5ndGgpXG4gICAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnXG4gICAgICAgIH1cbiAgICB9KVxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgX2NtZC5wdXNoKHVybClcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IF9zcGF3bihfY21kKVxufVxuXG5jb25zdCBnZXRQcmVzZXRCcm93c2VyID0gKCk6IEJyb3dzZXJbXSA9PiB7XG4gICAgY29uc3QgcHJlc2V0czogQnJvd3NlcltdID0gW11cbiAgICBwcmVzZXRzLnB1c2goXG4gICAgICAgIG5ldyBCcm93c2VyKCdzYWZhcmknLCBQUkVTRVRfQlJPV1NFUlNbJ3NhZmFyaSddKVxuICAgIClcbiAgICBwcmVzZXRzLnB1c2goXG4gICAgICAgIG5ldyBCcm93c2VyKCdmaXJlZm94JywgUFJFU0VUX0JST1dTRVJTWydmaXJlZm94J10pXG4gICAgKVxuICAgIHByZXNldHMucHVzaChcbiAgICAgICAgbmV3IEJyb3dzZXIoJ2Nocm9tZScsIFBSRVNFVF9CUk9XU0VSU1snY2hyb21lJ10pXG4gICAgKVxuICAgIHByZXNldHMucHVzaChcbiAgICAgICAgbmV3IEJyb3dzZXIoJ2Nocm9taXVtJywgUFJFU0VUX0JST1dTRVJTWydjaHJvbWl1bSddKVxuICAgIClcbiAgICBwcmVzZXRzLnB1c2goXG4gICAgICAgIG5ldyBCcm93c2VyKCdlZGdlJywgUFJFU0VUX0JST1dTRVJTWydlZGdlJ10pXG4gICAgKVxuICAgIHJldHVybiBwcmVzZXRzXG59XG5cbmV4cG9ydCBjb25zdCBnZXRWYWxpZEJyb3dzZXIgPSBhc3luYyAoKTogUHJvbWlzZTxcbiAgICBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT5cbj4gPT4ge1xuICAgIGNvbnN0IGJyb3dzZXIgPSBnZXRQcmVzZXRCcm93c2VyKClcbiAgICBjb25zdCBvcyA9IHBsYXRmb3JtKClcbiAgICBjb25zdCBwcmVzZXQgPSB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT5cbiAgICBicm93c2VyLmZvckVhY2goYXN5bmMgKHsgcHJvZmlsZXMsIG5hbWUgfSkgPT4ge1xuICAgICAgICBsZXQgYXBwID0gcHJvZmlsZXNbb3NdXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBhcHAgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBhcHAudGVzdCAmJlxuICAgICAgICAgICAgKGF3YWl0IGFwcC50ZXN0KGFwcCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwdnQgb2YgWzAsIDFdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY21kcyA9IFtdXG4gICAgICAgICAgICAgICAgaWYgKHB2dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFwcD8ub3B0aW9uYWw/LnByaXZhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXBwID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uYXBwLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKGFwcC5vcHRpb25hbC5wcml2YXRlID8/IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXBwLnN5c0NtZCkge1xuICAgICAgICAgICAgICAgICAgICBjbWRzLnB1c2goYXBwLnN5c0NtZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFwcC5zeXNBcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5zeXNBcmdzLmZvckVhY2goKGFyZykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZHMucHVzaChhcmcpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY21kcy5wdXNoKGFwcC5jbWQpXG4gICAgICAgICAgICAgICAgaWYgKGFwcC5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcC5hcmdzLmZvckVhY2goKGFyZykgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZHMucHVzaChhcmcpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJlc2V0W25hbWUgKyAocHZ0ID8gJy1wcml2YXRlJyA6ICcnKV0gPVxuICAgICAgICAgICAgICAgICAgICBjbWRzXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwcmVzZXRcbn1cblxuZXhwb3J0IHsgQnJvd3NlciwgQnJvd3NlclByb2ZpbGUsIG9wZW5XaXRoLCBPcGVuRXJyIH1cbiIsImltcG9ydCB7XG4gICAgQXBwLFxuICAgIGRlYm91bmNlLFxuICAgIERlYm91bmNlcixcbiAgICBNb2RhbCxcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxufSBmcm9tICdvYnNpZGlhbidcbmltcG9ydCB7IERFRkFVTFRfT1BFTl9XSVRIIH0gZnJvbSAnLi9jb25zdGFudCdcbmltcG9ydCB7IG9wZW5XaXRoLCBnZXRWYWxpZEJyb3dzZXIgfSBmcm9tICcuL29wZW4nXG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuL3V0aWxzJ1xuXG5pbnRlcmZhY2UgUGx1Z2luU2V0dGluZ3Mge1xuICAgIHNlbGVjdGVkOiBzdHJpbmdcbiAgICBjdXN0b206IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPlxuICAgIGVuYWJsZUxvZzogYm9vbGVhblxuICAgIHRpbWVvdXQ6IG51bWJlclxufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcbiAgICBzZWxlY3RlZDogREVGQVVMVF9PUEVOX1dJVEgsXG4gICAgY3VzdG9tOiB7fSxcbiAgICBlbmFibGVMb2c6IGZhbHNlLFxuICAgIHRpbWVvdXQ6IDUwMCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BlbkxpbmtQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICAgIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5nc1xuICAgIHByZXNldFByb2ZpbGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT5cbiAgICBnZXQgcHJvZmlsZXMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJlc2V0UHJvZmlsZXMsXG4gICAgICAgICAgICAuLi50aGlzLnNldHRpbmdzLmN1c3RvbSxcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKClcbiAgICAgICAgdGhpcy5wcmVzZXRQcm9maWxlcyA9IGF3YWl0IGdldFZhbGlkQnJvd3NlcigpXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpXG4gICAgICAgIHRoaXMucmVnaXN0ZXJEb21FdmVudChcbiAgICAgICAgICAgIGRvY3VtZW50LFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIGFzeW5jIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGUgPSBldnQudGFyZ2V0IGFzIEVsZW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoZWxlLmNsYXNzTmFtZSA9PT0gJ2V4dGVybmFsLWxpbmsnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGVsZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXIgPSB0aGlzLnNldHRpbmdzLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXIgIT09IERFRkFVTFRfT1BFTl9XSVRIKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGF3YWl0IG9wZW5XaXRoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVzW2N1cl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVMb2c6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmVuYWJsZUxvZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudGltZW91dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZUxvZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2coXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZhaWxlZCB0byBvcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAnc3Bhd24nIGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfSB3aGVuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cnlpbmcgdG8gb3BlbiBhbiBleHRlcm5hbCBsaW5rIHdpdGggJHtjdXJ9LmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgICBERUZBVUxUX1NFVFRJTkdTLFxuICAgICAgICAgICAgYXdhaXQgdGhpcy5sb2FkRGF0YSgpXG4gICAgICAgIClcbiAgICB9XG4gICAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5lbmFibGVMb2cpIHtcbiAgICAgICAgICAgIGxvZygnaW5mbycsICdzYXZpbmcgc2V0dGluZ3MnLCB0aGlzLnNldHRpbmdzKVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncylcbiAgICB9XG59XG5cbmNsYXNzIFBhbmljTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gICAgbWVzc2FnZTogc3RyaW5nXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihhcHApXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB9XG4gICAgb25PcGVuKCkge1xuICAgICAgICBsZXQgeyBjb250ZW50RWwgfSA9IHRoaXNcbiAgICAgICAgY29udGVudEVsLnNldFRleHQodGhpcy5tZXNzYWdlKVxuICAgIH1cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBsZXQgeyBjb250ZW50RWwgfSA9IHRoaXNcbiAgICAgICAgY29udGVudEVsLmVtcHR5KClcbiAgICB9XG59XG5cbmNsYXNzIFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IE9wZW5MaW5rUGx1Z2luXG4gICAgX3Byb2ZpbGVDaGFuZ2VIYW5kbGVyOiBEZWJvdW5jZXI8c3RyaW5nW10+XG4gICAgX3RpbWVvdXRDaGFuZ2VIYW5kbGVyOiBEZWJvdW5jZXI8c3RyaW5nW10+XG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogT3BlbkxpbmtQbHVnaW4pIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luXG4gICAgICAgIHRoaXMuX3Byb2ZpbGVDaGFuZ2VIYW5kbGVyID0gZGVib3VuY2UoXG4gICAgICAgICAgICBhc3luYyAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZXMgPSBKU09OLnBhcnNlKHZhbClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY3VzdG9tID0gcHJvZmlsZXNcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKClcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuaWMoXG4gICAgICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgPz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRvU3RyaW5nKCkgPz9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc29tZSBlcnJvciBvY2N1cnJlZCBpbiBvcGVuLWxpbmstd2l0aCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxNTAwLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIHRoaXMuX3RpbWVvdXRDaGFuZ2VIYW5kbGVyID0gZGVib3VuY2UoXG4gICAgICAgICAgICBhc3luYyAodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IHBhcnNlSW50KHZhbClcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHRpbWVvdXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFuaWMoXG4gICAgICAgICAgICAgICAgICAgICAgICAnVmFsdWUgb2YgdGltZW91dCBzaG91bGQgYmUgaW50ZXJnZXIuJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGltZW91dCA9IHRpbWVvdXRcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMTUwMCxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgIH1cbiAgICBwYW5pYyhtc2c6IHN0cmluZykge1xuICAgICAgICBuZXcgUGFuaWNNb2RhbCh0aGlzLmFwcCwgbXNnKS5vcGVuKClcbiAgICB9XG4gICAgX3JlbmRlcigpIHtcbiAgICAgICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXNcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKVxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdCcm93c2VyJylcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgICdPcGVuIGV4dGVybmFsIGxpbmsgd2l0aCBzZWxlY3RlZCBicm93c2VyLidcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGREcm9wZG93bigoZGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXIgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zZWxlY3RlZFxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zOiBzdHJpbmdbXSA9IFtdXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZXMgPSB0aGlzLnBsdWdpbi5wcm9maWxlc1xuICAgICAgICAgICAgICAgIGxldCBfbWF0Y2ggPSBmYWxzZVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBPYmplY3Qua2V5cyhwcm9maWxlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPT09IGN1cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX21hdGNoID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMudW5zaGlmdChwKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghX21hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoREVGQVVMVF9PUEVOX1dJVEgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChERUZBVUxUX09QRU5fV0lUSClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaSkgPT4gZGQuYWRkT3B0aW9uKGksIGkpKVxuICAgICAgICAgICAgICAgIGRkLm9uQ2hhbmdlKGFzeW5jIChwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNlbGVjdGVkID0gcFxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdDdXN0b21pemF0aW9uJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdDdXN0b21pemF0aW9uIHByb2ZpbGVzIGluIEpTT04uJylcbiAgICAgICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCd7fScpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmN1c3RvbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDRcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodGhpcy5fcHJvZmlsZUNoYW5nZUhhbmRsZXIpXG4gICAgICAgICAgICApXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0xvZ3MnKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgJ0Rpc3BsYXkgbG9ncyBpbiBjb25zb2xlIChvcGVuIGRldmVsb3BlciB0b29scyB0byB2aWV3KS4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcbiAgICAgICAgICAgICAgICB0b2dnbGVcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW5hYmxlTG9nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZUxvZyA9IHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdUaW1lb3V0JylcbiAgICAgICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICAgICAgICAgIHRleHRcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCc1MDAnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50aW1lb3V0LnRvU3RyaW5nKClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodGhpcy5fdGltZW91dENoYW5nZUhhbmRsZXIpXG4gICAgICAgICAgICApXG4gICAgfVxuICAgIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpXG4gICAgfVxufVxuIl0sIm5hbWVzIjpbInBhdGgiLCJleGlzdHNTeW5jIiwic3Bhd25TeW5jIiwic3Bhd24iLCJvcyIsInBsYXRmb3JtIiwiUGx1Z2luIiwiTW9kYWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiZGVib3VuY2UiLCJTZXR0aW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFD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
