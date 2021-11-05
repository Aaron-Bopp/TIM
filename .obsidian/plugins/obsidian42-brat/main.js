var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => ThePlugin
});
var import_obsidian7 = __toModule(require("obsidian"));

// src/SettingsTab.ts
var import_obsidian = __toModule(require("obsidian"));
var BratSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.plugin.appName });
    new import_obsidian.Setting(containerEl).setName("Auto-update at startup").setDesc("If enabled all beta plugins will be checked for updates each time Obsidian starts.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.updateAtStartup);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.updateAtStartup = value;
        yield this.plugin.saveSettings();
      }));
    });
    new import_obsidian.Setting(containerEl).setName("Ribbon Button").setDesc("Toggle ribbon button off and on.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.ribbonIconEnabled);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.ribbonIconEnabled = value;
        if (this.plugin.settings.ribbonIconEnabled === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.showRibbonButton();
        yield this.plugin.saveSettings();
      }));
    });
    containerEl.createEl("hr");
    containerEl.createEl("h2", { text: "Beta Plugin List" });
    containerEl.createEl("div", { text: `The following is a list of beta plugins added via the command palette "Add a beta plugin for testing". ` });
    containerEl.createEl("p");
    containerEl.createEl("div", { text: `Click the x button next to a plugin to remove it from the list.` });
    containerEl.createEl("p");
    containerEl.createEl("span").createEl("b", { text: "Note: " });
    containerEl.createSpan({ text: "This does not delete the plugin, this should be done from the  Community Plugins tab in Settings." });
    new import_obsidian.Setting(containerEl).addButton((cb) => {
      cb.setButtonText("Add Beta plugin");
      cb.onClick(() => __async(this, null, function* () {
        this.plugin.app.setting.close();
        yield this.plugin.betaPlugins.displayAddNewPluginModal(true);
      }));
    });
    for (const bp of this.plugin.settings.pluginList) {
      new import_obsidian.Setting(containerEl).setName(bp).addButton((btn) => {
        btn.setIcon("cross");
        btn.setTooltip("Delete this beta plugin");
        btn.onClick(() => __async(this, null, function* () {
          if (btn.buttonEl.textContent === "")
            btn.setButtonText("Click once more to confirm removal");
          else {
            btn.buttonEl.parentElement.parentElement.remove();
            yield this.plugin.betaPlugins.deletePlugin(bp);
          }
        }));
      });
    }
  }
};

// src/settings.ts
var DEFAULT_SETTINGS = {
  pluginList: [],
  updateAtStartup: false,
  ribbonIconEnabled: true
};
function addBetaPluginToList(plugin, repositoryPath) {
  return __async(this, null, function* () {
    if (!plugin.settings.pluginList.contains(repositoryPath)) {
      plugin.settings.pluginList.unshift(repositoryPath);
      plugin.saveSettings();
    }
  });
}
function existBetaPluginInList(plugin, repositoryPath) {
  return __async(this, null, function* () {
    return plugin.settings.pluginList.contains(repositoryPath);
  });
}

