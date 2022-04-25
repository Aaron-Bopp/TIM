---
created: 2022-01-19T18:02:09 
aliases:
  - null
tags: created/2022/01/19, node/topic/term
sr-due: 2022-05-06
sr-interval: 12
sr-ease: 247
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[Backlinks]]</s>

Links that are defined by being directly linked in another source.

**See**:: [[wikilinks]], [[hyperlink]], [[contextual backlinks]]
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