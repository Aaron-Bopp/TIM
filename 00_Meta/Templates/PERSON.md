
<% tp.file.include("[[META]]") %> node/topic/person
---
`$=customJS.dv_funcs.mentionedIn(dv)`


```dataview
TABLE 
	length(file.inlinks) as In, 
	length(file.outlinks) as Out
from [[<% tp.file.title %>]]
```
