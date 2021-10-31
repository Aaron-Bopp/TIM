---
created: 2021-07-05
parent: [[Dataview]]
cssclass: evergreen
tags: evergreen
- organizational-note
aliases:
- 
---
`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```dataviewjs
let todoTags = [
	"#TO/DO/WRITE",
	"#TO/DO/PROGRAM",
	"#TO/DO/CONCEPTUALIZE",
	"#TO/EXPLORE/READ",
	"#TO/EXPLORE/WATCH",
	"#TO/EXPLORE/RESEARCH",
	"#TO/PONDER/ME",
	"#TO/PONDER/SOCIETY"
]

function getLastEdited(page) {
	return (page);
}

for (let tag of todoTags) {
	dv.table([tag, "Last Edited", "Created"], dv.pages(tag).where( p =>
			p.file.name != "my TO(DO) and EVER(GREEN) structure"
		).map(p => [
			p.file.link,
			getLastEdited(p.file.mtime),
			p.file.ctime
		]))
}
```

