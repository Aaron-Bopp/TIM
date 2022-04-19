---
created: 2021-05-29
tags: created/2021/05/29, node/topic/term
aliases:
  - evergreens
  - evergreen note
sr-due: 2022-05-17
sr-interval: 28
sr-ease: 205
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[evergreen notes]]</s>

> _Evergreen notes_ are written and organized to evolve, contribute, and accumulate over time, across projects.
^[https://notes.andymatuschak.org/Evergreen_notes]
> 
> <cite>[[Andy Matuschak]]</cite>


Evergreen notes can be as small as a few sentences or as expansive as an entire breakdown of an idea.
If you have a concept, write it down and see what you can link to it.
Often times an imperative, descriptive title and backlinks are all a note needs to have longevity, other times you may need a sentence or two of context so that you don't forget what you were thinking.

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