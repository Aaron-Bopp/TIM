var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/obsidian-daily-notes-interface/dist/main.js
var require_main = __commonJS({
  "node_modules/obsidian-daily-notes-interface/dist/main.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var obsidian = require("obsidian");
    var DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
    var DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
    var DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";
    function shouldUsePeriodicNotesSettings(periodicity) {
      const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
    }
    function getDailyNoteSettings() {
      try {
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings("daily")) {
          const { format: format2, folder: folder2, template: template2 } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
          return {
            format: format2 || DEFAULT_DAILY_NOTE_FORMAT,
            folder: folder2?.trim() || "",
            template: template2?.trim() || ""
          };
        }
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
          format: format || DEFAULT_DAILY_NOTE_FORMAT,
          folder: folder?.trim() || "",
          template: template?.trim() || ""
        };
      } catch (err) {
        console.info("No custom daily note settings found!", err);
      }
    }
    function getWeeklyNoteSettings() {
      try {
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings("weekly")) {
          return {
            format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: periodicNotesSettings.folder?.trim() || "",
            template: periodicNotesSettings.template?.trim() || ""
          };
        }
        const settings = calendarSettings || {};
        return {
          format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
          folder: settings.weeklyNoteFolder?.trim() || "",
          template: settings.weeklyNoteTemplate?.trim() || ""
        };
      } catch (err) {
        console.info("No custom weekly note settings found!", err);
      }
    }
    function getMonthlyNoteSettings() {
      const pluginManager = window.app.plugins;
      try {
        const settings = shouldUsePeriodicNotesSettings("monthly") && pluginManager.getPlugin("periodic-notes")?.settings?.monthly || {};
        return {
          format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
          folder: settings.folder?.trim() || "",
          template: settings.template?.trim() || ""
        };
      } catch (err) {
        console.info("No custom monthly note settings found!", err);
      }
    }
    function join(...partSegments) {
      let parts = [];
      for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
      }
      const newParts = [];
      for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        if (!part || part === ".")
          continue;
        else
          newParts.push(part);
      }
      if (parts[0] === "")
        newParts.unshift("");
      return newParts.join("/");
    }
    function basename(fullPath) {
      let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
      if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
      return base;
    }
    async function ensureFolderExists(path) {
      const dirs = path.replace(/\\/g, "/").split("/");
      dirs.pop();
      if (dirs.length) {
        const dir = join(...dirs);
        if (!window.app.vault.getAbstractFileByPath(dir)) {
          await window.app.vault.createFolder(dir);
        }
      }
    }
    async function getNotePath(directory, filename) {
      if (!filename.endsWith(".md")) {
        filename += ".md";
      }
      const path = obsidian.normalizePath(join(directory, filename));
      await ensureFolderExists(path);
      return path;
    }
    async function getTemplateInfo(template) {
      const { metadataCache, vault } = window.app;
      const templatePath = obsidian.normalizePath(template);
      if (templatePath === "/") {
        return Promise.resolve(["", null]);
      }
      try {
        const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
        const contents = await vault.cachedRead(templateFile);
        const IFoldInfo = window.app.foldManager.load(templateFile);
        return [contents, IFoldInfo];
      } catch (err) {
        console.error(`Failed to read the daily note template '${templatePath}'`, err);
        new obsidian.Notice("Failed to read the daily note template");
        return ["", null];
      }
    }
    function getDateUID(date, granularity = "day") {
      const ts = date.clone().startOf(granularity).format();
      return `${granularity}-${ts}`;
    }
    function removeEscapedCharacters(format) {
      return format.replace(/\[[^\]]*\]/g, "");
    }
    function isFormatAmbiguous(format, granularity) {
      if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters(format);
        return /w{1,2}/i.test(cleanFormat) && (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat));
      }
      return false;
    }
    function getDateFromFile(file, granularity) {
      return getDateFromFilename(file.basename, granularity);
    }
    function getDateFromPath(path, granularity) {
      return getDateFromFilename(basename(path), granularity);
    }
    function getDateFromFilename(filename, granularity) {
      const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings
      };
      const format = getSettings[granularity]().format.split("/").pop();
      const noteDate = window.moment(filename, format, true);
      if (!noteDate.isValid()) {
        return null;
      }
      if (isFormatAmbiguous(format, granularity)) {
        if (granularity === "week") {
          const cleanFormat = removeEscapedCharacters(format);
          if (/w{1,2}/i.test(cleanFormat)) {
            return window.moment(filename, format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
          }
        }
      }
      return noteDate;
    }
    var DailyNotesFolderMissingError = class extends Error {
    };
    async function createDailyNote2(date) {
      const app2 = window.app;
      const { vault } = app2;
      const moment2 = window.moment;
      const { template, format, folder } = getDailyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, moment2().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = moment2();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format);
        }).replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format)).replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format)));
        app2.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getDailyNote2(date, dailyNotes) {
      return dailyNotes[getDateUID(date, "day")] ?? null;
    }
    function getAllDailyNotes2() {
      const { vault } = window.app;
      const { folder } = getDailyNoteSettings();
      const dailyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
      }
      const dailyNotes = {};
      obsidian.Vault.recurseChildren(dailyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "day");
          if (date) {
            const dateString = getDateUID(date, "day");
            dailyNotes[dateString] = note;
          }
        }
      });
      return dailyNotes;
    }
    var WeeklyNotesFolderMissingError = class extends Error {
    };
    function getDaysOfWeek() {
      const { moment: moment2 } = window;
      let weekStart = moment2.localeData()._week.dow;
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      while (weekStart) {
        daysOfWeek.push(daysOfWeek.shift());
        weekStart--;
      }
      return daysOfWeek;
    }
    function getDayOfWeekNumericalValue(dayOfWeekName) {
      return getDaysOfWeek().indexOf(dayOfWeekName.toLowerCase());
    }
    async function createWeeklyNote(date) {
      const { vault } = window.app;
      const { template, format, folder } = getWeeklyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = window.moment();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format);
        }).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
          const day = getDayOfWeekNumericalValue(dayOfWeek);
          return date.weekday(day).format(momentFormat.trim());
        }));
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getWeeklyNote(date, weeklyNotes) {
      return weeklyNotes[getDateUID(date, "week")] ?? null;
    }
    function getAllWeeklyNotes() {
      const weeklyNotes = {};
      if (!appHasWeeklyNotesPluginLoaded()) {
        return weeklyNotes;
      }
      const { vault } = window.app;
      const { folder } = getWeeklyNoteSettings();
      const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
      }
      obsidian.Vault.recurseChildren(weeklyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "week");
          if (date) {
            const dateString = getDateUID(date, "week");
            weeklyNotes[dateString] = note;
          }
        }
      });
      return weeklyNotes;
    }
    var MonthlyNotesFolderMissingError = class extends Error {
    };
    async function createMonthlyNote(date) {
      const { vault } = window.app;
      const { template, format, folder } = getMonthlyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = window.moment();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format);
        }).replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename));
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getMonthlyNote(date, monthlyNotes) {
      return monthlyNotes[getDateUID(date, "month")] ?? null;
    }
    function getAllMonthlyNotes() {
      const monthlyNotes = {};
      if (!appHasMonthlyNotesPluginLoaded()) {
        return monthlyNotes;
      }
      const { vault } = window.app;
      const { folder } = getMonthlyNoteSettings();
      const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!monthlyNotesFolder) {
        throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
      }
      obsidian.Vault.recurseChildren(monthlyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "month");
          if (date) {
            const dateString = getDateUID(date, "month");
            monthlyNotes[dateString] = note;
          }
        }
      });
      return monthlyNotes;
    }
    function appHasDailyNotesPluginLoaded() {
      const { app: app2 } = window;
      const dailyNotesPlugin = app2.internalPlugins.plugins["daily-notes"];
      if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
      }
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.daily?.enabled;
    }
    function appHasWeeklyNotesPluginLoaded() {
      const { app: app2 } = window;
      if (app2.plugins.getPlugin("calendar")) {
        return true;
      }
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.weekly?.enabled;
    }
    function appHasMonthlyNotesPluginLoaded() {
      const { app: app2 } = window;
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.monthly?.enabled;
    }
    function getPeriodicNoteSettings(granularity) {
      const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings
      }[granularity];
      return getSettings();
    }
    function createPeriodicNote(granularity, date) {
      const createFn = {
        day: createDailyNote2,
        month: createMonthlyNote,
        week: createWeeklyNote
      };
      return createFn[granularity](date);
    }
    exports.DEFAULT_DAILY_NOTE_FORMAT = DEFAULT_DAILY_NOTE_FORMAT;
    exports.DEFAULT_MONTHLY_NOTE_FORMAT = DEFAULT_MONTHLY_NOTE_FORMAT;
    exports.DEFAULT_WEEKLY_NOTE_FORMAT = DEFAULT_WEEKLY_NOTE_FORMAT;
    exports.appHasDailyNotesPluginLoaded = appHasDailyNotesPluginLoaded;
    exports.appHasMonthlyNotesPluginLoaded = appHasMonthlyNotesPluginLoaded;
    exports.appHasWeeklyNotesPluginLoaded = appHasWeeklyNotesPluginLoaded;
    exports.createDailyNote = createDailyNote2;
    exports.createMonthlyNote = createMonthlyNote;
    exports.createPeriodicNote = createPeriodicNote;
    exports.createWeeklyNote = createWeeklyNote;
    exports.getAllDailyNotes = getAllDailyNotes2;
    exports.getAllMonthlyNotes = getAllMonthlyNotes;
    exports.getAllWeeklyNotes = getAllWeeklyNotes;
    exports.getDailyNote = getDailyNote2;
    exports.getDailyNoteSettings = getDailyNoteSettings;
    exports.getDateFromFile = getDateFromFile;
    exports.getDateFromPath = getDateFromPath;
    exports.getDateUID = getDateUID;
    exports.getMonthlyNote = getMonthlyNote;
    exports.getMonthlyNoteSettings = getMonthlyNoteSettings;
    exports.getPeriodicNoteSettings = getPeriodicNoteSettings;
    exports.getTemplateInfo = getTemplateInfo;
    exports.getWeeklyNote = getWeeklyNote;
    exports.getWeeklyNoteSettings = getWeeklyNoteSettings;
  }
});

