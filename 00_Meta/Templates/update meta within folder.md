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