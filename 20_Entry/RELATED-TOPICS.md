---
created: 2021-07-05
note-type:
- organizational-note
---
`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`

```dataview
table related-topics, sub-topics
from ""
where related-topics != null
```