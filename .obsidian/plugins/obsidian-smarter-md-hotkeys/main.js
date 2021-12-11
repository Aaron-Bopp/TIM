/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

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

// main.ts
__export(exports, {
  default: () => SmarterMDhotkeys
});

// const.ts
var COMMANDS = [
  {
    id: "smarter-asterisk-bold",
    name: "Smarter Bold",
    before: "**",
    after: "**"
  },
  {
    id: "smarter-underscore-bold",
    name: "Smarter Underscore Bold",
    before: "__",
    after: "__"
  },
  {
    id: "smarter-asterisk-italics",
    name: "Smarter Italics",
    before: "*",
    after: "*"
  },
  {
    id: "smarter-underscore-italics",
    name: "Smarter Underscore Italics",
    before: "_",
    after: "_"
  },
  {
    id: "smarter-comments",
    name: "Smarter Comments",
    before: "%%",
    after: "%%"
  },
  {
    id: "smarter-inline-code",
    name: "Smarter Inline Code",
    before: "`",
    after: "`"
  },
  {
    id: "smarter-highlight",
    name: "Smarter Highlight",
    before: "==",
    after: "=="
  },
  {
    id: "smarter-strikethrough",
    name: "Smarter Strikethrough",
    before: "~~",
    after: "~~"
  },
  {
    id: "smarter-wikilink",
    name: "Smarter wikilink (internal link)",
    before: "[[",
    after: "]]"
  },
  {
    id: "smarter-md-link",
    name: "Smarter Markdown Link",
    before: "[",
    after: "]()"
  }
];

