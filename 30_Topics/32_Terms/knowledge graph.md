---
created: 2021-12-06 
aliases:
  - null
tags: created/2021/12/06, node/topic/term
sr-due: 2022-04-23
sr-interval: 4
sr-ease: 226
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[knowledge graph]]</s>

A visualization of the connections between peices of [[knowledge]], usually in a system that supports [[bi-directional links]].

**See**:: [[knowledge work]], [[second brain]], [[web of thought]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

##### ^dataviews

%% DO NOT EDIT BELOW %%
> [!dataview]+ Related unlinked notes
> ```dataview
> LIST FROM [[#]]
> WHERE contains(topics, this.file.link)
> and !contains(this.file.outlinks, file.link)
> ```
 
> [!dataview]- Other unlinked mentions
> ```dataview
> LIST FROM [[#]]
> where !contains(this.file.outlinks, file.link)
> and !contains(topics, this.file.link)
> ```

%% DO NOT EDIT ABOVE %%