// src/AddNewPluginModal.ts
var import_obsidian2 = __toModule(require("obsidian"));
var AddNewPluginModal = class extends import_obsidian2.Modal {
  constructor(plugin, betaPlugins, openSettingsTabAfterwards = false) {
    super(plugin.app);
    this.plugin = plugin;
    this.betaPlugins = betaPlugins;
    this.address = "";
    this.openSettingsTabAfterwards = openSettingsTabAfterwards;
  }
  submitForm() {
    return __async(this, null, function* () {
      if (this.address === "")
        return;
      const scrubbedAddress = this.address.replace("https://github.com/", "");
      if (yield existBetaPluginInList(this.plugin, scrubbedAddress)) {
        new import_obsidian2.Notice(`BRAT
This plugin is already in the list for beta testing`, 1e4);
        return;
      }
      const result = yield this.betaPlugins.addPlugin(scrubbedAddress);
      if (result) {
        this.close();
      }
    });
  }
  onOpen() {
    this.contentEl.createEl("h4", { text: "Github repository for beta plugin:" });
    this.contentEl.createEl("form", {}, (formEl) => {
      new import_obsidian2.Setting(formEl).addText((textEl) => {
        textEl.setPlaceholder("Repository (example: TfTHacker/obsidian-brat");
        textEl.onChange((value) => {
          this.address = value.trim();
        });
        textEl.inputEl.addEventListener("keydown", (e) => __async(this, null, function* () {
          if (e.key === "Enter" && this.address !== " ") {
            e.preventDefault();
            yield this.submitForm();
          }
        }));
        textEl.inputEl.style.width = "100%";
        window.setTimeout(() => {
          const title = document.querySelector(".setting-item-info");
          if (title)
            title.remove();
          textEl.inputEl.focus();
        }, 10);
      });
      formEl.createDiv("modal-button-container", (buttonContainerEl) => {
        buttonContainerEl.createEl("button", { attr: { type: "button" }, text: "Never mind" }).addEventListener("click", () => this.close());
        buttonContainerEl.createEl("button", {
          attr: { type: "submit" },
          cls: "mod-cta",
          text: "Add Plugin"
        });
      });
      formEl.addEventListener("submit", (e) => __async(this, null, function* () {
        e.preventDefault();
        if (this.address !== "")
          yield this.submitForm();
      }));
    });
  }
  onClose() {
    return __async(this, null, function* () {
      if (this.openSettingsTabAfterwards) {
        yield this.plugin.app.setting.open();
        yield this.plugin.app.setting.openTabById("obsidian42-brat");
      }
    });
  }
};

// src/githubUtils.ts
var import_obsidian3 = __toModule(require("obsidian"));
var GITHUB_RAW_USERCONTENT_PATH = "https://raw.githubusercontent.com/";
var grabReleaseFileFromRepository = (repository, version, fileName) => __async(void 0, null, function* () {
  const URL = `https://github.com/${repository}/releases/download/${version}/${fileName}`;
  try {
    const download = yield (0, import_obsidian3.request)({ url: URL });
    return download === "Not Found" || download === `{"error":"Not Found"}` ? null : download;
  } catch (error) {
    console.log("error in grabReleaseFileFromRepository", URL, error);
  }
});
var grabManifestJsonFromRepository = (repositoryPath, rootManifest = true) => __async(void 0, null, function* () {
  const manifestJsonPath = GITHUB_RAW_USERCONTENT_PATH + repositoryPath + (rootManifest === true ? "/HEAD/manifest.json" : "/HEAD/manifest-beta.json");
  try {
    const response = yield (0, import_obsidian3.request)({ url: manifestJsonPath });
    return response === "404: Not Found" ? null : yield JSON.parse(response);
  } catch (error) {
    console.log(`error in grabManifestJsonFromRepository for ${manifestJsonPath}`, error);
  }
});
var grabCommmunityPluginList = () => __async(void 0, null, function* () {
  const pluginListURL = `https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugins.json`;
  try {
    const response = yield (0, import_obsidian3.request)({ url: pluginListURL });
    return response === "404: Not Found" ? null : yield JSON.parse(response);
  } catch (error) {
    console.log("error in grabCommmunityPluginList", error);
  }
});
var grabCommmunityThemesList = () => __async(void 0, null, function* () {
  const themesURL = `https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-css-themes.json`;
  try {
    const response = yield (0, import_obsidian3.request)({ url: themesURL });
    return response === "404: Not Found" ? null : yield JSON.parse(response);
  } catch (error) {
    console.log("error in grabCommmunityThemesList", error);
  }
});

