---
created: 2021-09-27
cssclass: evergreen
tags: evergreen
aliases:
- 
sr-due: 2021-11-03
sr-interval: 11
sr-ease: 250
---
#### [[Using github with Unity projects]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

1. Use [[Githubs]] [existing unity gitgnore](https://github.com/github/gitignore/blob/master/Unity.gitignore) and setup your repo like normal
	1. [alternate](https://gist.github.com/FullStackForger/20bbf62861394b1a3de0#file-gitignore)
2. In Unity
	1. Edit -> Project Settings -> Editor =>
		1. Version control = Visible Meta Files
		2. Asset Serialization = Force text
3. Githubs unity.gitignore assumes it is at the root of the directory. If your project is in a subfolder, makes sure the correct folders are ignored

### <hr class="footnote"/>

**Status**:: #EVER/SPROUT
*edited `=this.file.mtime`*

**Topics**:: [[Unity (game engine)]], [[Software Development]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
