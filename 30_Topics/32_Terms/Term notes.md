---
created: 2021-10-11
tags: created/2021/10/11, node/topic/term
sr-due: 2022-05-23
sr-interval: 34
sr-ease: 226
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[Term notes]]</s>

In:: [[knowledge management]] and [[note writing]],
term notes or definition notes are short informational notes about what a term means and how it is used.

In:: [[My TIM]]
term notes would be considered a distinction of [[topic notes]]

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