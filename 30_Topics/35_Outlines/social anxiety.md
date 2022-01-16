---
created: 2021-06-25
tags: created/topic/2021/06/25, node/topic/outline
date modified: Monday, October 4th 2021, 12:40:55 am
---
`$=customJS.dv_funcs.mentionedIn(dv)`

 A chronic [[mental health]] condition in which social interactions cause irrational [[anxiety]].

**See**:: [[anxiety]], [[mental health]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

%% DO NOT EDIT BELOW %%
#### Related 
```dataview
LIST FROM [[#]]
WHERE contains(topics, this.file.link)
```
%% DO NOT EDIT ABOVE %%
##### [[social anxiety]] `$=customJS.dv_funcs.topicOutlineHeader(dv, this)`

- Symptoms
	- lack of [[self-worth]]
	- Acutely aware of [[social discomfort]]
		- [[Anxiety should be a tool at your disposal not an impedance to your life]]
- Causes ^ee8035
	- [[Insecure material conditions increase cognitive load and reduce outcomes]]
		- [[Your anxiety knows your insecurities better than you do]]
	- [[childhood trauma]] can create a person predisposed to social [[anxiety]]
		- [[It's always worth it to work through trauma]]
- Comorbid
	- General [[anxiety]]
	- worsened by [[30_Topics/31_Stubs/OCD]]
	- [[depression]]


### <hr class="dataviews"/>

`$=customJS.dv_funcs.topicNoteDataviews({dv, that:this})`

```dataview
TABLE 
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	Status, 
	file.mtime as Edited, 
	file.ctime as Created
from [[social anxiety]]
where !contains(this.file.outlinks, link(file.name))
```