// src/BetaPlugins.ts
var import_obsidian4 = __toModule(require("obsidian"));
var BetaPlugins = class {
  constructor(plugin) {
    this.plugin = plugin;
  }
  displayAddNewPluginModal(openSettingsTabAfterwards = false) {
    return __async(this, null, function* () {
      const newPlugin = new AddNewPluginModal(this.plugin, this, openSettingsTabAfterwards);
      newPlugin.open();
    });
  }
  validateRepository(repositoryPath, getBetaManifest = false, reportIsues = false) {
    return __async(this, null, function* () {
      const noticeTimeout = 15e3;
      const manifestJson = yield grabManifestJsonFromRepository(repositoryPath, !getBetaManifest);
      if (!manifestJson) {
        if (reportIsues)
          new import_obsidian4.Notice(`BRAT
${repositoryPath}
This does not seem to be an obsidian plugin, as there is no manifest.json file.`, noticeTimeout);
        return null;
      }
      if (!("id" in manifestJson)) {
        if (reportIsues)
          new import_obsidian4.Notice(`BRAT
${repositoryPath}
The plugin id attribute for the release is missing from the manifest file`, noticeTimeout);
        return null;
      }
      if (!("version" in manifestJson)) {
        if (reportIsues)
          new import_obsidian4.Notice(`BRAT
${repositoryPath}
The version attribute for the release is missing from the manifest file`, noticeTimeout);
        return null;
      }
      return manifestJson;
    });
  }
  getAllReleaseFiles(repositoryPath, manifest, getManifest) {
    return __async(this, null, function* () {
      return {
        mainJs: yield grabReleaseFileFromRepository(repositoryPath, manifest.version, "main.js"),
        manifest: getManifest ? yield grabReleaseFileFromRepository(repositoryPath, manifest.version, "manifest.json") : null,
        styles: yield grabReleaseFileFromRepository(repositoryPath, manifest.version, "styles.css")
      };
    });
  }
  writeReleaseFilesToPluginFolder(betaPluginID, relFiles) {
    return __async(this, null, function* () {
      const pluginTargetFolderPath = (0, import_obsidian4.normalizePath)(this.plugin.app.vault.configDir + "/plugins/" + betaPluginID) + "/";
      const adapter = this.plugin.app.vault.adapter;
      if ((yield adapter.exists(pluginTargetFolderPath)) === false || !(yield adapter.exists(pluginTargetFolderPath + "manifest.json"))) {
        yield adapter.mkdir(pluginTargetFolderPath);
      }
      yield adapter.write(pluginTargetFolderPath + "main.js", relFiles.mainJs);
      yield adapter.write(pluginTargetFolderPath + "manifest.json", relFiles.manifest);
      if (relFiles.styles)
        yield adapter.write(pluginTargetFolderPath + "styles.css", relFiles.styles);
    });
  }
  addPlugin(repositoryPath, updatePluginFiles = false, seeIfUpdatedOnly = false, reportIfNotUpdted = false) {
    return __async(this, null, function* () {
      var _a;
      const noticeTimeout = 1e4;
      let primaryManifest = yield this.validateRepository(repositoryPath, true, false);
      const usingBetaManifest = primaryManifest ? true : false;
      if (usingBetaManifest === false)
        primaryManifest = yield this.validateRepository(repositoryPath, false, true);
      if (primaryManifest === null) {
        new import_obsidian4.Notice(`BRAT
${repositoryPath}
A manifest.json or manifest-beta.json file does not exist in the root directory of the repository. This plugin cannot be installed.`, noticeTimeout);
        return false;
      }
      if (!primaryManifest.hasOwnProperty("version")) {
        new import_obsidian4.Notice(`BRAT
${repositoryPath}
The manifest${usingBetaManifest ? "-beta" : ""}.json file in the root directory of the repository does not have a version number in the file. This plugin cannot be installed.`, noticeTimeout);
        return false;
      }
      const getRelease = () => __async(this, null, function* () {
        const rFiles = yield this.getAllReleaseFiles(repositoryPath, primaryManifest, usingBetaManifest);
        if (usingBetaManifest || rFiles.manifest === null)
          rFiles.manifest = JSON.stringify(primaryManifest);
        if (rFiles.mainJs === null) {
          new import_obsidian4.Notice(`BRAT
${repositoryPath}
The release is not complete and cannot be download. main.js is missing from the Release`, noticeTimeout);
          return null;
        }
        return rFiles;
      });
      if (updatePluginFiles === false) {
        const releaseFiles = yield getRelease();
        if (releaseFiles === null)
          return;
        yield this.writeReleaseFilesToPluginFolder(primaryManifest.id, releaseFiles);
        yield addBetaPluginToList(this.plugin, repositoryPath);
        yield this.plugin.app.plugins.loadManifests();
        new import_obsidian4.Notice(`BRAT
${repositoryPath}
The plugin has been registered with BRAT. You may still need to enable it the Community Plugin List.`, noticeTimeout);
      } else {
        const pluginTargetFolderPath = this.plugin.app.vault.configDir + "/plugins/" + primaryManifest.id + "/";
        let localManifestContents = null;
        try {
          localManifestContents = yield this.plugin.app.vault.adapter.read(pluginTargetFolderPath + "manifest.json");
        } catch (e) {
          if (e.errno === -4058) {
            yield this.addPlugin(repositoryPath, false, usingBetaManifest);
            return true;
          } else
            console.log("BRAT - Local Manifest Load", primaryManifest.id, JSON.stringify(e, null, 2));
        }
        const localManifestJSON = yield JSON.parse(localManifestContents);
        if (localManifestJSON.version !== primaryManifest.version) {
          const releaseFiles = yield getRelease();
          if (releaseFiles === null)
            return;
          if (seeIfUpdatedOnly) {
            new import_obsidian4.Notice(`BRAT
There is an update available for ${primaryManifest.id} from version ${localManifestJSON.version} to ${primaryManifest.version}`, 3e4);
          } else {
            yield this.writeReleaseFilesToPluginFolder(primaryManifest.id, releaseFiles);
            yield this.plugin.app.plugins.loadManifests();
            if ((_a = this.plugin.app.plugins.plugins[primaryManifest.id]) == null ? void 0 : _a.manifest)
              yield this.reloadPlugin(primaryManifest.id);
            new import_obsidian4.Notice(`BRAT
${primaryManifest.id}
Plugin has been updated from version ${localManifestJSON.version} to ${primaryManifest.version}.`, 3e4);
          }
        } else if (reportIfNotUpdted)
          new import_obsidian4.Notice(`BRAT
No update available for ${repositoryPath}`, 3e3);
      }
      return true;
    });
  }
  reloadPlugin(pluginName) {
    return __async(this, null, function* () {
      const plugins = this.plugin.app.plugins;
      try {
        yield plugins.disablePlugin(pluginName);
        yield plugins.enablePlugin(pluginName);
      } catch (e) {
        console.log("reload plugin", e);
      }
    });
  }
  updatePlugin(repositoryPath, onlyCheckDontUpdate = false, reportIfNotUpdted = false) {
    return __async(this, null, function* () {
      const result = yield this.addPlugin(repositoryPath, true, onlyCheckDontUpdate, reportIfNotUpdted);
      if (result === false && onlyCheckDontUpdate === false)
        new import_obsidian4.Notice(`BRAT
${repositoryPath}
Update of plugin failed.`);
      return result;
    });
  }
  checkForUpdatesAndInstallUpdates(showInfo = false, onlyCheckDontUpdate = false) {
    return __async(this, null, function* () {
      if (showInfo)
        new import_obsidian4.Notice(`BRAT
Checking for plugin updates STARTED`, 1e4);
      for (const bp of this.plugin.settings.pluginList) {
        yield this.updatePlugin(bp, onlyCheckDontUpdate);
      }
      if (showInfo)
        new import_obsidian4.Notice(`BRAT
Checking for plugin updates COMPLETED`, 1e4);
    });
  }
  deletePlugin(repositoryPath) {
    return __async(this, null, function* () {
      this.plugin.settings.pluginList = this.plugin.settings.pluginList.filter((b) => b != repositoryPath);
      this.plugin.saveSettings();
    });
  }
  getEnabledDisabledPlugins(enabled) {
    const pl = this.plugin.app.plugins;
    const manifests = Object.values(pl.manifests);
    const enabledPlugins = Object.values(pl.plugins).map((p) => p.manifest);
    return enabled ? manifests.filter((manifest) => enabledPlugins.find((pluginName) => manifest.id === pluginName.id)) : manifests.filter((manifest) => !enabledPlugins.find((pluginName) => manifest.id === pluginName.id));
  }
};

