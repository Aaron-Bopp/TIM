```dataview
table replace(file.path, file.name + ".md", "") as Folder, striptime(file.mtime) as Modified
from ""
sort file.mtime desc
where file.mday > date(now) - dur(7 days)
```