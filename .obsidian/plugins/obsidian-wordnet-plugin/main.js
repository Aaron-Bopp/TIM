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
  default: () => WordNetPlugin
});
var import_obsidian5 = __toModule(require("obsidian"));

// src/EditSuggest.ts
var import_obsidian = __toModule(require("obsidian"));
var TheEditorSuggestor = class extends import_obsidian.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.updatePattern();
  }
  updatePattern() {
    this.pattern = new RegExp(`.*${this.plugin.settings.slashCommandShortcut}(.*)$`);
  }
  onTrigger(cursor, editor, _file) {
    if (this.plugin.settings.slashCommandEnabled === false)
      return;
    const range = editor.getRange({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: cursor.ch });
    const testResults = this.pattern.exec(range);
    if (!testResults)
      return null;
    else {
      const suggestText = testResults[1];
      this.lastEditorSuggestTriggerInfo = {
        start: { line: cursor.line, ch: cursor.ch - suggestText.length - this.plugin.settings.slashCommandShortcut.length },
        end: { line: cursor.line, ch: cursor.ch },
        query: testResults[1]
      };
      return this.lastEditorSuggestTriggerInfo;
    }
  }
  getSuggestions(context) {
    return this.plugin.dictionarySuggestor.query(context.query);
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.Term });
    el.createEl("br");
    el.appendText(item.Definition);
  }
  selectSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    this.close();
    if (evt.ctrlKey) {
      new import_obsidian.Notice(item.Term + " \n" + item.Definition, 6e4);
      currentView.editor.replaceRange("", this.lastEditorSuggestTriggerInfo.start, this.lastEditorSuggestTriggerInfo.end);
    } else
      currentView.editor.replaceRange(this.plugin.renderDefinitionFromTemplate(item.Term, item.Definition), this.lastEditorSuggestTriggerInfo.start, this.lastEditorSuggestTriggerInfo.end);
  }
};

// src/suggester.ts
var import_obsidian2 = __toModule(require("obsidian"));
var DictionarySuggester = class extends import_obsidian2.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.setPlaceholder("type word to lookup in WordNet");
    setTimeout(() => __async(this, null, function* () {
      const pathWordNetJson = this.plugin.manifest.dir + "/dict-WordNet.json";
      const adapter = this.app.vault.adapter;
      if (yield adapter.exists(pathWordNetJson)) {
        const fileWordNet = yield adapter.read(pathWordNetJson);
        this.wordNet = yield JSON.parse(fileWordNet);
      } else {
        if (navigator.onLine === false) {
          new import_obsidian2.Notice("You do not have an internet connection, and the WordNet dictionary cannot be downloaded. Please restore your interent connection and resteart Obsidian", 3e4);
          this.plugin.unload();
        } else {
          const downloadMessage = new import_obsidian2.Notice("WordNet dictionary is being downloaded, this may take a few minutes. This message will disappear when the process is complete.", 0);
          try {
            const response = yield (0, import_obsidian2.request)({ url: "https://github.com/TfTHacker/Obsidian-WordNet/releases/download/WordNetJson/dict-WordNet.json" });
            downloadMessage.hide();
            if (response === "Not Found" || response === `{"error":"Not Found"}`) {
              new import_obsidian2.Notice(`The WordNet dictionary file is not currently available for download. Please try again later or contact the developer on Twitter: @TfThacker for support.`, 3e4);
              this.plugin.unload();
            } else {
              this.wordNet = yield JSON.parse(response);
              yield adapter.write(pathWordNetJson, JSON.stringify(this.wordNet));
            }
          } catch (e) {
            console.log(`Error in WordNet dictinary: ${e}`);
            new import_obsidian2.Notice(`An error has occured with the download, please try again later: ${e}`);
            this.plugin.unload();
          }
        }
      }
      if (yield adapter.exists(this.plugin.manifest.dir + "/dict-MyDict.json")) {
        const fileCustomDict = yield adapter.read(this.plugin.manifest.dir + "/dict-MyDict.json");
        this.customDict = yield JSON.parse(fileCustomDict);
      } else
        this.customDict = null;
    }), 10);
  }
  query(term) {
    const results = [];
    const searchTerm = term.toLocaleLowerCase();
    let countOfFoundMatches = 0;
    if (this.customDict != null) {
      for (let i = 0; i < this.customDict.length && countOfFoundMatches < 30; i++) {
        const item = this.customDict[i];
        if (item["SearchTerm"].startsWith(searchTerm)) {
          results.push(this.customDict[i]);
          countOfFoundMatches++;
        }
      }
    }
    countOfFoundMatches = 0;
    for (let i = 0; i < this.wordNet.length && countOfFoundMatches < 20; i++) {
      const item = this.wordNet[i];
      if (item["SearchTerm"].startsWith(searchTerm)) {
        results.push(this.wordNet[i]);
        countOfFoundMatches++;
      }
    }
    return results;
  }
  getItems() {
    let searchTerm = "";
    if (this.inputEl.value.trim().length == 0) {
      const currentView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
      if (currentView != null && currentView.getMode() != void 0 && currentView.editor.somethingSelected()) {
        searchTerm = currentView.editor.getSelection();
        this.inputEl.value = searchTerm;
        this.inputEl.setSelectionRange(0, searchTerm.length);
      }
    } else
      searchTerm = this.inputEl.value.trim();
    return searchTerm === "" ? [] : this.query(searchTerm);
  }
  getItemText(item) {
    return item.SearchTerm;
  }
  onChooseItem(item, evt) {
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.item.Term });
    el.createEl("br");
    el.appendText(item.item.Definition);
  }
  onChooseSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (currentView != null && currentView.getMode() === "source")
      currentView.editor.replaceSelection(this.plugin.renderDefinitionFromTemplate(item.item.Term, item.item.Definition));
    else
      new import_obsidian2.Notice(item.item.Term + " \n" + item.item.Definition, 1e4);
  }
};