// main.ts
var import_obsidian = __toModule(require("obsidian"));
var SmarterMDhotkeys = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      COMMANDS.forEach((command) => {
        const { id, name, before, after } = command;
        this.addCommand({
          id,
          name,
          editorCallback: (editor) => this.expandAndWrap(before, after, editor)
        });
      });
      console.log("Smarter MD Hotkeys loaded.");
    });
  }
  onunload() {
    return __async(this, null, function* () {
      console.log("Smarter MD Hotkeys unloaded.");
    });
  }
  expandAndWrap(frontMarkup, endMarkup, editor) {
    return __async(this, null, function* () {
      function markupOutsideSel() {
        const so = startOffset();
        const eo = endOffset();
        const charsBefore = editor.getRange(offToPos(so - blen), offToPos(so));
        const charsAfter = editor.getRange(offToPos(eo), offToPos(eo + alen));
        return charsBefore === frontMarkup && charsAfter === endMarkup;
      }
      const noSelection = () => !editor.somethingSelected();
      const multiWordSel = () => editor.getSelection().includes(" ");
      const multiLineSel = () => editor.getSelection().includes("\n");
      const partialWordSel = () => editor.somethingSelected() && !multiWordSel() && !multiLineSel();
      const startOffset = () => editor.posToOffset(editor.getCursor("from"));
      const endOffset = () => editor.posToOffset(editor.getCursor("to"));
      const offToPos = (offset) => editor.offsetToPos(offset);
      function log(msg, appendSelection) {
        if (!debug)
          return;
        let appended = "";
        if (appendSelection)
          appended = ": " + editor.getSelection();
        console.log("- " + msg + appended);
      }
      function textUnderCursor(ep) {
        var _a, _b;
        if (frontMarkup !== "`") {
          if ((_a = editor.cm) == null ? void 0 : _a.findWordAt)
            return editor.cm.findWordAt(ep);
          if ((_b = editor.cm) == null ? void 0 : _b.state.wordAt)
            return editor.cm.state.wordAt(editor.posToOffset(ep));
        }
        if (frontMarkup === "`") {
          const so = editor.posToOffset(ep);
          let charAfter, charBefore;
          let [i, j, endReached, startReached] = [0, 0, false, false];
          const noteLength = editor.getValue().length;
          while (!/\s/.test(charBefore) && !startReached) {
            charBefore = editor.getRange(offToPos(so - (i + 1)), offToPos(so - i));
            i++;
            if (so - (i - 1) === 0)
              startReached = true;
          }
          while (!/\s/.test(charAfter) && !endReached) {
            charAfter = editor.getRange(offToPos(so + j), offToPos(so + j + 1));
            j++;
            if (so + (j - 1) === noteLength)
              endReached = true;
          }
          const startPos = offToPos(so - (i - 1));
          const endPos = offToPos(so + (j - 1));
          return { anchor: startPos, head: endPos };
        }
      }
      function trimSelection() {
        const trimBefore = ["- [ ] ", "- [x] ", "- ", " ", "\n", "	", frontMarkup];
        const trimAfter = [" ", "\n", "	", endMarkup];
        let selection = editor.getSelection();
        let so = startOffset();
        log("before trim", true);
        let trimFinished = false;
        while (!trimFinished) {
          let cleanCount = 0;
          trimBefore.forEach((str) => {
            if (selection.startsWith(str)) {
              selection = selection.slice(str.length);
              so += str.length;
            } else {
              cleanCount++;
            }
          });
          if (cleanCount === trimBefore.length || !selection.length)
            trimFinished = true;
        }
        trimFinished = false;
        while (!trimFinished) {
          let cleanCount = 0;
          trimAfter.forEach((str) => {
            if (selection.endsWith(str))
              selection = selection.slice(0, -str.length);
            else
              cleanCount++;
          });
          if (cleanCount === trimAfter.length || !selection.length)
            trimFinished = true;
        }
        const blockID = selection.match(/ \^\w+$/);
        if (blockID)
          selection = selection.slice(0, -blockID[0].length);
        editor.setSelection(offToPos(so), offToPos(so + selection.length));
        log("after trim", true);
      }
      function expandToWordBoundary() {
        let preSelExpAnchor, preSelExpHead;
        log("before Exp to Word", true);
        let expMode = "none";
        if (partialWordSel()) {
          expMode = "Partial Word";
          log("One Word Expansion");
          preSelExpAnchor = editor.getCursor("from");
          preSelExpHead = editor.getCursor("to");
          const { anchor, head } = textUnderCursor(preSelExpAnchor);
          const word = editor.getRange(anchor, head);
          if (/^[.,;:\-–—]/.test(word))
            head.ch = anchor.ch + 1;
          editor.setSelection(anchor, head);
        }
        if (multiWordSel()) {
          expMode = "Multi Word";
          log("Multi-Word Expansion");
          preSelExpAnchor = editor.getCursor("from");
          preSelExpHead = editor.getCursor("to");
          const firstWordRange = textUnderCursor(preSelExpAnchor);
          preSelExpHead.ch--;
          const lastWordRange = textUnderCursor(preSelExpHead);
          preSelExpHead.ch++;
          const lastWord = editor.getRange(lastWordRange.anchor, lastWordRange.head);
          if (/^[.,;:\-–—]/.test(lastWord))
            lastWordRange.head.ch = lastWordRange.anchor.ch + 1;
          editor.setSelection(firstWordRange.anchor, lastWordRange.head);
        }
        log("after expansion", true);
        trimSelection();
        return [preSelExpAnchor, preSelExpHead, expMode];
      }
      function expandWithNoSel() {
        const preExpCursor = editor.getCursor();
        const { anchor, head } = textUnderCursor(preExpCursor);
        editor.setSelection(anchor, head);
        trimSelection();
        return preExpCursor;
      }
      function undoWithNoSel() {
        const o = startOffset();
        editor.setSelection(offToPos(o - blen), offToPos(o + alen));
        editor.replaceSelection("");
        editor.setSelection(offToPos(o - blen), offToPos(o - alen));
      }
      function applyMarkup(preNoSelPos_, preSelExpAnchor, preSelExpHead, expMode, lineMode) {
        const selectedText = editor.getSelection();
        const so = startOffset();
        const eo = endOffset();
        if (noSelection() && lineMode === "multi")
          return;
        if (noSelection()) {
          editor.replaceSelection(frontMarkup + endMarkup);
          const cursor = editor.getCursor();
          cursor.ch -= alen;
          editor.setCursor(cursor);
          return;
        }
        if (!markupOutsideSel()) {
          editor.replaceSelection(frontMarkup + selectedText + endMarkup);
          if (preNoSelPos_) {
            preNoSelPos_.ch += blen;
            editor.setCursor(preNoSelPos_);
            return;
          }
          let anchor, head;
          if (expMode === "Multi Word" || expMode === "Partial Word") {
            anchor = preSelExpAnchor;
            head = preSelExpHead;
            anchor.ch += blen;
            head.ch += alen;
          }
          if (expMode === "none") {
            anchor = offToPos(so + blen);
            head = offToPos(eo + blen);
          }
          if (lineMode === "single")
            editor.setSelection(anchor, head);
          return;
        }
        if (markupOutsideSel()) {
          editor.setSelection(offToPos(so - blen), offToPos(eo + alen));
          editor.replaceSelection(selectedText);
          if (preNoSelPos_) {
            preNoSelPos_.ch -= blen;
            editor.setCursor(preNoSelPos_);
            return;
          }
          let anchor, head;
          if (expMode === "Multi Word" || expMode === "Partial Word") {
            anchor = preSelExpAnchor;
            head = preSelExpHead;
            anchor.ch -= blen;
            head.ch -= alen;
          }
          if (expMode === "none") {
            anchor = offToPos(so - blen);
            head = offToPos(eo - alen);
          }
          if (lineMode === "single")
            editor.setSelection(anchor, head);
          return;
        }
      }
      function insertURLtoMDLink() {
        return __async(this, null, function* () {
          const URLregex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/;
          const imageURLregex = /\.(png|jpe?g|gif|tiff?)$/;
          const cbText = (yield navigator.clipboard.readText()).trim();
          if (URLregex.test(cbText))
            endMarkup = "](" + cbText + ")";
          if (imageURLregex.test(cbText))
            frontMarkup = "![";
          return [frontMarkup, endMarkup];
        });
      }
      if (endMarkup === "]()")
        [frontMarkup, endMarkup] = yield insertURLtoMDLink();
      const [blen, alen] = [frontMarkup.length, endMarkup.length];
      const debug = true;
      if (debug)
        console.log("\nSmarterMD Hotkeys triggered\n----------------------------");
      let preNoSelPos;
      if (noSelection()) {
        if (markupOutsideSel()) {
          undoWithNoSel();
          return;
        }
        preNoSelPos = expandWithNoSel();
      }
      if (multiLineSel()) {
        let pointerOff = startOffset();
        const lines = editor.getSelection().split("\n");
        log("lines: " + lines.length.toString());
        lines.forEach((line) => {
          console.log("");
          editor.setSelection(offToPos(pointerOff), offToPos(pointerOff + line.length));
          const [preSelExpAnchor, preSelExpHead, expandMode] = expandToWordBoundary();
          pointerOff += line.length + 1;
          if (markupOutsideSel())
            pointerOff -= blen + alen;
          else
            pointerOff += blen + alen;
          applyMarkup(preNoSelPos, preSelExpAnchor, preSelExpHead, expandMode, "multi");
        });
      } else {
        log("single line");
        const [preSelExpAnchor, preSelExpHead, expandMode] = expandToWordBoundary();
        applyMarkup(preNoSelPos, preSelExpAnchor, preSelExpHead, expandMode, "single");
      }
    });
  }
};
