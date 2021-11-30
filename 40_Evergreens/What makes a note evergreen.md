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
- [[Use spaced repetition to weed your digital garden]]
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

```mermaid
flowchart TB;
Q1-->|No|#EVER/SEED/UNPLANTED
Q1[Does the note have topics or backlinks?]-->|Yes|Q2[Note has a body?]
Q2-->|No|#EVER/SEED/WATER
Q2-->|Yes|Q3[Do I agree with what the note is saying?]
Q3-->|No|WORK[#EVER/**/PRUNE + #TO/TEND tags]
Q3-->|Yes|Q4[Is the note a complete concept?]
Q4-->|Yes|Q5[Is the note used a lot? (in practice or in other notes)]
Q5-->|Yes|#EVER/GREEN
Q5-->|No|Q6
Q4-->|No|Q6[Do I have more to say?]
Q6-->|Yes|WATER[#EVER/SPROUT/WATER or #EVER/GREEN/GR]
```

- [ ] #TO/DO/CREATE flow chart, [[Mermaid (software)]]?
 
### <hr class="footnote"/>

**Status**:: #EVER/SPROUT/WATER 
*edited `=this.file.mtime`*

**Topics**:: [[evergreen notes]], [[note writing]], [[My TIM]]
*`$=customJS.dv_funcs.outlinedIn(dv, this)`*
