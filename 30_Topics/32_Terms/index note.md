---
created: 2021-05-22
edited: 
aliases:
-
tags: created/topic/2021/05/22, node/topic/term
---
`$=customJS.dv_funcs.mentionedIn(dv)`

# <s class="topic-title">[[index note]]</s>

##### ^blurb

In:: [[note writing]],
an [[index note]] is the entry point for a [[Zettelkasten]], [[second brain]], or any other conception of a [[web of thought]]. It provides an organizational structure for a [[web of thought]], without having to constrict that web to a hierarchical structure.


##### ^dataviews

%% DO NOT EDIT BELOW %%
> [!dataview] Related unlinked mentions
> ```dataview
> LIST FROM [[#]]
> WHERE contains(topics, this.file.link)
> and !contains(this.file.outlinks, file.link)
> ```
 
> [!dataview]- All unlinked mentions
> ```dataview
> LIST FROM [[#]]
> where !contains(this.file.outlinks, file.link)
> and !contains(topics, this.file.link)
> ```

%% DO NOT EDIT ABOVE %%
