---
created: 2021-07-05
note-type:
- organizational-note

---
```dataview
table replace(file.path, file.name + ".md", "") as Folder, striptime(file.ctime) as Created
from ""
sort file.ctime desc
where file.cday > date(now) - dur(7 days)
```