// src/settings.ts
var import_obsidian3 = __toModule(require("obsidian"));
var import_obsidian4 = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  enableRibbon: true,
  slashCommandEnabled: true,
  slashCommandShortcut: ";;",
  insertTemplate: "**{term}**\n{definition}\n"
};
var WordNetSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian42 - WordNet Dictionary Setting" });
    containerEl.createEl("b", { text: "Ribbon Support" });
    new import_obsidian3.Setting(containerEl).setName("Enable Ribbon Support").setDesc("Toggle on and off the WordNet dictionary button in the ribbon.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbon);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.enableRibbon = value;
        if (this.plugin.settings.enableRibbon === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.configureRibbonCommand();
        yield this.plugin.saveSettings();
      }));
    });
    containerEl.createEl("b", { text: "Slash Command" });
    new import_obsidian3.Setting(containerEl).setName("Enable the Slash Command").setDesc("Toggle on and off the slash command.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.slashCommandEnabled);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.slashCommandEnabled = value;
        yield this.plugin.saveSettings();
      }));
    });
    let cbShortcut;
    new import_obsidian3.Setting(containerEl).setName("Slash Command Characters").setDesc("The characters that will invoke the slash command. The command character cannot be a space.").addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.slashCommandShortcut = DEFAULT_SETTINGS.slashCommandShortcut;
        yield this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
        cbShortcut.setValue(this.plugin.settings.slashCommandShortcut);
      }));
    }).addText((cb) => {
      cbShortcut = cb;
      cb.setValue(this.plugin.settings.slashCommandShortcut);
      cb.onChange((value) => __async(this, null, function* () {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.slashCommandShortcut : value;
        this.plugin.settings.slashCommandShortcut = newValue;
        yield this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
      }));
    });
    containerEl.createEl("b", { text: "Template" });
    let cbTemplate;
    new import_obsidian3.Setting(containerEl).setName("Template for inserting a definition").setDesc("The template used for inserting a WordNet definition. Use {term} for the term looked up and {definition} for the defintion of that term.").addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.insertTemplate = DEFAULT_SETTINGS.insertTemplate;
        yield this.plugin.saveSettings();
        cbTemplate.setValue(this.plugin.settings.insertTemplate);
      }));
    }).addTextArea((cb) => {
      cbTemplate = cb;
      cb.setValue(this.plugin.settings.insertTemplate);
      cb.onChange((value) => __async(this, null, function* () {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.insertTemplate : value;
        this.plugin.settings.insertTemplate = newValue;
        yield this.plugin.saveSettings();
      }));
      cb.inputEl.rows = 2;
      cb.inputEl.cols = 40;
    });
  }
};

// src/main.ts
var WordNetPlugin = class extends import_obsidian5.Plugin {
  configureRibbonCommand() {
    this.ribbonIcon = this.addRibbonIcon("wordnet", "WordNet Dictionary", () => __async(this, null, function* () {
      this.dictionarySuggestor.open();
    }));
  }
  onload() {
    return __async(this, null, function* () {
      console.log("loading WordNet plugin");
      yield this.loadSettings();
      this.addSettingTab(new WordNetSettingTab(this.app, this));
      this.dictionarySuggestor = new DictionarySuggester(this);
      if (this.settings.enableRibbon)
        this.configureRibbonCommand();
      this.addCommand({
        id: "open-wordnet-suggestor",
        name: "Look up a word",
        callback: () => {
          this.dictionarySuggestor.open();
        }
      });
      this.editSuggester = new TheEditorSuggestor(this);
      this.registerEditorSuggest(this.editSuggester);
    });
  }
  onunload() {
    console.log("unloading WordNet plugin");
  }
  renderDefinitionFromTemplate(term, definition) {
    return this.settings.insertTemplate.replace("{term}", term).replace("{definition}", definition);
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
