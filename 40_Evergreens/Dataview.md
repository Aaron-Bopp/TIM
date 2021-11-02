---
created: 2021-05-29

tags: node/topic, node/tool
---

[[dataview]] is an plugin for [[obsidian (software)]] that allows for [[sql]] like queries over the notes in your obsidian vault.

**Topics**:: [[INDEX]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*


source code:: https://github.com/blacksmithgu/obsidian-dataview
documentation:: https://blacksmithgu.github.io/obsidian-dataview/
snippets:: https://forum.obsidian.md/t/dataviewjs-snippet-showcase/17847/2, https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673, https://forum.obsidian.md/t/dataview-plugin-snippet-showcase/13673/104

[Tag Context - Obsidian Publish](https://publish.obsidian.md/napkinium/Ideas/Dataview/Tag+Context)
 
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

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT 
*edited `=this.file.mtime`*

**Topics**:: [[SQL]], [[data querrying]], 
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