// src/main.ts
__export(exports, {
  default: () => ThePlugin
});
var import_obsidian6 = __toModule(require("obsidian"));

// src/utils/fileSystem.ts
var fileSystemReturnType;
(function(fileSystemReturnType2) {
  fileSystemReturnType2[fileSystemReturnType2["foldersOnly"] = 1] = "foldersOnly";
  fileSystemReturnType2[fileSystemReturnType2["filesOnly"] = 2] = "filesOnly";
  fileSystemReturnType2[fileSystemReturnType2["filesAndFolders"] = 3] = "filesAndFolders";
})(fileSystemReturnType || (fileSystemReturnType = {}));
var testFolderExclusion = (folder, exclusionFolders) => {
  for (const eFolder of exclusionFolders)
    if (folder.startsWith(eFolder + "/"))
      return true;
  return false;
};
var getFiles = async (app2, rootPath, returnType, responseArray, exclusionFolders) => {
  if (returnType === 2 || returnType === 3) {
    for (const file of await app2.vault.getMarkdownFiles())
      if (!testFolderExclusion(file.path, exclusionFolders))
        responseArray.push({ display: file.path, info: file.path });
  }
  if (returnType === 1 || returnType === 3) {
    for (const folder of await (await app2.vault.adapter.list(rootPath)).folders) {
      if (!folder.startsWith(".") && !testFolderExclusion(folder + "/", exclusionFolders)) {
        if (returnType === 1 || returnType === 3)
          responseArray.push({ display: folder + "/", info: "" });
      }
      await getFiles(app2, folder, returnType, responseArray, exclusionFolders);
    }
  }
};
var addLastOpenFiles = async (app2, responseArray) => {
  const lastOpenFiles = app2.workspace.getLastOpenFiles();
  if (lastOpenFiles.length === 0)
    return;
  for (let iLF = 0; iLF < lastOpenFiles.length; iLF++)
    if (await app2.vault.adapter.exists(lastOpenFiles[iLF]) === false)
      lastOpenFiles.splice(iLF, 1);
  for (let iLF = 0; iLF < lastOpenFiles.length; iLF++) {
    const recentFile = lastOpenFiles[iLF];
    for (let iFile = 0; iFile < responseArray.length; iFile++) {
      if (recentFile === responseArray[iFile].info) {
        responseArray.splice(iFile, 1);
        break;
      }
    }
  }
  for (let i = lastOpenFiles.length - 1; i >= 0; i--)
    responseArray.unshift({ display: "Recent file: " + lastOpenFiles[i], info: lastOpenFiles[i] });
};
var fileSystem = class {
  constructor(plugin, dnpLabel) {
    this.exclusionFolders = [];
    this.plugin = plugin;
    this.dnpLabel = dnpLabel;
  }
  setExclusionFolders(exclusion) {
    this.exclusionFolders = exclusion;
  }
  async getAllFolders(rootPath) {
    const results = [];
    await getFiles(this.plugin.app, rootPath, 1, results, this.exclusionFolders);
    return results;
  }
  async getAllFiles(rootPath) {
    const results = [];
    await getFiles(this.plugin.app, rootPath, 2, results, this.exclusionFolders);
    await addLastOpenFiles(this.plugin.app, results);
    if (this.plugin.settings.enableDNP)
      results.unshift({ display: this.dnpLabel, info: this.dnpLabel });
    return results;
  }
  async getAllFoldersAndFiles(rootPath) {
    const results = [];
    await getFiles(this.plugin.app, rootPath, 3, results, this.exclusionFolders);
    await addLastOpenFiles(this.plugin.app, results);
    return results;
  }
};

