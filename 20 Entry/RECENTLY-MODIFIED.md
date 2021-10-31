`$=(dv.pages().where(p => p.file.path.contains("OrganizationalNotes")).map(p => dv.fileLink(p.file.path)))`
```dataview
TABLE file.mday as Modified
FROM ""
SORT file.mtime desc
LIMIT 100
```