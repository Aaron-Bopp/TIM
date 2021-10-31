---
created: 2021-05-29
cssclass: topic
tags: topic, topic/tool
---


**Topics**:: [[INDEX]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

[[dataview]] is an plugin for [[obsidian (software)]] that allows for [[sql]] like queries over the notes in your obsidian vault.

source code:: https://github.com/blacksmithgu/obsidian-dataview
documentation:: https://blacksmithgu.github.io/obsidian-dataview/
snippets:: https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847/2, https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673, https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673/104


- inline query
	- can be used to perform expressions inline with `"= <expression>"`
		- today's date: **`= date(today)`** 
		- [[dataview]]'s note types: *`= [[dataview]].note-type`*
	- some don't work outside of a dataview block
		- `= [[dataview]].mtime`
		- `= [[dataview]].tags`
- expressions
	- anything that yields a value
- fields
	- [[dataview]] simplifies fields defined in line to lower-case-no-special-characters
- functions
	- `replace([string], replaced, inserted)`

# queries

### basic syntax
```
table|list|task <field> [as "column name"], <field>, ..., <field> from<source> (like [[tag]] or "folder")`
where <expression> (like 'field = value')
sort <expression> [asc/desc] (like 'field asc')
... other data commands
```
### from tags
```dataviewx
table  file.tags as tags, file.mtime as "last modified" from #to
flatten file.tags
```

### [tasks that are overdue](https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847/23)
```dataviewjs
function overdue(t) {
  let dvalidate = moment(t.text, 'yyyy-mm-dd', true);
  let d = moment(t.text, 'yyyy-mm-dd');
  let containsvaliddate = dvalidate._pf.unusedtokens.length==0 ;
  let isoverdue = d.diff(moment()) <= 0;
  return (containsvaliddate && isoverdue);
}

dv.tasklist(dv.pages("").file.tasks
	.where (t => overdue(t))
	.where (t => !t.completed))
```
### Hierarchy
```dataviewjs
const getTotalLinks = page => {
	return Number(page.file.outlinks.length + page.file.inlinks.length) 
}
const sortedPages = (pages, size) => dv.pages(pages.where(p => getTotalLinks(p) > size).sort(page => {
	return getTotalLinks(page)
}, 'desc').map(page => {
	return page
}))
//const maxLinks = (pages) => getTotalLinks(pages.first())
for (const page of sortedPages(dv.pages(''), 8)) {
	dv.header(3, page.file.name)
	dv.list(sortedPages(page.file.inlinks, Number(getTotalLinks(page)/2)))
	dv.list(dv.array(page.file.outlinks))
}
//dv.list(dv.pages('').flatMap((page) => {
	//return sortedPages(dv.pages(page.file.outlinks), 0)

	//return [dv.header(1, page.file.name, dv.array(page.file.outlinks)]
//}))

```
### Get number notes with every note-type
```dataviewjs
const tallyTypes = () => {
	let types = {}
	const incrTypes = (type) => {
		types[type] = (types[type]+1) || 1
	}
	dv.pages().forEach((pg) => {
		let noteTypes = pg["note-type"]
		if (typeof noteTypes === "object") {
			noteTypes.forEach((type) => incrTypes(type))
		} else if (typeof noteTypes === "string") {
			noteTypes.split(" ").forEach(type => incrTypes(type)) 
		} else {
			incrTypes(String(noteTypes))
		}
	})
	return types
}
dv.paragraph(tallyTypes())
```
### testing
```
function notLinkedPages(folder) {
	return dv.pages(wrap(thisFile.file.name))
			.where(p => {
				return !allPaths.contains(p.file.path) && 
				p.file.path.contains(folder) 
			})
			.sort(p => p.file.inlinks.length + p.file.outlinks.length, 'desc')
}

function statusTable(folder, pages, includeStatus) {
	let headers = [folder, "I/O", "Edited", "Created"]
	let values = p => [p.file.link, getIO(p.file), p.file.mtime, formatDate(p["creation date"])]
	let realValues = ""
	if (includeStatus) {
		headers.splice(2, 0, "Status")
		realValues = p => values(p).splice(2, 0, p.status)
	} else {
		realValues = values
	}
	if (pages.length > 0) {
		dv.table(headers, pages

			.map(p => realValues(p)))
	}
}
const topicPages = notLinkedPages("TopicNotes")
const egPages = notLinkedPages("EvergreenNotes")
const contentPages = notLinkedPages("ContentNotes")
if (topicPages.length + egPages.length + contentPages.length !== 0) {
	dv.header(4, "Linked notes not outlined")
	statusTable("TopicNotes", topicPages, true)
	statusTable("EvergreenNotes", egPages, false)
	statusTable("ContentNotes", contentPages, false)
}
```

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT 
*edited `=this.file.mtime`*

**Topics**:: [[SQL]], [[data querrying]], 
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

