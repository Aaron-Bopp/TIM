---
created: 2022-01-15T15:43:52 
aliases:
  - null
tags: created/2022/01/15, node/topic/term
sr-due: 2022-04-25
sr-interval: 6
sr-ease: 240
---
> [!infobox]
`$=customJS.dv_funcs.mentionedIn(dv)`

#### <s class="topic-title">[[wikilinks]]</s>

Links that are placed directly in prose and display the text that they link to. In [[Obsidian (software)]] these are made using `[[]]` double brackets

**See**:: [[bi-directional links]]
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