---
created: 2021-11-15 
aliases:
  - null
tags: node/evergreen, node/question, 
sr-due: 2021-12-03
sr-interval: 8
sr-ease: 199
---

#### [[What makes a note evergreen]] `$=customJS.dv_funcs.evergreenHeader(dv, this)`

[[My TO(DO) and EVER(GREEN) structure]] details how I add statuses and action items to [[evergreen notes]] in [[My TIM]]. In these I am constantly contemplating is this note evergreen? and how do I make this note more evergreen? So what does being evergreen even me to me?

- [[Evergreen notes organize knowledge so that it can grow]]
- [[Conceptual notes are lexically superior to atomic notes]]
- [[Write your notes like you're planting an evergreen forest]]
- contrast
    - [[The fragility of nodes in a second brain]]
    -  [[When in doubt, write what you think]]
- [[What is the difference between a evergreen note and a topic note]]

##### Thoughts as I process notes
- [[spaced repetition]]
    - Could I remember this note if it was relavant? 
    - Have I remembered this note recently?
    - Have I been thinking about this note recently
    - Do I want to not see this note again
- [[Use spaced repetition as weeding for your digital garden]]
- [[Use spaced repetition as a memory tool for your second brain]]
- Status
    - note has topics > unplanted
        - note has body > seed/water
            - I disagree with what this note says < sprout
            - I agree with what this note is saying >= sprout
                -  I am happy with the way I am saying it = green
                -  I don't like how I'm saying it >= sprout
                    -  this note has a lot of backlinks >= sprout
                    -  note has more backlinks than forward links = green

# How I rate notes during daily spaced repetition refv
```mermaid
flowchart TB;  
 B[Am I surprized by the note title]-->|yes|Hard;  
 B-->|no|C[Am I surprized by the note content];
 C-->|yes|Hard[Rate: Hard];
 C-->|no|D[Could I remember the note title in context so I could link it];
 D-->|No|E[Can I easily link other notes];
 E-->|No|Hard;
 E-->|Yes|G[Does the note content need work]
 D-->|Yes|G
 G-->|Thought Error|Hard;
 G-->|Syntax Errors|X[Is it appropriately tagged];
 X-->|No|Hard;
 X-->|Yes|Good;
 G-->|No|Good[Rate: Good];
 G-->|No and it's boring|Easy[Rate: Easy];

```
```mermaid
flowchart TB;  
 B-->|no|C[Am I surprized by the note content];
 C-->|no|D[Could I remember the note title in context so I could link it];
 E-->|Yes|G[Does the note content need work]
 D-->|Yes|G;
 D-->|No|E[Can I easily link other notes];
 G-->|No and it's boring|Easy[Rate: Easy];
 G-->|No|Good[Rate: Good];
 G-->|Syntax Errors|X[Is it appropriately tagged];
 X-->|Yes|Good;
 G-->|Thought Error|Hard;
 E-->|No|Hard;
 X-->|No|Hard;
 B[Am I surprized by the note title]-->|yes|Hard;  
 C-->|yes|Hard[Rate: Hard];

```
- [ ] #TO/DO/CREATE flow chart, [[Mermaid (software)]]?
 
### <hr class="footnote"/>

**Status**:: #EVER/SPROUT/WATER 
*edited `=this.file.mtime`*

**Topics**:: [[evergreen notes]], [[note writing]], [[My TIM]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
