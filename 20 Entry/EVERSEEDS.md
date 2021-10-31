---
created: 2021-07-05
note-type:
- organizational-note
- dataview
---
`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```dataviewjs
console.log(dv.current().file.mtime)
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
["/UNPLANTED", "/WATER", ""].forEach(t => table("#EVER/SEED" + t))

dv_funcs.sortableColumns()
```