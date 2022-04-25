---
created: 2021-12-21 
aliases:
  - null
tags: created/2021/12/21, node/topic/term
sr-due: 2022-04-28
sr-interval: 4
sr-ease: 234
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[referential notes]]</s>

Notes that follow the sequence of what they are referencing, i.e. a lecture, book, video, etc.
This would include journaling (referencing your personal experience) and observation (referencing the general experience).

**See**:: [[note writing]], [[knowledge work]], [[learning]]
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