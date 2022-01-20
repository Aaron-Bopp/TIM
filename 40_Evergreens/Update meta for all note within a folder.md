---
created: 2022-01-19T18:41:19 
edited: 
aliases:
  - null
tags: created/evergreen/2022/01/19, review, node/evergreen/technique 
sr-due: 2022-01-21
sr-interval: 2
sr-ease: 230
---

#### [[Update meta for all note within a folder]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

 **Add/Update Meta in all notes within a folder** **note: only works with folders in vault root. It won't find a nested folder**

 source:: [Discord](https://discord.com/channels/686053708261228577/840286238928797736/925459204884549713)

```js
<%*
const {update} = app.plugins.plugins["metaedit"].api
const root = app.vault.getRoot()
const folders = root.children.filter(child => child.children)
const selectedFolder = await tp.system.suggester(e => e.name, folders, false, "Choose a Folder")
const metaKey = await tp.system.prompt("What Meta Key?")
const metaValue = await tp.system.prompt("Meta Value")
if (selectedFolder.children) {
selectedFolder.children.forEach(async (child) => {
    const {frontmatter} = app.metadataCache.getCache(child.path)
    const content = await app.vault.read(child)
    if (frontmatter) {
        if (Object.keys(frontmatter).includes(metaKey)) {
            update(metaKey, metaValue, child)
        } else {
            const contentArray = content.split("\n")
            contentArray.splice(1, 0, `${metaKey}: ${metaValue}`)
            await app.vault.modify(child, contentArray.join("\n"))
        }
    } else {
        const updatedContent = `---\n${metaKey}: ${metaValue}\n---`.concat(content)
        await app.vault.modify(child, updatedContent)
    }
})
} else {
new Notice("No Notes in Selected Folder")
}
%>
```


### <hr class="footnote"/>

**Status**:: #EVER/SEED 
*edited January 19, 2022*

**Topics**:: [[programming]], [[Obsidian (software)|Obsidian]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*


