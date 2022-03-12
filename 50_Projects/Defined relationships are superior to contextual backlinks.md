---
created: 2022-01-19T17:34:28 
edited: 
aliases:
  - null
tags: created/evergreen/2022/01/19, review, node/evergreen/claim  
sr-due: 2022-05-17
sr-interval: 69
sr-ease: 230
---

#### [[Defined relationships are superior to contextual backlinks]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

> I always say good linking means that you
> 1. place any link *manually*.
> 2. give your future self a *good* reason to follow the link 
>
>  <cite>[[articles_Backlinking Is Not Very Useful -- Often Even Harmful • Zettelkasten Method|Backlinking Is Not Very Useful by sascha]]</cite>

[[Backlinks]] can easily become diluted, and I have found this to be the case in my vault. There are multiple reasons for this. 
1. **The backlinks panel does not filter out notes that are linked to from the current note.**
The original point of contextual backlinks was to make two way links unneeded, but to write prose that actually makes sense, forward linking with defined context is important if these two concepts are related. Once the note is forward linked, the backlink is much less important. [[contextual backlinks]] was supposed to help with this, but struggles because...
1. **Links are often created without context.**
This is something that will be specific to certain kinds of notes and note takers, but for me, defining a [[evergreen notes]] usually starts with a list of related notes. I have found creating these lists a the active recall portion of [[spaced repetition]], and so I do not want to go away from this habit. Unfortunately this means that most backlinks the only content provided is a list marker, which makes the context no better than the link name
1. **Link context is often too verbose.**
I usually link contexts at the end or beginning of paragraphs, which means that in order to understand the context I need to read multiple sentences, or possibly even multiple paragraphs. I can define these relationships more simply, but not within the prose of the note

Note that these are mainly true for [[evergreen notes]] with declarative titles. For [[topic notes]], this is a much different story

How can we improve on this?
My answer is **defined relationships,** which
contrasts:: [[contextual backlinks]]

Or as it looks on my screen:
```
How can we improve on this?
My answer is **defined relationships,** which
contrasts:: [[contextual backlinks]]
```
This is how I use [[Obsidian (software)|Obsidian]] to define relationships between notes. Many will recognize the double colon, as a way to make inline fields that are recognized by various plugins. I also have the setting `Strict line breaks` off, which means when this note is rendered, all three of those lines become one. 
^[This has an added benefit for me called [[Semantic line breaks]]]

What is the goal of this? Well by formatting my notes in this way it allows me to easily parse the `contrasts` field out of my notes, so it can be used by various plugins. This accomplishes two things:
1. I can programmatically access the relationship between these two notes and use it in [[Dataview]] queries, to color [[Juggl (plugin, obsidian)|Juggl]] links, and to use in [[Python]] scripts. 
2. It pushes me to link purposefully, and to [[abstraction|abstract]] the meaning of the relationship 

##### Challenges

#TO/WRITE It is hard to craft prose in a way that works with this system. Is it worth it?

### <hr class="footnote"/>

**Status**:: #EVER/SAPLING 
*edited January 23, 2022*

**Topics**:: [[knowledge work]], [[Obsidian (software)|Obsidian]], [[knowledge management]], [[note writing]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
