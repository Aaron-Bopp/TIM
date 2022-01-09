/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

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

const TWEET_LINK = new RegExp(/https:\/\/(?:mobile\.)?twitter\.com\/.+\/(\d+)/);
class TwitterEmbed {
    constructor(plugin) {
        this.plugin = plugin;
    }
    canHandle(link, settings) {
        return settings.replaceTwitterLinks && TWEET_LINK.test(link);
    }
    createEmbed(link, container) {
        this._ensureTwitterLoaded();
        const tweetId = link.match(TWEET_LINK)[1];
        container.id = `TweetContainer${tweetId}`;
        const theme = this.plugin.settings.twitterTheme == "auto"
            ? this.plugin.currentTheme
            : this.plugin.settings.twitterTheme;
        window.twttr.ready(() => {
            window.twttr.widgets.createTweet(tweetId, container, {
                theme,
                dnt: true,
            });
        });
        return container;
    }
    updateTheme(theme) {
        if (this.plugin.settings.twitterTheme !== "auto") {
            return;
        }
        const twitterEmbeds = document.querySelectorAll(".embed-container .twitter-tweet.twitter-tweet-rendered iframe");
        twitterEmbeds.forEach((embed) => {
            let src = embed.src;
            if (theme === "dark") {
                src = src.replace("theme=light", "theme=dark");
            }
            else {
                src = src.replace("theme=dark", "theme=light");
            }
            embed.src = src;
        });
    }
    _ensureTwitterLoaded() {
        window.twttr = (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
            if (d.getElementById(id))
                return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);
            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };
            return t;
        })(document, "script", "twitter-wjs");
    }
}

const YOUTUBE_LINK = new RegExp(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/|be\.com\/embed\/)(?<id>[\w\-\_]*)((?:\?|&)(?:t|start)=(?<startTime>(?:\d+h)?(?:\d+m)?\d+s|\d+))?/);
class YouTubeEmbed {
    canHandle(link, settings) {
        return settings.replaceYouTubeLinks && YOUTUBE_LINK.test(link);
    }
    createEmbed(link, container) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("video-wrapper");
        const iframe = document.createElement("iframe");
        const matches = link.match(YOUTUBE_LINK);
        const videoId = matches.groups.id;
        const startTime = this._normalizeStartTime(matches.groups.startTime);
        let src = `https://www.youtube.com/embed/${videoId}`;
        if (startTime) {
            src = `${src}?start=${startTime}`;
        }
        iframe.src = src;
        iframe.title = "YouTube video player";
        iframe.setAttribute("frameborder", "0");
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;";
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation allow-popups");
        wrapper.appendChild(iframe);
        container.appendChild(wrapper);
        return container;
    }
    _normalizeStartTime(startTime) {
        var _a, _b, _c;
        if (!startTime) {
            return;
        }
        if (!isNaN(Number(startTime))) {
            return startTime;
        }
        const matches = startTime.match(/(?<hours>\d+h)?(?<minutes>\d+m)?(?<seconds>\d+s)/);
        const hoursInSeconds = parseInt((_a = matches.groups.hours) !== null && _a !== void 0 ? _a : "0") * 60 * 60;
        const minutesInSeconds = parseInt((_b = matches.groups.minutes) !== null && _b !== void 0 ? _b : "0") * 60;
        const seconds = parseInt((_c = matches.groups.seconds) !== null && _c !== void 0 ? _c : "0");
        return `${hoursInSeconds + minutesInSeconds + seconds}`;
    }
}

const INSTAGRAM_LINK = new RegExp(/https:\/\/www\.instagram\.com\/(?:p|tv|reel)\/(\w+)/);
class InstagramEmbed {
    canHandle(link, settings) {
        return settings.replaceInstagramLinks && INSTAGRAM_LINK.test(link);
    }
    createEmbed(link, container) {
        this._ensureInstagramLoaded();
        const blockquote = document.createElement("blockquote");
        blockquote.classList.add("instagram-media");
        blockquote.dataset["instgrmCaptioned"] = "";
        blockquote.dataset["instgrmPermalink"] = link;
        blockquote.dataset["instgrmVersion"] = "13";
        container.appendChild(blockquote);
        container.classList.add("instagram");
        return container;
    }
    afterAllEmbeds() {
        setTimeout(() => {
            var _a;
            (_a = window.instgrm) === null || _a === void 0 ? void 0 : _a.Embeds.process();
        });
    }
    _ensureInstagramLoaded() {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id))
                return;
            js = d.createElement(s);
            js.id = id;
            js.src = "http://www.instagram.com/embed.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "instagram-wjs");
    }
}

