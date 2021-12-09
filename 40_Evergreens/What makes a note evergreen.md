---
created: 2021-11-15 
aliases:
  - null
tags: node/evergreen, node/question, 
sr-due: 2021-12-29
sr-interval: 21
sr-ease: 199
---

#### [[What makes a note evergreen]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

[[My TO(DO) and EVER(GREEN) structure]] details how I add statuses and action items to [[evergreen notes]] in [[My TIM]]. In these, I am constantly contemplating is this note evergreen? and how do I make this note more evergreen? So what does being evergreen even me to me?

In practice, this is how I assign status:
```mermaid
flowchart TB;
Q1-->|No|#EVER/SEED/UNPLANTED
Q1[Does the note have topics or backlinks?]-->|Yes|Q2[Note has a body?]
Q2-->|Yes|Q3[Do I agree with what the note is saying?]
Q2-->|No|#EVER/SEED/WATER
Q3-->|No|WORK[#EVER/**/PRUNE]
Q3-->|Yes|Q4[Is the note a complete concept?]
Q5-->|Yes|#EVER/GREEN
Q4-->|No|Q7[Is it too large or too small?]
Q4-->|Yes|Q5[Is the note used a lot? in practice or in other notes]
Q5-->|No|#EVER/SPROUT/CULTIVATE
Q6-->|Yes|WATER[#EVER/SPROUT/WATER]
Q6-->|No|STABLE[#EVER/SPROUT or #EVER/GREEN]
Q7-->|too small|Q6[Do I have more to say?]
Q7-->|too large|GRAFT[#EVER/**/GRAFT]
```

What is the inuition that drives this process? 
- [[Evergreen notes organize knowledge so that it can grow]]
- [[Conceptual notes are lexically superior to atomic notes]]
- [[Write your notes like you're planting an evergreen forest]]
- contrast
    - [[The fragility of nodes in a second brain]]
    -  [[When in doubt, write what you think]]


### <hr class="footnote"/>

**Status**:: #EVER/SPROUT/GRAFT 
*edited `=this.file.mtime`*

**Topics**:: [[evergreen notes]], [[note writing]], [[My TIM]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
