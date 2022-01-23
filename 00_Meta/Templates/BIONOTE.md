<% tp.file.include("[[META]]") %> created/topic/<% tp.date.now("YYYY/MM/DD") %>, node/topic/person
---
`$=customJS.dv_funcs.mentionedIn(dv)`
<% tp.file.include("[[TITLE-TOPIC]]") %>



```dataview
TABLE 
	length(file.inlinks) as In, 
	length(file.outlinks) as Out
from [[<% tp.file.title %>]]
```
