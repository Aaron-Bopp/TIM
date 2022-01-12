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
var DEBUGGING = true;
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
    id: "smarter-html-comments",
    name: "Smarter HTML Comments",
    before: "<!--",
    after: "-->"
  },
  {
    id: "smarter-inline-code",
    name: "Smarter Code (Inline/Fenced)",
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
    name: "Smarter Wikilink (Internal Link)",
    before: "[[",
    after: "]]"
  },
  {
    id: "smarter-md-link",
    name: "Smarter Markdown Link/Image",
    before: "[",
    after: "]()"
  },
  {
    id: "smarter-math",
    name: "Smarter Mathjax",
    before: "$",
    after: "$"
  },
  {
    id: "smarter-quotation-marks",
    name: "Smarter Quotation Mark",
    before: '"',
    after: '"'
  },
  {
    id: "smarter-round-brackets",
    name: "Smarter Round Brackets",
    before: "(",
    after: ")"
  },
  {
    id: "smarter-square-brackets",
    name: "Smarter Square Brackets",
    before: "[",
    after: "]"
  },
  {
    id: "smarter-delete",
    name: "Smarter Delete",
    before: "delete",
    after: ""
  }
];
var TRIMBEFORE = [
  "###### ",
  "##### ",
  "#### ",
  "### ",
  "## ",
  "# ",
  "- [ ] ",
  "- [x] ",
  "- ",
  ">",
  " ",
  "\n",
  "	"
];
var TRIMAFTER = [
  " ",
  "\n",
  "	"
];
var EXPANDWHENOUTSIDE = [
  ["#", ""],
  ["[[", "]]"],
  ['"', '"'],
  ["'", "'"],
  ["(", ")"],
  ["[", "]"],
  ["$", ""],
  ["", "\u20AC"]
];
var IMAGEEXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "tiff"
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
      function isOutsideSel(bef, aft) {
        const so = startOffset();
        const eo = endOffset();
        if (so - bef.length < 0)
          return false;
        if (eo - aft.length > noteLength())
          return false;
        const charsBefore = editor.getRange(offToPos(so - bef.length), offToPos(so));
        const charsAfter = editor.getRange(offToPos(eo), offToPos(eo + aft.length));
        return charsBefore === bef && charsAfter === aft;
      }
      const multiLineMarkup = () => ["`", "%%", "<!--", "$"].includes(frontMarkup);
      const markupOutsideSel = () => isOutsideSel(frontMarkup, endMarkup);
      function markupOutsideMultiline(anchor, head) {
        if (anchor.line === 0)
          return false;
        if (head.line === editor.lastLine())
          return false;
        const prevLineContent = editor.getLine(anchor.line - 1);
        const followLineContent = editor.getLine(head.line + 1);
        return prevLineContent.startsWith(frontMarkup) && followLineContent.startsWith(endMarkup);
      }
      const noSel = () => !editor.somethingSelected();
      const multiLineSel = () => editor.getSelection().includes("\n");
      const noteLength = () => editor.getValue().length;
      const startOffset = () => editor.posToOffset(editor.getCursor("from"));
      const endOffset = () => editor.posToOffset(editor.getCursor("to"));
      const offToPos = (offset) => {
        if (offset < 0)
          offset = 0;
        if (offset > noteLength())
          offset = noteLength();
        return editor.offsetToPos(offset);
      };
      function deleteLine(lineNo) {
        if (lineNo < editor.lastLine()) {
          const lineStart = { line: lineNo, ch: 0 };
          const nextLineStart = { line: lineNo + 1, ch: 0 };
          editor.replaceRange("", lineStart, nextLineStart);
        } else {
          const previousLineEnd = { line: lineNo - 1, ch: editor.getLine(lineNo).length };
          const lineEnd = { line: lineNo, ch: editor.getLine(lineNo).length };
          editor.replaceRange("", previousLineEnd, lineEnd);
        }
      }
      function log(msg, appendSelection) {
        if (!DEBUGGING)
          return;
        let appended = "";
        if (appendSelection)
          appended = ': "' + editor.getSelection() + '"';
        if (!msg.startsWith("\n"))
          msg = "- " + msg;
        console.log(msg + appended);
      }
      function textUnderCursor(ep) {
        if (markupOutsideSel() && noSel())
          return { anchor: ep, head: ep };
        let endPos, startPos;
        if (frontMarkup !== "`") {
          if (editor.cm instanceof window.CodeMirror)
            return editor.cm.findWordAt(ep);
          const word = editor.cm.state.wordAt(editor.posToOffset(ep));
          if (!word)
            return { anchor: ep, head: ep };
          startPos = offToPos(word.from);
          endPos = offToPos(word.to);
        }
        if (frontMarkup === "`") {
          log("Getting Code under Cursor");
          const so = editor.posToOffset(ep);
          let charAfter, charBefore;
          let [i, j, endReached, startReached] = [0, 0, false, false];
          while (!/\s/.test(charBefore) && !startReached) {
            charBefore = editor.getRange(offToPos(so - (i + 1)), offToPos(so - i));
            i++;
            if (so - (i - 1) === 0)
              startReached = true;
          }
          while (!/\s/.test(charAfter) && !endReached) {
            charAfter = editor.getRange(offToPos(so + j), offToPos(so + j + 1));
            j++;
            if (so + (j - 1) === noteLength())
              endReached = true;
          }
          startPos = offToPos(so - (i - 1));
          endPos = offToPos(so + (j - 1));
        }
        return { anchor: startPos, head: endPos };
      }
      function trimSelection() {
        let trimAfter = TRIMAFTER;
        let trimBefore = TRIMBEFORE;
        if (multiLineMarkup()) {
          trimBefore = [frontMarkup];
          trimAfter = [endMarkup];
        } else if (frontMarkup !== "delete") {
          trimBefore.push(frontMarkup);
          trimAfter.push(endMarkup);
        }
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
      function expandSelection() {
        trimSelection();
        log("before expandSelection", true);
        const preSelExpAnchor = editor.getCursor("from");
        const preSelExpHead = editor.getCursor("to");
        const firstWordRange = textUnderCursor(preSelExpAnchor);
        const lastWordRange = textUnderCursor(preSelExpHead);
        editor.setSelection(firstWordRange.anchor, lastWordRange.head);
        const expandWhenOutside = EXPANDWHENOUTSIDE;
        expandWhenOutside.forEach((pair) => {
          if (isOutsideSel(pair[0], pair[1])) {
            firstWordRange.anchor.ch -= pair[0].length;
            lastWordRange.head.ch += pair[1].length;
            editor.setSelection(firstWordRange.anchor, lastWordRange.head);
          }
        });
        log("after expandSelection", true);
        trimSelection();
        return { anchor: preSelExpAnchor, head: preSelExpHead };
      }
      function recalibratePos(pos) {
        contentChangeList.forEach((change) => {
          if (pos.line === change.line)
            pos.ch += change.shift;
        });
        return pos;
      }
      function applyMarkup(preAnchor, preHead, lineMode) {
        const selectedText = editor.getSelection();
        const so = startOffset();
        const eo = endOffset();
        if (noSel() && lineMode === "multi")
          return;
        if (!markupOutsideSel()) {
          editor.replaceSelection(frontMarkup + selectedText + endMarkup);
          contentChangeList.push({ line: preAnchor.line, shift: blen }, { line: preHead.line, shift: alen });
          preAnchor.ch += blen;
          preHead.ch += blen;
        }
        if (markupOutsideSel()) {
          editor.setSelection(offToPos(so - blen), offToPos(eo + alen));
          editor.replaceSelection(selectedText);
          contentChangeList.push({ line: preAnchor.line, shift: -blen }, { line: preHead.line, shift: -alen });
          preAnchor.ch -= blen;
          preHead.ch -= blen;
        }
        if (lineMode === "single")
          editor.setSelection(preAnchor, preHead);
      }
      function wrapMultiLine() {
        const selAnchor = editor.getCursor("from");
        selAnchor.ch = 0;
        const selHead = editor.getCursor("to");
        selHead.ch = editor.getLine(selHead.line).length;
        if (frontMarkup === "`") {
          frontMarkup = "```";
          endMarkup = "```";
          alen = 3;
          blen = 3;
        } else if (frontMarkup === "$") {
          frontMarkup = "$$";
          endMarkup = "$$";
          alen = 2;
          blen = 2;
        }
        if (!markupOutsideMultiline(selAnchor, selHead)) {
          editor.setSelection(selAnchor);
          editor.replaceSelection(frontMarkup + "\n");
          selHead.line++;
          editor.setSelection(selHead);
          editor.replaceSelection("\n" + endMarkup);
          if (frontMarkup === "```") {
            const languageDefPos = selAnchor;
            languageDefPos.ch = 3;
            editor.setSelection(languageDefPos);
          }
        }
        if (markupOutsideMultiline(selAnchor, selHead)) {
          deleteLine(selAnchor.line - 1);
          deleteLine(selHead.line);
        }
      }
      function insertURLtoMDLink() {
        return __async(this, null, function* () {
          const URLregex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/;
          const cbText = (yield navigator.clipboard.readText()).trim();
          let frontMarkup_ = frontMarkup;
          let endMarkup_ = endMarkup;
          if (URLregex.test(cbText)) {
            endMarkup_ = "](" + cbText + ")";
            const urlExtension = cbText.split(".").pop();
            if (IMAGEEXTENSIONS.includes(urlExtension))
              frontMarkup_ = "![";
          }
          return [frontMarkup_, endMarkup_];
        });
      }
      function smartDelete() {
        if (isOutsideSel("#", "")) {
          const anchor = editor.getCursor("from");
          const head = editor.getCursor("to");
          if (anchor.ch)
            anchor.ch--;
          editor.setSelection(anchor, head);
        }
        if (isOutsideSel(" ", "")) {
          const anchor = editor.getCursor("from");
          const head = editor.getCursor("to");
          if (anchor.ch)
            anchor.ch--;
          editor.setSelection(anchor, head);
        }
        editor.replaceSelection("");
      }
      log("\nSmarterMD Hotkeys triggered\n---------------------------");
      if (endMarkup === "]()")
        [frontMarkup, endMarkup] = yield insertURLtoMDLink();
      let [blen, alen] = [frontMarkup.length, endMarkup.length];
      const contentChangeList = [];
      const allCursors = editor.listSelections();
      allCursors.forEach((sel) => {
        sel.anchor = recalibratePos(sel.anchor);
        sel.head = recalibratePos(sel.head);
        editor.setSelection(sel.anchor, sel.head);
        trimSelection();
        if (frontMarkup === "delete") {
          log("Smart Delete");
          expandSelection();
          smartDelete();
        } else if (!multiLineSel()) {
          log("single line");
          const { anchor: preSelExpAnchor, head: preSelExpHead } = expandSelection();
          applyMarkup(preSelExpAnchor, preSelExpHead, "single");
        } else if (multiLineSel() && multiLineMarkup()) {
          log("Multiline Wrap");
          wrapMultiLine();
        } else if (multiLineSel() && !multiLineMarkup()) {
          let pointerOff = startOffset();
          const lines = editor.getSelection().split("\n");
          log("lines: " + lines.length.toString());
          lines.forEach((line) => {
            console.log("");
            editor.setSelection(offToPos(pointerOff), offToPos(pointerOff + line.length));
            const { anchor: preSelExpAnchor, head: preSelExpHead } = expandSelection();
            pointerOff += line.length + 1;
            if (markupOutsideSel())
              pointerOff -= blen + alen;
            else
              pointerOff += blen + alen;
            applyMarkup(preSelExpAnchor, preSelExpHead, "multi");
          });
        }
      });
    });
  }
};
