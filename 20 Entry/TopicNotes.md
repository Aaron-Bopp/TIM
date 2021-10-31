---
date modified: Thursday, September 30th 2021, 9:39:19 am
---
`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```ActivityHistory
SecondBrain/TopicNotes
```

# TopicNotes Overview

```dataviewjs
const {dv_funcs} = customJS
const pages = dv.pages().where(p => p.file.path.contains('TopicNotes') && p.file.name !== 'TopicNotes')
let lastEdited = false
dv_funcs.defaultTable({
	dv,
	that:this,
	lastEdited,
	pagesArray:pages,
	whereCheck: (p => dv_funcs.getNotesInOutline(p.file.name, dv, this).length > 1 ),
	title: 'Growing Topics'
})
dv_funcs.defaultTable({
	dv,
	that:this,
	lastEdited,
	pagesArray:pages,
	whereCheck: (p => dv_funcs.getNotesInOutline(p.file.name, dv, this).length <= 1 ),
	title: 'Topic Seeds'
})
dv_funcs.sortableColumns()
```

