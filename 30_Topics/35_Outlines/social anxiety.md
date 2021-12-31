---
created: 2021-06-25
tags: created/topic/2021/06/25, node/topic/outline
date modified: Monday, October 4th 2021, 12:40:55 am
---
`$=customJS.dv_funcs.mentionedIn(dv)`

 A chronic [[mental health]] condition in which social interactions cause irrational [[anxiety]].
**Status**:: #EVER/SPROUT/WATER 
*edited `=this.file.mtime`*

**See**:: [[anxiety]], [[mental health]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*

##### [[social anxiety]] `$=customJS.dv_funcs.topicOutlineHeader(dv, this)`

- Symptoms
	- lack of [[self-worth]]
	- Acutely aware of [[social discomfort]]
		- [[Anxiety should be a tool at your disposal not an impedance to your life]]
- Causes ^ee8035
	- [[Insecure material conditions increase cognitive load and reduce outcomes]]
		- [[Your anxiety knows your insecurities better than you do]]
	- [[childhood trauma]] can create a person predisposed to social [[anxiety]]
		- [[There aren't any downsides to working through trauma]]
- Comorbid
	- General [[anxiety]]
	- worsened by [[OCD]]
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