// src/ui/genericFuzzySuggester.ts
var import_obsidian = __toModule(require("obsidian"));
var genericFuzzySuggester = class extends import_obsidian.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
  }
  setSuggesterData(suggesterData) {
    this.data = suggesterData;
  }
  async display(callBack) {
    this.callbackFunction = callBack;
    this.open();
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
  onChooseSuggestion(item, evt) {
    this.callbackFunction(item, evt);
  }
};

// node_modules/nanoid/index.prod.js
if (false) {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative" && typeof crypto === "undefined") {
    throw new Error("React Native does not have a built-in secure random generator. If you don\u2019t need unpredictable IDs use `nanoid/non-secure`. For secure IDs, import `react-native-get-random-values` before Nano ID.");
  }
  if (typeof msCrypto !== "undefined" && typeof crypto === "undefined") {
    throw new Error("Import file with `if (!window.crypto) window.crypto = window.msCrypto` before importing Nano ID to fix IE 11 support");
  }
  if (typeof crypto === "undefined") {
    throw new Error("Your browser does not have secure random generator. If you don\u2019t need unpredictable IDs, you can use nanoid/non-secure.");
  }
}
var random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
var customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * size / alphabet.length);
  return () => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || "";
        if (id.length === size)
          return id;
      }
    }
  };
};
var customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);

// src/utils/transporterFunctions.ts
var import_obsidian2 = __toModule(require("obsidian"));

// src/utils/fileCacheAnalyzer.ts
var fileCacheAnalyzer = class {
  constructor(plugin, fileFullPath) {
    this.details = [];
    this.plugin = plugin;
    this.cache = plugin.app.metadataCache.getCache(fileFullPath);
    this.fileFullPath = fileFullPath;
    for (const section of this.cache.sections) {
      switch (section.type) {
        case "heading":
          this.breakdownCacheItems(this.cache.headings, section, false);
          break;
        case "list":
          this.breakdownCacheItems(this.cache.listItems, section, true);
          break;
        default:
          this.details.push({
            index: 0,
            type: section.type,
            lineStart: section.position.start.line,
            lineEnd: section.position.end.line,
            position: section.position,
            blockId: section.id
          });
          break;
      }
    }
    for (const i in this.details)
      this.details[i].index = Number(i);
  }
  getBlockAtLine(line, defaultForward) {
    let lastBlockToMatch = this.details[0];
    for (let i = 0; i < this.details.length; i++) {
      const currentItem = this.details[i];
      if (defaultForward === false && line >= currentItem.lineEnd)
        lastBlockToMatch = currentItem;
      else if (defaultForward) {
        const nextItem = this.details[i + 1];
        if (line > currentItem.lineEnd && nextItem && line < nextItem.lineStart)
          lastBlockToMatch = nextItem;
        else if (line >= currentItem.lineStart)
          lastBlockToMatch = currentItem;
      }
    }
    return lastBlockToMatch;
  }
  getBlockAfterLine(line) {
    const blockIndexAtLine = this.getBlockAtLine(line, true).index;
    if (this.details.length === 1)
      return this.details[0];
    else if (this.details.length - 1 > blockIndexAtLine)
      return this.details[blockIndexAtLine + 1];
    else
      return null;
  }
  getBlockBeforeLine(line) {
    const blockNumberAtLine = this.getBlockAtLine(line, false).index;
    if (this.details.length === 0)
      return null;
    else if (blockNumberAtLine > 0 && this.details.length >= blockNumberAtLine)
      return this.details[blockNumberAtLine - 1];
    else
      return this.details[0];
  }
  getPositionOfHeaderAndItsChildren(headerName) {
    let startLine = null;
    let endLine = null;
    let headingLevel = null;
    for (const h of this.details) {
      if (startLine === null && h.type === "heading" && h.headingText === headerName) {
        startLine = h.position.start;
        headingLevel = h.headingLevel;
        endLine = h.position.end;
      } else if (startLine != null && h.type === "heading" && h.headingLevel <= headingLevel) {
        break;
      } else
        endLine = h.position.end;
    }
    return startLine === null ? null : { start: startLine, end: endLine };
  }
  async createDocumentWithInfo() {
    let output = `# ${this.fileFullPath}

`;
    for (const item of this.details) {
      output += item.type + " " + item.lineStart + "->" + item.lineEnd + " " + (item.blockId ? item.blockId : "") + "\n";
    }
    const fileName = "/fileBreadkown.md";
    await this.plugin.app.vault.adapter.write(fileName, output);
    const newFile = await this.plugin.app.vault.getAbstractFileByPath(fileName);
    const leaf = this.plugin.app.workspace.splitActiveLeaf("vertical");
    leaf.openFile(newFile);
  }
  breakdownCacheItems(cacheItems, section, checkForBlockRefs) {
    let itemsFoundTrackToBreakOut = false;
    for (const itemInCache of cacheItems) {
      const positionInSameRange = this.positionOfItemWithinSameRange(itemInCache.position, section.position);
      if (positionInSameRange === false && itemsFoundTrackToBreakOut === true) {
        break;
      } else if (positionInSameRange) {
        itemsFoundTrackToBreakOut = true;
        const itemToAppend = {
          index: 0,
          type: section.type,
          lineStart: itemInCache.position.start.line,
          lineEnd: itemInCache.position.end.line,
          position: itemInCache.position
        };
        const heading = itemInCache;
        if (heading.heading) {
          itemToAppend.headingText = heading.heading;
          itemToAppend.headingLevel = heading.level;
        }
        if (checkForBlockRefs && this.cache.blocks) {
          for (const b of Object.values(this.cache.blocks)) {
            if (this.positionOfItemWithinSameRange(b.position, itemInCache.position)) {
              itemToAppend.blockId = b.id;
              break;
            }
          }
        }
        this.details.push(itemToAppend);
      }
    }
  }
  positionOfItemWithinSameRange(firstPosition, secondPosition) {
    return firstPosition.start.line >= secondPosition.start.line && firstPosition.end.line <= secondPosition.end.line;
  }
};