const FLAT_IO_LINK = new RegExp(/https:\/\/flat\.io\/(?:score|embed)\/.*/);
class FlatIOEmbed {
    canHandle(link, settings) {
        return settings.replaceFlatIOLinks && FLAT_IO_LINK.test(link);
    }
    createEmbed(link, container) {
        const iframe = document.createElement("iframe");
        iframe.src = link.replace("/score/", "/embed/");
        iframe.setAttribute("frameborder", "0");
        iframe.allow = "fullscreen";
        container.appendChild(iframe);
        container.classList.add("flat_io");
        return container;
    }
}

const NOTEFLIGHT_LINK = new RegExp(/https:\/\/(?:www\.)?noteflight\.com\/(?:(?:scores\/view)|embed)\/.*/g);
class NoteflightEmbed {
    canHandle(link, settings) {
        return settings.replaceNoteflightLinks && NOTEFLIGHT_LINK.test(link);
    }
    createEmbed(link, container) {
        console.log("creating embed for", link);
        const iframe = document.createElement("iframe");
        iframe.src = link.replace("/scores/view/", "/embed/");
        iframe.setAttribute("frameborder", "0");
        iframe.allow = "fullscreen";
        container.appendChild(iframe);
        container.classList.add("noteflight");
        return container;
    }
}

const DEFAULT_SETTINGS = {
    replaceTwitterLinks: true,
    replaceYouTubeLinks: true,
    replaceInstagramLinks: true,
    replaceFlatIOLinks: true,
    replaceNoteflightLinks: true,
    twitterTheme: "auto",
    keepLinksInPreview: false,
    embedPlacement: "above",
    disableAutomaticEmbeds: false,
};

class SimpleEmbedsPlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.embedSources = [
            new TwitterEmbed(this),
            new YouTubeEmbed(),
            new InstagramEmbed(),
            new FlatIOEmbed(),
            new NoteflightEmbed(),
        ];
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Loading ${this.manifest.name} v${this.manifest.version}`);
            yield this.loadSettings();
            this.addSettingTab(new SimpleEmbedPluginSettingTab(this.app, this));
            this.currentTheme = this._getCurrentTheme();
            this.processedMarkdown = obsidian.debounce(() => {
                this.embedSources.forEach((source) => {
                    var _a;
                    (_a = source.afterAllEmbeds) === null || _a === void 0 ? void 0 : _a.call(source);
                });
            }, 100);
            this.registerMarkdownPostProcessor((el, ctx) => {
                const anchors = el.querySelectorAll("a.external-link");
                anchors.forEach((anchor) => {
                    this._handleAnchor(anchor);
                });
                this.processedMarkdown();
            });
            this.registerEvent(this.app.workspace.on("css-change", () => {
                // Theme has potentially changed.
                const previousTheme = this.currentTheme;
                this.currentTheme = this._getCurrentTheme();
                if (previousTheme !== this.currentTheme) {
                    this.embedSources[0].updateTheme(this.currentTheme);
                }
            }));
        });
    }
    onunload() {
        console.log(`Unloading ${this.manifest.name}`);
        this.processedMarkdown = null;
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
            const view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
            (_a = view === null || view === void 0 ? void 0 : view.previewMode) === null || _a === void 0 ? void 0 : _a.rerender(true);
        });
    }
    _getCurrentTheme() {
        return document.body.classList.contains("theme-dark") ? "dark" : "light";
    }
    _handleAnchor(a) {
        const isWithinText = Array.from(a.parentElement.childNodes)
            .filter((node) => {
            return node instanceof Text;
        })
            .some((text) => {
            const nbsp = new RegExp(String.fromCharCode(160), "g");
            const data = text.data.replace(nbsp, "").trim();
            return !!data;
        });
        const disableAutomaticEmbeds = this.settings.disableAutomaticEmbeds;
        const replaceWithEmbed = disableAutomaticEmbeds
            ? a.innerText.endsWith("|embed")
            : !a.innerText.endsWith("|noembed");
        a.innerHTML = a.innerHTML.replace("|noembed", "").replace("|embed", "");
        if (isWithinText && !disableAutomaticEmbeds) {
            return;
        }
        const href = a.getAttribute("href");
        const container = document.createElement("div");
        container.classList.add("embed-container");
        let embedSource = this.embedSources.find((source) => {
            return source.canHandle(href, this.settings);
        });
        if (embedSource && replaceWithEmbed) {
            const embed = embedSource.createEmbed(href, container);
            this._insertEmbed(a, embed);
        }
    }
    _insertEmbed(a, container) {
        const parent = a.parentElement;
        const keepLinksInPreview = this.settings.keepLinksInPreview;
        const placement = this.settings.embedPlacement;
        if (keepLinksInPreview && placement === "above") {
            parent.insertBefore(container, a);
        }
        else if (keepLinksInPreview && placement === "below") {
            container.insertAfter(a);
        }
        else {
            parent.replaceChild(container, a);
        }
    }
}
class SimpleEmbedPluginSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h3", { text: "Available Embed Sources" });
        containerEl.createEl("p", {
            cls: "setting-item-description",
        }, (el) => {
            el.innerHTML =
                "Disable to prevent <em>all</em> links from source ever being turned into embeds. To disable an individual link, add <code>|noembed</code> to the link text. For example, <code>[Some description|noembed](https://twitter.com/user/status/123)</code>";
        });
        new obsidian.Setting(containerEl).setName("Twitter").addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.replaceTwitterLinks)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.replaceTwitterLinks = value;
                yield this.plugin.saveSettings();
                twitterTheme.setDisabled(!this.plugin.settings.replaceTwitterLinks);
            }));
        });
        new obsidian.Setting(containerEl).setName("YouTube").addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.replaceYouTubeLinks)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.replaceYouTubeLinks = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl).setName("Instagram").addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.replaceInstagramLinks)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.replaceInstagramLinks = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl).setName("Flat.io").addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.replaceFlatIOLinks)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.replaceFlatIOLinks = value;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl).setName("Noteflight").addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.replaceNoteflightLinks)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.replaceNoteflightLinks = value;
                yield this.plugin.saveSettings();
            }));
        });
        containerEl.createEl("h3", { text: "Appearance" });
        const twitterTheme = new obsidian.Setting(containerEl)
            .setName("Twitter theme")
            .addDropdown((dropdown) => {
            dropdown.addOptions({ auto: "Automatic", dark: "Dark", light: "Light" })
                .setValue(this.plugin.settings.twitterTheme)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.twitterTheme = value;
                yield this.plugin.saveSettings();
            }));
        })
            .setDisabled(!this.plugin.settings.replaceTwitterLinks);
        containerEl.createEl("h3", { text: "Advanced Settings" });
        new obsidian.Setting(containerEl)
            .setName("Keep links in preview")
            .setDesc("Insert embeds above the link, instead of replacing the link in the preview.")
            .addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.keepLinksInPreview)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.keepLinksInPreview = value;
                yield this.plugin.saveSettings();
                placement.setDisabled(!this.plugin.settings.keepLinksInPreview);
            }));
        });
        const placement = new obsidian.Setting(containerEl)
            .setName("Place embeds")
            .setDesc('When "Keep links in preview" is enabled, choose whether to place the embed above or below the link.')
            .addDropdown((dropdown) => {
            dropdown
                .addOptions({ above: "Above link", below: "Below link" })
                .setValue(this.plugin.settings.embedPlacement)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.embedPlacement = value;
                yield this.plugin.saveSettings();
            }));
        })
            .setDisabled(!this.plugin.settings.keepLinksInPreview);
        const fragment = new DocumentFragment();
        const div = fragment.createEl("div");
        const span = fragment.createEl("span");
        span.innerHTML =
            "Instead of automatically embedding all matching links, you must add <code>|embed</code> to the link text of each link you would like to turn into an embed. For example, <code>[Some description|embed](https://twitter.com/user/status/123)</code>";
        div.appendChild(span);
        fragment.appendChild(div);
        new obsidian.Setting(containerEl)
            .setName("Disable automatic embeds")
            .setDesc(fragment)
            .addToggle((toggle) => {
            toggle
                .setValue(this.plugin.settings.disableAutomaticEmbeds)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.disableAutomaticEmbeds = value;
                yield this.plugin.saveSettings();
            }));
        });
    }
}

module.exports = SimpleEmbedsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImVtYmVkcy90d2l0dGVyLnRzIiwiZW1iZWRzL3lvdXR1YmUudHMiLCJlbWJlZHMvaW5zdGFncmFtLnRzIiwiZW1iZWRzL2ZsYXRfaW8udHMiLCJlbWJlZHMvbm90ZWZsaWdodC50cyIsInNldHRpbmdzLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiUGx1Z2luIiwiZGVib3VuY2UiLCJNYXJrZG93blZpZXciLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVEQTtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFB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
