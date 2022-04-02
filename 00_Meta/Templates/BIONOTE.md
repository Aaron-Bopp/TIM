<% tp.file.include("[[META]]") %> created/<% tp.date.now("YYYY/MM/DD") %>, node/topic/person
---
`$=customJS.dv_funcs.mentionedIn(dv)`

##### <s class="topic-title">[[BIONOTE]]</s>


```dataview
TABLE 
	length(file.inlinks) as In, 
	length(file.outlinks) as Out
from [[<% tp.file.title %>]]
```
