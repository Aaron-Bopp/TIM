---
created: 2022-03-22T10:13:06 
aliases:
  - organizational note
tags: created/2022/03/22, node/topic/term
sr-due: 2022-04-28
sr-interval: 4
sr-ease: 236
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

##### <s class="topic-title">[[organizational notes]]</s>

In [[note writing]], notes that are used to organize other notes or information, i.e [[index note]], [[structural notes]], [[topic notes]]


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

#### Discussion
> ![[10_Sources/articles - A Tale of Complexity – Structural Layers in Note Taking • Zettelkasten Method#^305244870]]

> ![[10_Sources/articles - A Tale of Complexity – Structural Layers in Note Taking • Zettelkasten Method#^305244871]]