---
created: 2021-07-05
parent: [[Dataview]]
note-type:
- organizational-note
---
`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```dataviewjs
const {dv_funcs} = customJS
const pages = dv.pages()
const table = (tag) => {
	dv_funcs.defaultTable({
		dv,
		that:this,
		pagesArray:pages,
		whereCheck: (p => p.status === tag),
		title: tag
	})
}
["/WATER", "/CULTIVATE", ""].forEach(t => table("#EVER/SPROUT" + t))
```
```dataviewjs
console.log(document.querySe)
```
