---
created: 2021-05-22
cssclass: evergreen
tags: evergreen

---

#### [[organizational notes]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`


An organizational note is one that helps the user access other notes. This can take the form of a hierarchical outline, or as a temporary tag that can be used to comeback to points in other notes and should be temporary. 

The [[purpose]] of organizational notes is two-fold: to provide form to the knowledge stored in a [[knowledge management | pkm system]] and to provide entry points into the [[web of thought]]. 

Organizational notes should be consistent and unique from other notes. Some methods could be a unique symbol, a unique type style, or a builtin method like tags. 

Examples of organizational notes:
```dataview
TABLE file.mtime as Edited, file.ctime as Created
from ""
SORT file.ctime DESC
WHERE contains(note-type, "organizational-note")
```


---

**Status**:: #EVER/SPROUT 
*edited `=this.file.mtime`*

**Topics**:: [[Make your inbox into an entry point]], [[knowledge management]], [[My Second Brain]], [[Zettlekassen]] 
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