// src/utils/transporterFunctions.ts
var import_obsidian_daily_notes_interface = __toModule(require_main());
function getContextObjects() {
  const currentView = this.app.workspace.activeLeaf.view;
  const currentFile = currentView.file;
  const cache = this.app.metadataCache.getFileCache(currentFile);
  const editor = currentView.editor;
  const currentLine = Number(editor.getCursor().line);
  const currentLineEmpty = editor.getLine(currentLine).trim().length === 0 ? true : false;
  return { currentView, currentFile, cache, editor, currentLine, currentLineEmpty };
}
function selectCurrentLine() {
  const ctx = getContextObjects();
  ctx.editor.setSelection({ line: ctx.currentLine, ch: 0 }, { line: ctx.currentLine, ch: ctx.editor.getLine(ctx.editor.getCursor().line).length });
}
function selectAdjacentBlock(plugin, nextBlock) {
  const ctx = getContextObjects();
  const f = new fileCacheAnalyzer(plugin, ctx.currentFile.path);
  let nextBlockSelection;
  if (nextBlock)
    if (ctx.currentLineEmpty)
      nextBlockSelection = f.getBlockAtLine(ctx.currentLine, true);
    else
      nextBlockSelection = f.getBlockAfterLine(ctx.currentLine);
  else if (ctx.currentLineEmpty)
    nextBlockSelection = f.getBlockAtLine(ctx.currentLine, false);
  else
    nextBlockSelection = f.getBlockBeforeLine(ctx.currentLine);
  if (nextBlockSelection !== null) {
    const start = { line: nextBlockSelection.position.start.line, ch: nextBlockSelection.position.start.col };
    const end = { line: nextBlockSelection.position.end.line, ch: nextBlockSelection.position.end.col };
    ctx.editor.setSelection(start, end);
    ctx.editor.scrollIntoView({ from: start, to: end });
  }
}
function selectCurrentSection(plugin, directionUP = true) {
  const ctx = getContextObjects();
  const f = new fileCacheAnalyzer(plugin, ctx.currentFile.path);
  const currentRange = ctx.editor.listSelections();
  if (currentRange[0].anchor.line === currentRange[0].head.line && currentRange[0].head.ch !== ctx.editor.getSelection().length || currentRange[0].head.ch === 0 && currentRange[0].anchor.ch === 0 && ctx.editor.getRange({ line: ctx.currentLine, ch: ctx.editor.getLine(ctx.currentLine).length }, { line: ctx.currentLine, ch: 0 }).length !== 0) {
    ctx.editor.setSelection({ line: ctx.currentLine, ch: 0 }, { line: ctx.currentLine, ch: ctx.editor.getLine(ctx.currentLine).length });
  } else {
    const lastLineOfBlock = f.details.find((section) => {
      if (ctx.currentLine >= Number(section.position.start.line) && ctx.currentLine <= Number(section.position.end.line)) {
        return section.position.start;
      }
    });
    if (lastLineOfBlock === void 0) {
      let nearestBlock = null;
      for (const value of Object.entries(f.details)) {
        if (value.position) {
          if (directionUP === false && ctx.currentLine < Number(value.position.end.line) && nearestBlock === null) {
            nearestBlock = value;
          } else if (directionUP === true && ctx.currentLine > Number(value.position.start.line)) {
            nearestBlock = value;
          }
        }
      }
      if (nearestBlock === null && ctx.currentLine === 0 && f.details.length > 0)
        nearestBlock = ctx.cache.sections[0];
      if (nearestBlock !== null) {
        ctx.editor.setSelection({ line: nearestBlock.position.start.line, ch: 0 }, { line: nearestBlock.position.end.line, ch: nearestBlock.position.end.col });
        return;
      }
    }
    const curSels = ctx.editor.listSelections();
    if (lastLineOfBlock && lastLineOfBlock.type === "paragraph" && curSels.length === 1 && (curSels[0].anchor.line !== lastLineOfBlock.position.start.line && curSels[0].head.line !== lastLineOfBlock.position.end.line)) {
      ctx.editor.setSelection({ line: lastLineOfBlock.position.start.line, ch: 0 }, { line: lastLineOfBlock.position.end.line, ch: lastLineOfBlock.position.end.col });
    } else {
      let firstSelectedLine = 0;
      let lastSelectedLine = 0;
      let currentBlock = null;
      let proceedingBlock = null;
      let nextBlock = null;
      if (currentRange[0].anchor.line < currentRange[0].head.line) {
        firstSelectedLine = currentRange[0].anchor.line;
        lastSelectedLine = currentRange[0].head.line;
      } else {
        firstSelectedLine = currentRange[0].head.line;
        lastSelectedLine = currentRange[0].anchor.line;
      }
      for (let i = 0; i < f.details.length; i++) {
        if (ctx.currentLine >= f.details[i].position.end.line) {
          currentBlock = f.details[i];
          try {
            nextBlock = f.details[i + 1];
          } catch (e) {
            console.log(e);
          }
        }
        if (firstSelectedLine > f.details[i].position.end.line)
          proceedingBlock = f.details[i];
      }
      if (proceedingBlock && directionUP) {
        ctx.editor.setSelection({ line: proceedingBlock.position.start.line, ch: 0 }, { line: currentBlock.position.end.line, ch: ctx.editor.getLine(currentBlock.position.end.line).length });
        ctx.editor.scrollIntoView({ from: proceedingBlock.position.start, to: proceedingBlock.position.start });
      } else if (directionUP) {
        ctx.editor.setSelection({ line: 0, ch: 0 }, { line: lastSelectedLine, ch: ctx.editor.getLine(lastSelectedLine).length });
        ctx.editor.scrollIntoView({ from: { line: 0, ch: 0 }, to: { line: firstSelectedLine, ch: 0 } });
      } else if (nextBlock && directionUP === false) {
        ctx.editor.setSelection({ line: firstSelectedLine, ch: 0 }, { line: nextBlock.position.end.line, ch: ctx.editor.getLine(nextBlock.position.end.line).length });
        ctx.editor.scrollIntoView({ from: nextBlock.position.start, to: nextBlock.position.start });
      }
    }
  }
}
var nanoid = customAlphabet("abcdefghijklmnopqrstuvwz", 6);
function cleanupHeaderNameForBlockReference(header) {
  return header.replaceAll("[", "").replaceAll("]", "").replaceAll("#", "").replaceAll("|", "");
}
async function copyBlockRefToClipboard(plugin, copyToClipBoard = true, copyAsAlias = false, aliasText = "*") {
  const ctx = getContextObjects();
  const f = new fileCacheAnalyzer(plugin, ctx.currentFile.path);
  const currentBlock = f.getBlockAtLine(ctx.currentLine, true);
  const blockPrefix = copyAsAlias === false ? "!" : "";
  aliasText = copyAsAlias === true ? "|" + aliasText : "";
  if (currentBlock.type === "heading") {
    let headerText = ctx.editor.getRange({ line: ctx.currentLine, ch: 0 }, { line: ctx.currentLine, ch: ctx.editor.getLine(ctx.currentLine).length });
    headerText = currentBlock.headingText.replaceAll("[", "").replaceAll("]", "").replaceAll("#", "").replaceAll("|", "");
    headerText = "#" + cleanupHeaderNameForBlockReference(headerText);
    const block = `${blockPrefix}[[${ctx.currentFile.name + headerText.trim()}${aliasText}]]`.split("\n").join("");
    if (copyToClipBoard)
      navigator.clipboard.writeText(block).then((text) => text);
    else
      return block;
  } else if (currentBlock.type === "paragraph" || currentBlock.type === "list") {
    const id = currentBlock.blockId ? currentBlock.blockId : nanoid();
    const block = `${blockPrefix}[[${ctx.currentFile.name}#^${id}${aliasText}]]`.split("\n").join("");
    if (!currentBlock.blockId)
      ctx.editor.replaceRange(` ^${id}`, { line: Number(currentBlock.position.end.line), ch: currentBlock.position.end.col }, { line: Number(currentBlock.position.end.line), ch: currentBlock.position.end.col });
    if (copyToClipBoard)
      navigator.clipboard.writeText(block).then((text) => text);
    else
      return block;
  } else
    new import_obsidian2.Notice("A block reference cannot be generated for this line.");
}
async function addBlockRefsToSelection(plugin, copyToClipbard) {
  const ctx = getContextObjects();
  const f = new fileCacheAnalyzer(plugin, ctx.currentFile.path);
  const curSels = ctx.editor.listSelections();
  const blockRefs = [];
  for (const sel of curSels) {
    const startLine = sel.anchor.line > sel.head.line ? sel.head.line : sel.anchor.line;
    const endLine = sel.anchor.line > sel.head.line ? sel.anchor.line : sel.head.line;
    for (let selectedLineInEditor = startLine; selectedLineInEditor <= endLine; selectedLineInEditor++) {
      for (let sectionCounter = 0; sectionCounter < f.details.length; sectionCounter++) {
        const section = f.details[sectionCounter];
        if (selectedLineInEditor >= section.position.start.line && selectedLineInEditor <= section.position.end.line) {
          if ((section.type === "paragraph" || section.type === "list") && !section.blockId) {
            const newId = nanoid();
            ctx.editor.replaceRange(` ^${newId}`, { line: Number(section.position.end.line), ch: section.position.end.col }, { line: Number(section.position.end.line), ch: section.position.end.col });
            blockRefs.push("#^" + newId);
            selectedLineInEditor = section.position.end.line;
            break;
          } else if (section.type === "paragraph" || section.type === "list") {
            blockRefs.push("#^" + section.blockId);
            selectedLineInEditor = section.position.end.line;
            break;
          } else if (section.type === "heading") {
            blockRefs.push("#" + cleanupHeaderNameForBlockReference(section.headingText));
            selectedLineInEditor = section.position.end.line;
            break;
          }
        }
      }
    }
  }
  if (copyToClipbard && blockRefs.length > 0) {
    let block = "";
    blockRefs.forEach((b) => block += `![[${ctx.currentFile.name}${b}]]
`);
    navigator.clipboard.writeText(block).then((text) => text);
  }
  return blockRefs;
}
async function displayFileLineSuggester(plugin, returnEndPoint, showTop, callback) {
  const activeFile = getContextObjects().currentFile.path;
  const fileList = await plugin.fs.getAllFiles("/");
  for (let i = 0; i < fileList.length; i++)
    if (fileList[i].info.localeCompare(activeFile, void 0, { sensitivity: "base" }) === 0) {
      fileList.splice(i, 1);
      break;
    }
  if (plugin.settings.bookmarks.trim().length > 0) {
    const bookmarks = plugin.settings.bookmarks.trim().split("\n");
    for (let i = bookmarks.length - 1; i >= 0; i--) {
      let filePath = bookmarks[i];
      if (filePath.search(";") > 0)
        filePath = filePath.substr(0, filePath.search(";"));
      if (await plugin.app.vault.adapter.exists(filePath))
        fileList.unshift({ display: "Bookmark: " + bookmarks[i], info: bookmarks[i] });
    }
  }
  const chooser = new genericFuzzySuggester(plugin);
  chooser.setSuggesterData(fileList);
  chooser.setPlaceholder("Select a file");
  await chooser.display(async (i) => {
    let targetFileName = i.item.info;
    if (plugin.settings.enableDNP && targetFileName === plugin.dnpHeaderForFileSelector) {
      let dnp = (0, import_obsidian_daily_notes_interface.getDailyNote)((0, import_obsidian2.moment)(), (0, import_obsidian_daily_notes_interface.getAllDailyNotes)());
      if (dnp === null)
        dnp = await (0, import_obsidian_daily_notes_interface.createDailyNote)((0, import_obsidian2.moment)());
      targetFileName = dnp.path;
    } else if (targetFileName.search(";") > 0) {
      const filePath = targetFileName.substring(0, targetFileName.search(";"));
      const command = targetFileName.substring(filePath.length + 1).toLocaleUpperCase().trim();
      let lineNumber = -1;
      const fileContentsArray2 = [];
      for (const [key, value] of Object.entries((await plugin.app.vault.adapter.read(filePath)).split("\n"))) {
        fileContentsArray2.push({ display: value, info: key });
      }
      if (command === "BOTTOM" || command !== "TOP") {
        if (command === "BOTTOM")
          lineNumber = fileContentsArray2.length - 1;
        else {
          for (let i2 = 0; i2 < fileContentsArray2.length; i2++) {
            if (fileContentsArray2[i2].display.toLocaleUpperCase().trim() === command) {
              lineNumber = i2;
              break;
            }
          }
          if (lineNumber === -1) {
            new import_obsidian2.Notice("The location was not found in the file: \n\n" + targetFileName.substring(filePath.length + 1), 1e4);
            return;
          }
        }
      }
      callback(filePath, fileContentsArray2, lineNumber, lineNumber);
      return;
    }
    const curContent = await plugin.app.vault.adapter.read(targetFileName);
    const fileContentsArray = [];
    for (const [key, value] of Object.entries(curContent.split("\n")))
      fileContentsArray.push({ display: value, info: key });
    if (showTop)
      fileContentsArray.unshift({ display: "-- Top of file --", info: -1 });
    const firstLinechooser = new genericFuzzySuggester(plugin);
    firstLinechooser.setSuggesterData(fileContentsArray);
    firstLinechooser.setPlaceholder("Select the line from file");
    await firstLinechooser.display(async (iFileLocation, evt) => {
      let startFilePosition = Number(iFileLocation.item.info);
      if (showTop)
        fileContentsArray.splice(0, 1);
      if (returnEndPoint) {
        if (startFilePosition === fileContentsArray.length - 1) {
          callback(targetFileName, fileContentsArray, startFilePosition, startFilePosition, evt);
        } else {
          startFilePosition = startFilePosition === -1 ? 0 : startFilePosition;
          const endPointArray = fileContentsArray.slice(startFilePosition);
          const lastLineChooser = new genericFuzzySuggester(plugin);
          lastLineChooser.setSuggesterData(endPointArray);
          lastLineChooser.setPlaceholder("Select the last line for the selection");
          await lastLineChooser.display(async (iFileLocationEndPoint, evt2) => {
            callback(targetFileName, fileContentsArray, startFilePosition, Number(iFileLocationEndPoint.item.info), evt2);
          });
        }
      } else {
        callback(targetFileName, fileContentsArray, startFilePosition, evt);
      }
    });
  });
}
async function copyOrPushLineOrSelectionToNewLocation(plugin, copySelection) {
  const ctx = getContextObjects();
  let selectedText = ctx.editor.getSelection();
  if (selectedText === "")
    selectedText = ctx.editor.getLine(ctx.currentLine);
  await displayFileLineSuggester(plugin, false, true, (targetFileName, fileContentsArray, lineNumber) => {
    fileContentsArray.splice(Number(lineNumber) + 1, 0, { display: selectedText, info: "" });
    let newContents = "";
    for (const line of fileContentsArray)
      newContents += line.display + "\n";
    newContents = newContents.substring(0, newContents.length - 1);
    plugin.app.vault.adapter.write(targetFileName, newContents);
    if (copySelection === false) {
      const textSelection = ctx.editor.getSelection();
      if (textSelection === "" || ctx.editor.getLine(ctx.currentLine).length === textSelection.length)
        ctx.editor.replaceRange("", { line: ctx.currentLine, ch: 0 }, { line: ctx.currentLine + 1, ch: 0 });
      else
        ctx.editor.replaceSelection("");
    }
  });
}
async function copyOrPulLineOrSelectionFromAnotherLocation(plugin, copySelection) {
  await displayFileLineSuggester(plugin, true, false, (targetFileName, fileContentsArray, startLine, endLine) => {
    startLine = startLine === -1 ? startLine = 0 : startLine;
    endLine = endLine === -1 ? endLine = 0 : endLine;
    let stringToInsertIntoSelection = "";
    for (const element of fileContentsArray.slice(startLine, endLine + 1))
      stringToInsertIntoSelection += element.display + "\n";
    const ctx = getContextObjects();
    stringToInsertIntoSelection = stringToInsertIntoSelection.substring(0, stringToInsertIntoSelection.length - 1);
    ctx.editor.replaceSelection(stringToInsertIntoSelection);
    if (copySelection === false) {
      fileContentsArray.splice(startLine, endLine + 1 - startLine);
      let newContents = "";
      for (const line of fileContentsArray)
        newContents += line.display + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      plugin.app.vault.adapter.write(targetFileName, newContents);
    }
  });
}
async function pushBlockReferenceToAnotherFile(plugin) {
  await displayFileLineSuggester(plugin, false, true, async (targetFileName, fileContentsArray, startLine) => {
    const results = await addBlockRefsToSelection(plugin, false);
    let blockRefs = "";
    const fileName = getContextObjects().currentFile.path;
    if (results.length > 0) {
      for (const ref of results)
        blockRefs += `![[${fileName}${ref}]]
`;
      blockRefs = blockRefs.substring(0, blockRefs.length - 1);
      fileContentsArray.splice(Number(startLine) + 1, 0, { display: blockRefs, info: "" });
      let newContents = "";
      for (const line of fileContentsArray)
        newContents += line.display + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      plugin.app.vault.adapter.write(targetFileName, newContents);
    }
  });
}
async function pullBlockReferenceFromAnotherFile(plugin) {
  await displayFileLineSuggester(plugin, true, false, async (targetFileName, fileContentsArray, startLine, endLine) => {
    startLine = startLine === -1 ? startLine = 0 : startLine;
    endLine = endLine === -1 ? endLine = 0 : endLine;
    const f = new fileCacheAnalyzer(plugin, targetFileName);
    const fileContents = (await plugin.app.vault.adapter.read(targetFileName)).split("\n");
    let fileChanged = false;
    const blockRefs = [];
    for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
      for (let sectionCounter = 0; sectionCounter < f.details.length; sectionCounter++) {
        const section = f.details[sectionCounter];
        if (lineNumber >= section.position.start.line && lineNumber <= section.position.end.line) {
          if ((section.type === "paragraph" || section.type === "list") && !section.blockId) {
            const newId = nanoid();
            fileContents.splice(section.position.end.line, 1, fileContents[section.position.end.line] + " ^" + newId);
            blockRefs.push("#^" + newId);
            fileChanged = true;
            lineNumber = section.position.end.line;
            break;
          } else if (section.type === "paragraph" || section.type === "list") {
            blockRefs.push("#^" + section.blockId);
            lineNumber = section.position.end.line;
            break;
          } else if (section.type === "heading") {
            const heading = cleanupHeaderNameForBlockReference(section.headingText);
            blockRefs.push("#" + heading);
            lineNumber = section.position.end.line;
            break;
          }
        }
      }
    }
    if (fileChanged === true) {
      let newContents = "";
      for (const line of fileContents)
        newContents += line + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      await plugin.app.vault.adapter.write(targetFileName, newContents);
    }
    if (blockRefs.length > 0) {
      const ctx = getContextObjects();
      let blockRefTextToInsert = "";
      for (const ref of blockRefs)
        blockRefTextToInsert += `![[${targetFileName}${ref}]]
`;
      blockRefTextToInsert = blockRefTextToInsert.substring(0, blockRefTextToInsert.length - 1);
      ctx.editor.replaceSelection(blockRefTextToInsert);
    }
  });
}
function testIfCursorIsOnALink() {
  const ctx = getContextObjects();
  if (ctx.cache.links || ctx.cache.embeds || ctx.cache.headings) {
    const ch = ctx.editor.getCursor().ch;
    let linkInfo = null;
    if (ctx.cache.links)
      linkInfo = ctx.cache.links.find((l) => l.position.start.line === ctx.currentLine && (ch >= l.position.start.col && ch <= l.position.end.col));
    if (!linkInfo && ctx.cache.embeds)
      linkInfo = ctx.cache.embeds.find((l) => l.position.start.line === ctx.currentLine && (ch >= l.position.start.col && ch <= l.position.end.col));
    return linkInfo ? linkInfo : null;
  } else
    return null;
}
async function copyBlockReferenceToCurrentCusorLocation(plugin, linkInfo, leaveAliasToFile) {
  const ctx = getContextObjects();
  const file = plugin.app.metadataCache.getFirstLinkpathDest((0, import_obsidian2.getLinkpath)(linkInfo.link), "/");
  let fileContents = await plugin.app.vault.read(file);
  const cache = new fileCacheAnalyzer(plugin, file.path);
  if (cache.details && linkInfo.link.includes("^")) {
    const blockRefId = linkInfo.link.substr(linkInfo.link.indexOf("^") + 1);
    const pos = cache.details.find((b) => b.blockId === blockRefId).position;
    fileContents = fileContents.split("\n").slice(pos.start.line, pos.end.line + 1).join("\n");
    fileContents = fileContents.replace("^" + blockRefId, "");
  } else if (cache.details && linkInfo.link.contains("#")) {
    const headerId = linkInfo.link.substr(linkInfo.link.indexOf("#") + 1);
    const pos = cache.getPositionOfHeaderAndItsChildren(headerId);
    fileContents = fileContents.split("\n").slice(pos.start.line, pos.end.line + 1).join("\n");
  }
  if (leaveAliasToFile)
    fileContents += " [[" + linkInfo.link + "|*]]";
  ctx.editor.replaceRange(fileContents, { line: linkInfo.position.start.line, ch: linkInfo.position.start.col }, { line: linkInfo.position.end.line, ch: linkInfo.position.end.col });
}

