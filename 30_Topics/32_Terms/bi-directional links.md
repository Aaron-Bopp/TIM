---
created: 2021-11-10 
aliases:
  - null
tags: created/2021/11/10, node/topic/term
sr-due: 2022-04-23
sr-interval: 4
sr-ease: 222
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[bi-directional links]]</s>

Usually refering to [[wikilinks]] in a system like [[Obsidian (software)|Obsidian]] or [[Roam Research (software)|Roam]] a bi-directional link is just like a normal [[hyperlink]] on the web, except that when this link is created it can be accessed from the place it is linking to through a backlinks section. This kind of linking system is usually associated with a [[knowledge graph]] that shows these connections.

**See**:: [[web of thought]], [[second brain]]
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