// src/GenericFuzzySuggester.ts
var import_obsidian5 = __toModule(require("obsidian"));
var GenericFuzzySuggester = class extends import_obsidian5.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.scope.register(["Shift"], "Enter", (evt) => this.enterTrigger(evt));
    this.scope.register(["Ctrl"], "Enter", (evt) => this.enterTrigger(evt));
  }
  setSuggesterData(suggesterData) {
    this.data = suggesterData;
  }
  display(callBack) {
    return __async(this, null, function* () {
      this.callbackFunction = callBack;
      this.open();
    });
  }
  getItems() {
    return this.data;
  }
  getItemText(item) {
    return item.display;
  }
  onChooseItem() {
    return;
  }
  renderSuggestion(item, el) {
    el.createEl("div", { text: item.item.display });
  }
  enterTrigger(evt) {
    const selectedText = document.querySelector(".suggestion-item.is-selected div").textContent;
    const item = this.data.find((i) => i.display === selectedText);
    if (item) {
      this.invokeCallback(item, evt);
      this.close();
    }
  }
  onChooseSuggestion(item, evt) {
    this.invokeCallback(item.item, evt);
  }
  invokeCallback(item, evt) {
    this.callbackFunction(item, evt);
  }
};

// src/icons.ts
var import_obsidian6 = __toModule(require("obsidian"));
function addIcons() {
  (0, import_obsidian6.addIcon)("BratIcon", `<path fill="currentColor" stroke="currentColor"  d="M 41.667969 41.667969 C 41.667969 39.367188 39.800781 37.5 37.5 37.5 C 35.199219 37.5 33.332031 39.367188 33.332031 41.667969 C 33.332031 43.96875 35.199219 45.832031 37.5 45.832031 C 39.800781 45.832031 41.667969 43.96875 41.667969 41.667969 Z M 60.417969 58.582031 C 59.460938 58.023438 58.320312 57.867188 57.25 58.148438 C 56.179688 58.429688 55.265625 59.125 54.707031 60.082031 C 53.746094 61.777344 51.949219 62.820312 50 62.820312 C 48.050781 62.820312 46.253906 61.777344 45.292969 60.082031 C 44.734375 59.125 43.820312 58.429688 42.75 58.148438 C 41.679688 57.867188 40.539062 58.023438 39.582031 58.582031 C 37.597656 59.726562 36.910156 62.257812 38.042969 64.25 C 40.5 68.53125 45.0625 71.171875 50 71.171875 C 54.9375 71.171875 59.5 68.53125 61.957031 64.25 C 63.089844 62.257812 62.402344 59.726562 60.417969 58.582031 Z M 62.5 37.5 C 60.199219 37.5 58.332031 39.367188 58.332031 41.667969 C 58.332031 43.96875 60.199219 45.832031 62.5 45.832031 C 64.800781 45.832031 66.667969 43.96875 66.667969 41.667969 C 66.667969 39.367188 64.800781 37.5 62.5 37.5 Z M 50 8.332031 C 26.988281 8.332031 8.332031 26.988281 8.332031 50 C 8.332031 73.011719 26.988281 91.667969 50 91.667969 C 73.011719 91.667969 91.667969 73.011719 91.667969 50 C 91.667969 26.988281 73.011719 8.332031 50 8.332031 Z M 50 83.332031 C 33.988281 83.402344 20.191406 72.078125 17.136719 56.363281 C 14.078125 40.644531 22.628906 24.976562 37.5 19.042969 C 37.457031 19.636719 37.457031 20.238281 37.5 20.832031 C 37.5 27.738281 43.097656 33.332031 50 33.332031 C 52.300781 33.332031 54.167969 31.46875 54.167969 29.167969 C 54.167969 26.867188 52.300781 25 50 25 C 47.699219 25 45.832031 23.132812 45.832031 20.832031 C 45.832031 18.53125 47.699219 16.667969 50 16.667969 C 68.410156 16.667969 83.332031 31.589844 83.332031 50 C 83.332031 68.410156 68.410156 83.332031 50 83.332031 Z M 50 83.332031 " />`);
}

