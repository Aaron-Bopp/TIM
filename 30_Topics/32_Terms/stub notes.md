---
created: 2021-11-07
aliases:
  - stub note
tags: created/2021/11/07, node/topic/term
sr-due: 2022-04-29
sr-interval: 5
sr-ease: 236
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[stub notes]]</s>

In:: [[web of thought|webs of thought]] and [[networked thinking]],
stub notes are [[Topic notes]] that do not have and content and are there to easily access their metadata (backlinks, graph positioning).

> Systems which display backlinks to a node permit a new behavior: you can define a new node extensionally (rather than intentionally) by simply linking to it from many other nodes—even before it has any content.
^[[Backlinks can be used to implicitly define nodes in knowledge management systems](https://notes.andymatuschak.org/z2newCwFfd6iZFyf9bgspkbyt1G8wbQxJVgTK)]
> 
> <cite>[[Andy Matuschak's Evergreen Notes]]</cite>

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