// src/ui/cpCommands.ts
var import_obsidian3 = __toModule(require("obsidian"));
var pluginCommands = class {
  constructor(plugin) {
    this.commands = [
      {
        caption: "Select current line",
        shortcut: "SL",
        menu: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentLine()
      },
      {
        caption: "Select block - previous",
        shortcut: "BP",
        menu: false,
        icon: "highlight-glyph",
        command: async () => selectAdjacentBlock(this.plugin, false)
      },
      {
        caption: "Select block - next",
        shortcut: "BN",
        menu: false,
        icon: "highlight-glyph",
        command: async () => selectAdjacentBlock(this.plugin, true)
      },
      {
        caption: "Select current line and expand up into previous block",
        shortcut: "SP",
        menu: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentSection(this.plugin, true)
      },
      {
        caption: "Select current line and expand down into next block",
        shortcut: "SN",
        menu: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentSection(this.plugin, false)
      },
      {
        caption: "Replace link with text",
        shortcut: "ABI",
        menu: false,
        icon: "blocks",
        command: async () => {
          const linkInfo = testIfCursorIsOnALink();
          if (linkInfo)
            await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, false);
          else
            new import_obsidian3.Notice("No link selected in editor.");
        }
      },
      {
        caption: "Replace link with text & alias",
        shortcut: "ABI",
        menu: false,
        icon: "blocks",
        command: async () => {
          const linkInfo = testIfCursorIsOnALink();
          if (linkInfo)
            await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, true);
          else
            new import_obsidian3.Notice("No link selected in editor.");
        }
      },
      {
        caption: "Add block ref ID's to selection and Copy them to clipboard",
        shortcut: "ABI",
        menu: true,
        icon: "blocks",
        command: async () => addBlockRefsToSelection(this.plugin, true)
      },
      {
        caption: "Copy embeded block reference",
        shortcut: "CC",
        menu: true,
        icon: "blocks",
        command: async () => copyBlockRefToClipboard(this.plugin, true, false)
      },
      {
        caption: "Copy embeded alias block reference",
        shortcut: "CA",
        menu: true,
        icon: "blocks",
        command: async () => copyBlockRefToClipboard(this.plugin, true, true, this.plugin.settings.blockRefAliasIndicator)
      },
      {
        caption: "Copy line/selection to another file",
        shortcut: "CLT",
        menu: true,
        icon: "right-arrow-with-tail",
        command: async () => copyOrPushLineOrSelectionToNewLocation(this.plugin, true)
      },
      {
        caption: "Push line/selection to another file",
        shortcut: "PLT",
        menu: true,
        icon: "right-arrow-with-tail",
        command: async () => copyOrPushLineOrSelectionToNewLocation(this.plugin, false)
      },
      {
        caption: "Push line/selection to another file as Block Ref",
        shortcut: "PLB",
        menu: true,
        icon: "right-arrow-with-tail",
        command: async () => pushBlockReferenceToAnotherFile(this.plugin)
      },
      {
        caption: "Copy line(s) from another file",
        shortcut: "CLF",
        menu: true,
        icon: "left-arrow-with-tail",
        command: async () => copyOrPulLineOrSelectionFromAnotherLocation(this.plugin, true)
      },
      {
        caption: "Pull line(s) from another file",
        shortcut: "LLF",
        menu: true,
        icon: "left-arrow-with-tail",
        command: async () => copyOrPulLineOrSelectionFromAnotherLocation(this.plugin, false)
      },
      {
        caption: "Pull line(s) from another file as block",
        shortcut: "LLB",
        menu: true,
        icon: "left-arrow-with-tail",
        command: async () => pullBlockReferenceFromAnotherFile(this.plugin)
      }
    ];
    this.plugin = plugin;
    this.plugin.addCommand({
      id: this.plugin.appID + "-combinedCommands",
      name: "All Commands List",
      icon: "TextTransporter",
      editorCallback: async () => {
        await this.masterControlProgram();
      }
    });
    this.plugin.registerEvent(this.plugin.app.workspace.on("editor-menu", (menu) => {
      const linkInfo = testIfCursorIsOnALink();
      if (linkInfo) {
        menu.addItem((item) => {
          item.setTitle("Replace link with text").setIcon("lines-of-text").onClick(async () => await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, false));
        });
        menu.addItem((item) => {
          item.setTitle("Replace link with text & alias").setIcon("lines-of-text").onClick(async () => await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, true));
        });
      }
      if (this.plugin.settings.enableContextMenuCommands) {
        for (const value of this.commands)
          if (value.menu === true)
            menu.addItem((item) => {
              item.setTitle(value.caption).setIcon(value.icon).onClick(async () => {
                await value.command();
              });
            });
      }
    }));
    for (const [key, value] of Object.entries(this.commands)) {
      this.plugin.addCommand({
        id: this.plugin.appID + "-" + key.toString(),
        icon: value.icon,
        name: `${value.caption} (${value.shortcut})`,
        editorCallback: value.command
      });
    }
  }
  async reloadPlugin() {
    new import_obsidian3.Notice("Reloading plugin: " + this.plugin.appName);
    await app.plugins.disablePlugin("obsidian42-text-transporter");
    await app.plugins.enablePlugin("obsidian42-text-transporter");
  }
  async masterControlProgram() {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
    if (!currentView || currentView.getMode() !== "source") {
      new import_obsidian3.Notice("No document in edit mode");
      return;
    }
    const gfs = new genericFuzzySuggester(this.plugin);
    const cpCommands = [];
    for (const cmd of this.commands)
      cpCommands.push({ display: cmd.caption, info: cmd.command });
    if (this.plugin.settings.enableDebugMode)
      cpCommands.push({ display: "Reload plugin (Debugging)", info: async () => this.reloadPlugin() });
    gfs.setSuggesterData(cpCommands);
    gfs.display(async (i, evt) => i.item.info(evt));
  }
};

