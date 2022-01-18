<% tp.file.include("[[META]]") %> created/topic/<% tp.date.now("YYYY/MM/DD") %>, node/topic/term
---
`$=customJS.dv_funcs.mentionedIn(dv)`


**See**::
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

%% DO NOT EDIT BELOW %%

#### Related 

```dataview
LIST FROM [[#]]
WHERE contains(topics, this.file.link)
```
%% DO NOT EDIT ABOVE %%
