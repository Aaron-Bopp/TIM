---
created: 2021-05-29
tags: created/2021/05/29, node/topic/term
aliases:
  - evergreens
  - evergreen note
sr-due: 2022-04-13
sr-interval: 10
sr-ease: 205
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[evergreen notes]]</s>

> _Evergreen notes_ are written and organized to evolve, contribute, and accumulate over time, across projects.
^[https://notes.andymatuschak.org/Evergreen_notes]
> 
> <cite>[[Andy Matuschak]]</cite>

Evergreen notes are the fundamental unit of [[knowledge]] in [[My TIM]]. 

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