// src/ui/settings.ts
var import_obsidian4 = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  enableRibbon: true,
  enableDNP: true,
  enableDebugMode: false,
  blockRefAliasIndicator: "*",
  enableContextMenuCommands: true,
  bookmarks: ""
};
var SettingsTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.plugin.appName });
    new import_obsidian4.Setting(containerEl).setName("Enable Ribbon Support").setDesc("Toggle on and off the plugin button in the ribbon.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbon);
      cb.onChange(async (value) => {
        this.plugin.settings.enableRibbon = value;
        if (this.plugin.settings.enableRibbon === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.configureRibbonCommand();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("Enable Context Menu").setDesc("Toggle on and off the text transporter commands from appearing in the context menu.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableContextMenuCommands);
      cb.onChange(async (value) => {
        this.plugin.settings.enableContextMenuCommands = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("Daily Notes Page Support").setDesc("Toggle on and off support for quickly interacting with your DNP with various commands.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableDNP);
      cb.onChange(async (value) => {
        this.plugin.settings.enableDNP = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("Alias Indicator").setDesc("Indicator used for an aliased block reference.").addText((text) => text.setValue(this.plugin.settings.blockRefAliasIndicator).onChange(async (value) => {
      if (value.trim() === "")
        this.plugin.settings.blockRefAliasIndicator = "*";
      else
        this.plugin.settings.blockRefAliasIndicator = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian4.Setting(containerEl).setName("Bookmarks").setDesc(`Predefined destinations that appear at the top of the file selector. 
						Each line represents one bookmark. The line starts with the path to the file (ex: directory1/subdirectory/filename.md) 
						If just the file path is provided, the file contents will be shown for insertion.
						If after the file name there is a semicolon followed by either: TOP BOTTOM or text to find in the document as an insertion point. Example:

						directory1/subdirectory/filename1.md;TOP  directory1/subdirectory/filename2.md;BOTTOM  directory1/subdirectory/filename3.md;# Inbox
						`).addTextArea((text) => {
      text.setPlaceholder(" directory1/subdirectory/filename1.md;\n directory1/subdirectory/filename2.md;TOP\n directory1/subdirectory/filename3.md;BOTTOM\n directory1/subdirectory/filename4.md;# Inbox").setValue(this.plugin.settings.bookmarks || "").onChange((value) => {
        this.plugin.settings.bookmarks = value;
        this.plugin.saveData(this.plugin.settings);
      });
      text.inputEl.rows = 10;
      text.inputEl.cols = 60;
    });
    new import_obsidian4.Setting(containerEl).setName("Debugging support").setDesc("Toggle on and off debugging support for troubleshooting problems. This may require restarting Obsidian. Also a blackhole may open in your neigborhood.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableDebugMode);
      cb.onChange(async (value) => {
        this.plugin.settings.enableDebugMode = value;
        await this.plugin.saveSettings();
      });
    });
  }
};

// src/ui/icons.ts
var import_obsidian5 = __toModule(require("obsidian"));
function addIcons() {
  (0, import_obsidian5.addIcon)("TextTransporter", `<path fill="currentColor" stroke="currentColor"  d="M 28.324219 21.484375 C 28.324219 25.257812 25.261719 28.320312 21.488281 28.320312 C 17.714844 28.320312 14.652344 25.257812 14.652344 21.484375 C 14.652344 17.707031 17.714844 14.648438 21.488281 14.648438 C 25.261719 14.648438 28.324219 17.707031 28.324219 21.484375 Z M 28.324219 21.484375 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 36.679688 36.671875 C 40.738281 32.617188 42.972656 27.222656 42.972656 21.484375 C 42.972656 9.636719 33.335938 0 21.488281 0 C 9.644531 0 0.00390625 9.636719 0.00390625 21.484375 C 0.00390625 27.222656 2.242188 32.617188 6.296875 36.671875 L 21.488281 51.863281 Z M 8.792969 21.484375 C 8.792969 14.484375 14.488281 8.789062 21.488281 8.789062 C 28.488281 8.789062 34.183594 14.484375 34.183594 21.484375 C 34.183594 28.484375 28.488281 34.175781 21.488281 34.175781 C 14.488281 34.175781 8.792969 28.484375 8.792969 21.484375 Z M 8.792969 21.484375 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 84.371094 62.28125 C 75.753906 62.28125 68.746094 69.289062 68.746094 77.902344 C 68.746094 82.078125 70.371094 86 73.320312 88.953125 L 84.371094 100 L 95.417969 88.953125 C 98.367188 86 99.992188 82.078125 99.992188 77.902344 C 99.992188 69.289062 92.984375 62.28125 84.371094 62.28125 Z M 84.371094 62.28125 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 24.417969 81.132812 C 24.417969 73.96875 30.246094 68.140625 37.414062 68.140625 L 48.285156 68.140625 C 54.71875 68.140625 59.957031 62.902344 59.957031 56.464844 C 59.957031 50.027344 54.71875 44.792969 48.285156 44.792969 L 36.917969 44.792969 L 36.917969 50.652344 L 48.285156 50.652344 C 51.488281 50.652344 54.097656 53.257812 54.097656 56.464844 C 54.097656 59.671875 51.488281 62.28125 48.285156 62.28125 L 37.414062 62.28125 C 27.015625 62.28125 18.558594 70.738281 18.558594 81.132812 C 18.558594 91.53125 27.015625 99.988281 37.414062 99.988281 L 70.113281 99.988281 L 70.113281 94.128906 L 37.414062 94.128906 C 30.246094 94.128906 24.417969 88.300781 24.417969 81.132812 Z M 24.417969 81.132812 "/>`);
}

// src/main.ts
var ThePlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    this.appName = "Obsidian42 - Text Transporter";
    this.appID = "obsidian42-text-transporter";
    this.dnpHeaderForFileSelector = "--- Today's Daily Notes Page ---";
  }
  async onload() {
    console.log("loading " + this.appName);
    this.fs = new fileSystem(this, this.dnpHeaderForFileSelector);
    this.commands = new pluginCommands(this);
    await this.loadSettings();
    addIcons();
    if (this.settings.enableRibbon)
      this.configureRibbonCommand();
    this.addSettingTab(new SettingsTab(this.app, this));
  }
  onunload() {
    console.log("unloading " + this.appName);
  }
  configureRibbonCommand() {
    this.ribbonIcon = this.addRibbonIcon("TextTransporter", this.appName, async () => this.commands.masterControlProgram());
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
