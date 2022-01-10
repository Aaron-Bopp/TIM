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

