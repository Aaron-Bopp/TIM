`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```ActivityHistory
40 Evergreens
```
# EvergreenNotes Overview


```dataviewjs

const {dv_funcs} = customJS
const pages = dv.pages()
let lastEdited = false
dv_funcs.defaultTable({
	dv,
	that:this,
	lastEdited,
	pagesArray:pages,
	whereCheck: (p => p.status === `#EVER/GREEN/GROWING` && p.file.name !== 'TopicNotes'),
	title: `#EVER/GREEN/GROWING`
})
dv_funcs.defaultTable({
	dv,
	that:this,
	lastEdited,
	pagesArray:pages,
	whereCheck: (p => p.status === `#EVER/GREEN/PRUNE` && p.file.name !== 'TopicNotes'),
	title: `#EVER/GREEN/PRUNE`
})
dv_funcs.defaultTable({
	dv,
	that:this,
	lastEdited,
	pagesArray:pages,
	whereCheck: (p => p.status === `#EVER/GREEN` && p.file.name !== 'TopicNotes'),
	title: `#EVER/GREEN`
})

dv_funcs.sortableColumns()
```