// src/main.ts
var ThePlugin = class extends import_obsidian7.Plugin {
  constructor() {
    super(...arguments);
    this.appName = "Obsidian42 - Beta Reviewer's Auto-update Tool (BRAT)";
    this.appID = "obsidian42-brat";
  }
  onload() {
    return __async(this, null, function* () {
      console.log("loading Obsidian42 - BRAT");
      yield this.loadSettings();
      this.addSettingTab(new BratSettingsTab(this.app, this));
      this.betaPlugins = new BetaPlugins(this);
      this.bratCommands = [
        {
          id: "BRAT-AddBetaPlugin",
          name: "Add a beta plugin for testing",
          callback: () => __async(this, null, function* () {
            yield this.betaPlugins.displayAddNewPluginModal();
          })
        },
        {
          id: "BRAT-checkForUpdatesAndUpdate",
          name: "Check for updates to all beta plugins and UPDATE",
          callback: () => __async(this, null, function* () {
            yield this.betaPlugins.checkForUpdatesAndInstallUpdates(true, false);
          })
        },
        {
          id: "BRAT-checkForUpdatesAndDontUpdate",
          name: "Only check for updates to beta plugins, but don't Update",
          callback: () => __async(this, null, function* () {
            yield this.betaPlugins.checkForUpdatesAndInstallUpdates(true, true);
          })
        },
        {
          id: "BRAT-updateOnePlugin",
          name: "Choose a single plugin to update",
          callback: () => __async(this, null, function* () {
            const pluginList = Object.values(this.settings.pluginList).map((m) => {
              return { display: m, info: m };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(pluginList);
            yield gfs.display((results) => __async(this, null, function* () {
              new import_obsidian7.Notice(`BRAT
Checking for updates for ${results.info}`, 3e3);
              yield this.betaPlugins.updatePlugin(results.info, false, true);
            }));
          })
        },
        {
          id: "BRAT-restartPlugin",
          name: "Restart a plugin that is already installed",
          callback: () => __async(this, null, function* () {
            const pluginList = Object.values(this.app.plugins.manifests).map((m) => {
              return { display: m.id, info: m.id };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(pluginList);
            yield gfs.display((results) => __async(this, null, function* () {
              new import_obsidian7.Notice(`${results.info}
Plugin reloading .....`, 5e3);
              yield this.betaPlugins.reloadPlugin(results.info);
            }));
          })
        },
        {
          id: "BRAT-disablePlugin",
          name: "Disable a plugin - toggle it off",
          callback: () => __async(this, null, function* () {
            const pluginList = this.betaPlugins.getEnabledDisabledPlugins(true).map((manifest) => {
              return { display: `${manifest.name} (${manifest.id})`, info: manifest.id };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(pluginList);
            yield gfs.display((results) => __async(this, null, function* () {
              yield this.app.plugins.disablePlugin(results.info);
            }));
          })
        },
        {
          id: "BRAT-enablePlugin",
          name: "Enable a plugin - toggle it on",
          callback: () => __async(this, null, function* () {
            const pluginList = this.betaPlugins.getEnabledDisabledPlugins(false).map((manifest) => {
              return { display: `${manifest.name} (${manifest.id})`, info: manifest.id };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(pluginList);
            yield gfs.display((results) => __async(this, null, function* () {
              yield this.app.plugins.enablePlugin(results.info);
            }));
          })
        },
        {
          id: "BRAT-openGitHubRepository",
          name: "Open the GitHub repository for a plugin",
          callback: () => __async(this, null, function* () {
            const communityPlugins = yield grabCommmunityPluginList();
            const communityPluginList = Object.values(communityPlugins).map((p) => {
              return { display: `Plugin: ${p.name}  (${p.repo})`, info: p.repo };
            });
            const bratList = Object.values(this.settings.pluginList).map((p) => {
              return { display: "BRAT: " + p, info: p };
            });
            communityPluginList.forEach((si) => bratList.push(si));
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(bratList);
            yield gfs.display((results) => __async(this, null, function* () {
              if (results.info)
                window.open(`https://github.com/${results.info}`);
            }));
          })
        },
        {
          id: "BRAT-openGitHubRepoTheme",
          name: "Open the GitHub repository for a theme ",
          callback: () => __async(this, null, function* () {
            const communityTheme = yield grabCommmunityThemesList();
            const communityThemeList = Object.values(communityTheme).map((p) => {
              return { display: `Theme: ${p.name}  (${p.repo})`, info: p.repo };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(communityThemeList);
            yield gfs.display((results) => __async(this, null, function* () {
              if (results.info)
                window.open(`https://github.com/${results.info}`);
            }));
          })
        },
        {
          id: "BRAT-opentPluginSettings",
          name: "Open Plugin Settings Tab",
          callback: () => __async(this, null, function* () {
            const settings = this.app.setting;
            const listOfPluginSettingsTabs = Object.values(settings.pluginTabs).map((t) => {
              return { display: "Plugin: " + t.name, info: t.id };
            });
            const gfs = new GenericFuzzySuggester(this);
            const listOfCoreSettingsTabs = Object.values(settings.settingTabs).map((t) => {
              return { display: "Core: " + t.name, info: t.id };
            });
            listOfPluginSettingsTabs.forEach((si) => listOfCoreSettingsTabs.push(si));
            gfs.setSuggesterData(listOfCoreSettingsTabs);
            yield gfs.display((results) => __async(this, null, function* () {
              settings.open();
              settings.openTabById(results.info);
            }));
          })
        },
        {
          id: "BRAT-switchTheme",
          name: "Switch Active Theme ",
          callback: () => __async(this, null, function* () {
            const communityThemeList = Object.values(this.app.customCss.themes).map((t) => {
              return { display: t, info: t };
            });
            const gfs = new GenericFuzzySuggester(this);
            gfs.setSuggesterData(communityThemeList);
            yield gfs.display((results) => __async(this, null, function* () {
              this.app.customCss.setTheme(results.info);
            }));
          })
        }
      ];
      this.bratCommands.forEach((item) => __async(this, null, function* () {
        this.addCommand({
          id: item.id,
          name: item.name,
          callback: () => __async(this, null, function* () {
            yield item.callback();
          })
        });
      }));
      addIcons();
      if (this.settings.ribbonIconEnabled)
        this.showRibbonButton();
      this.app.workspace.onLayoutReady(() => {
        if (this.settings.updateAtStartup) {
          setTimeout(() => __async(this, null, function* () {
            console.log("BRAT Autoupdate check started");
            yield this.betaPlugins.checkForUpdatesAndInstallUpdates(false);
            console.log("BRAT Autoupdate check completed.");
          }), 1e4);
        }
      });
    });
  }
  ribbonDisplayCommands() {
    return __async(this, null, function* () {
      const bratCommandList = this.bratCommands.map((t) => {
        return { display: t.name, info: t.callback };
      });
      const gfs = new GenericFuzzySuggester(this);
      const settings = this.app.setting;
      const listOfCoreSettingsTabs = Object.values(settings.settingTabs).map((t) => {
        return {
          display: "Core: " + t.name,
          info: () => __async(this, null, function* () {
            settings.open();
            settings.openTabById(t.id);
          })
        };
      });
      const listOfPluginSettingsTabs = Object.values(settings.pluginTabs).map((t) => {
        return {
          display: "Plugin: " + t.name,
          info: () => __async(this, null, function* () {
            settings.open();
            settings.openTabById(t.id);
          })
        };
      });
      bratCommandList.push({ display: "---- Core Plugin Settings ----", info: () => __async(this, null, function* () {
        yield this.ribbonDisplayCommands();
      }) });
      listOfCoreSettingsTabs.forEach((si) => bratCommandList.push(si));
      bratCommandList.push({ display: "---- Plugin Settings ----", info: () => __async(this, null, function* () {
        yield this.ribbonDisplayCommands();
      }) });
      listOfPluginSettingsTabs.forEach((si) => bratCommandList.push(si));
      gfs.setSuggesterData(bratCommandList);
      yield gfs.display((results) => __async(this, null, function* () {
        return yield results.info();
      }));
    });
  }
  showRibbonButton() {
    this.ribbonIcon = this.addRibbonIcon("BratIcon", "BRAT", () => __async(this, null, function* () {
      return this.ribbonDisplayCommands();
    }));
  }
  onunload() {
    console.log("unloading " + this.appName);
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
