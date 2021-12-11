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

const COLLAPSE_ALL_ICON = '<svg viewBox="0 0 100 100" class="double-up-arrow-glyph" width="18" height="18"><path fill="currentColor" stroke="currentColor" d="M49.9,16.7c-0.9,0-1.7,0.4-2.3,1L14.3,51c-0.9,0.8-1.2,2.1-0.9,3.2c0.3,1.2,1.2,2.1,2.4,2.4s2.4,0,3.2-0.9l31-31l31,31 c0.8,0.9,2.1,1.2,3.2,0.9c1.2-0.3,2.1-1.2,2.4-2.4s0-2.4-0.9-3.2L52.4,17.6C51.7,17,50.8,16.7,49.9,16.7L49.9,16.7z M49.9,40 c-0.9,0-1.7,0.4-2.3,1L14.3,74.3c-0.9,0.8-1.2,2.1-0.9,3.2c0.3,1.2,1.2,2.1,2.4,2.4s2.4,0,3.2-0.9l31-31l31,31 c0.8,0.9,2.1,1.2,3.2,0.9c1.2-0.3,2.1-1.2,2.4-2.4c0.3-1.2,0-2.4-0.9-3.2L52.4,41C51.7,40.3,50.8,40,49.9,40L49.9,40z"></path></svg>';
const EXPAND_ALL_ICON = '<svg viewBox="0 0 100 100" class="double-down-arrow-glyph" width="18" height="18"><path fill="currentColor" stroke="currentColor" d="M83.3,20c-0.9,0-1.7,0.4-2.3,1L50,52L19,21c-0.6-0.6-1.5-1-2.4-1c-1.4,0-2.6,0.8-3.1,2.1c-0.5,1.3-0.2,2.7,0.8,3.6 L47.6,59c1.3,1.3,3.4,1.3,4.7,0l33.3-33.3c1-1,1.3-2.4,0.8-3.7C85.9,20.7,84.7,19.9,83.3,20z M83.3,43.3c-0.9,0-1.7,0.4-2.3,1 l-31,31l-31-31c-0.6-0.6-1.5-1-2.4-1c-1.4,0-2.6,0.8-3.1,2.1s-0.2,2.7,0.8,3.6l33.3,33.3c1.3,1.3,3.4,1.3,4.7,0L85.7,49 c1-1,1.3-2.4,0.8-3.7C85.9,44.1,84.7,43.3,83.3,43.3L83.3,43.3z"></path></svg>';

class CollapseAllPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize
            this.app.workspace.onLayoutReady(() => {
                const explorers = this.getExplorers();
                explorers.forEach((exp) => {
                    this.addCollapseButton(exp);
                });
            });
            // File explorers that get opened later on
            this.registerEvent(this.app.workspace.on('layout-change', () => {
                const explorers = this.getExplorers();
                explorers.forEach((exp) => {
                    this.addCollapseButton(exp);
                });
            }));
            // Update icon when files are opened
            this.registerEvent(this.app.workspace.on('file-open', () => {
                const explorers = this.getExplorers();
                explorers.forEach((exp) => {
                    this.updateButtonIcon(exp);
                });
            }));
            // Add collapse command to palette
            this.addCommand({
                id: 'collapse-all-collapse',
                name: 'Collapse all open folders in all file explorers',
                icon: 'double-up-arrow-glyph',
                callback: () => {
                    const explorers = this.getExplorers();
                    if (explorers) {
                        explorers.forEach((exp) => {
                            this.collapseAll(exp);
                        });
                    }
                }
            });
            // Add expand command to palette
            this.addCommand({
                id: 'collapse-all-expand',
                name: 'Expand closed folders in all file explorers',
                icon: 'double-down-arrow-glyph',
                callback: () => {
                    const explorers = this.getExplorers();
                    if (explorers) {
                        explorers.forEach((exp) => {
                            this.expandAll(exp);
                        });
                    }
                }
            });
        });
    }
    onunload() {
        // Remove all collapse buttons
        const explorers = this.getExplorers();
        explorers.forEach((exp) => {
            this.removeCollapseButton(exp);
        });
    }
    /**
     * Adds the collapse button to a file explorer leaf.
     * Returns the newly created button element or the old one if already there.
     */
    addCollapseButton(explorer) {
        const container = explorer.view.containerEl;
        const navContainer = container.querySelector('div.nav-buttons-container');
        if (!navContainer) {
            return null;
        }
        const existingButton = this.getCollapseButton(explorer);
        if (existingButton) {
            return;
        }
        const newIcon = document.createElement('div');
        this.updateButtonIcon(explorer, newIcon);
        newIcon.className = 'nav-action-button collapse-all-plugin-button';
        this.registerDomEvent(newIcon, 'click', () => {
            this.onButtonClick(explorer);
        });
        navContainer.appendChild(newIcon);
        // Register click handler on explorer to toggle button icon
        const handler = () => {
            this.updateButtonIcon(explorer, newIcon);
        };
        if (this.isFileExplorer(explorer)) {
            explorer.view.containerEl.on('click', '.nav-folder-title', handler);
            this.register(() => {
                explorer.view.containerEl.off('click', '.nav-folder-title', handler);
            });
        }
        else {
            explorer.view.containerEl.on('click', '.tag-pane-tag', handler);
            this.register(() => {
                explorer.view.containerEl.off('click', '.tag-pane-tag', handler);
            });
        }
    }
    isFileExplorer(explorer) {
        return explorer.view.getViewType() === 'file-explorer';
    }
    /**
     * Remove the collapse button from a given file explorer leaf.
     */
    removeCollapseButton(explorer) {
        const button = this.getCollapseButton(explorer);
        if (button) {
            button.remove();
        }
    }
    /**
     * Collapses or expands all folders in the given file explorer
     */
    onButtonClick(explorer) {
        if (explorer) {
            const allCollapsed = this.isFileExplorer(explorer)
                ? this.foldersAreCollapsed(this.getExplorerItems(explorer))
                : this.tagsAreCollapsed(this.getTagItems(explorer));
            if (allCollapsed) {
                this.expandAll(explorer);
            }
            else {
                this.collapseAll(explorer);
            }
        }
    }
    /**
     * Collapse all open folders in the given file explorer
     */
    collapseAll(explorer) {
        this.collapseOrExpandAll(explorer, true);
        this.updateButtonIcon(explorer, undefined, true);
    }
    /**
     * Expand all collapsed folders in the given file explorer
     */
    expandAll(explorer) {
        this.collapseOrExpandAll(explorer, false);
        this.updateButtonIcon(explorer, undefined, false);
    }
    /**
     * Collapse or expand all folders for the given file explorer
     */
    collapseOrExpandAll(explorer, collapsed) {
        if (explorer) {
            if (this.isFileExplorer(explorer)) {
                const items = this.getExplorerItems(explorer);
                items.forEach((item) => {
                    if (this.explorerItemIsFolder(item) && item.collapsed !== collapsed) {
                        item.setCollapsed(collapsed);
                    }
                });
            }
            else {
                const items = this.getTagItems(explorer);
                items.forEach((item) => {
                    if (item.children.length > 0 && item.collapsed !== collapsed) {
                        item.setCollapsed(collapsed);
                    }
                });
            }
        }
    }
    /**
     * Update icon for given explorer/button to collapse/expand all.
     * Providing the forceAllCollapsed parameter will skip checking and assume that state
     */
    updateButtonIcon(explorer, button, forceAllCollapsed) {
        if (!button) {
            button = this.getCollapseButton(explorer);
        }
        if (button && forceAllCollapsed === undefined) {
            const allCollapsed = this.isFileExplorer(explorer)
                ? this.foldersAreCollapsed(this.getExplorerItems(explorer))
                : this.tagsAreCollapsed(this.getTagItems(explorer));
            button.innerHTML = allCollapsed ? EXPAND_ALL_ICON : COLLAPSE_ALL_ICON;
            button.setAttribute('aria-label', allCollapsed ? 'Expand all' : 'Collapse all');
        }
        else if (button) {
            button.innerHTML = forceAllCollapsed
                ? EXPAND_ALL_ICON
                : COLLAPSE_ALL_ICON;
            button.setAttribute('aria-label', forceAllCollapsed ? 'Expand all' : 'Collapse all');
        }
    }
    /**
     * Returns all loaded tag leaves
     */
    getExplorers() {
        return this.getFileExplorers().concat(this.getTagExplorers());
    }
    /**
     * Returns all loaded file explorer leaves
     */
    getFileExplorers() {
        return this.app.workspace.getLeavesOfType('file-explorer');
    }
    /**
     * Returns all loaded tag leaves
     */
    getTagExplorers() {
        return this.app.workspace.getLeavesOfType('tag');
    }
    /**
     * Get the collapse button for a given file explorer, if it exists
     */
    getCollapseButton(explorer) {
        return explorer.view.containerEl.querySelector('.collapse-all-plugin-button');
    }
    /**
     * Get all `fileItems` on explorer view. This property is not documented.
     */
    getExplorerItems(explorer) {
        return Object.values(explorer.view.fileItems);
    }
    /**
     * Ensures given explorer item is a folder and not the root or a note
     */
    explorerItemIsFolder(item) {
        return (item.file instanceof obsidian.TFolder &&
            item.file.path !== '/' &&
            item.collapsed !== undefined);
    }
    /**
     * Returns true if every folder in the given items (files and folders) is collapsed
     */
    foldersAreCollapsed(items) {
        return items.every((i) => !this.explorerItemIsFolder(i) || i.collapsed === true);
    }
    /**
     * Get all `tagItems` from tag view. This property is not documented.
     */
    getTagItems(explorer) {
        return Object.values(explorer.view.tagDoms);
    }
    /**
     * Returns true if every folder in the given items (files and folders) is collapsed
     */
    tagsAreCollapsed(items) {
        return items.every((i) => i.children.length === 0 || i.collapsed === true);
    }
}

module.exports = CollapseAllPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9jb25zdGFudHMudHMiLCJzcmMvcGx1Z2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJQbHVnaW4iLCJURm9sZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxR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
