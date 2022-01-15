From [[my TO(DO) and EVER(GREEN) structure]]


This structure is designed to help classify what the state of an [[evergreen notes|evergreen note]] is. [^1] These are not strict and are more done by feel, but do help me decide when and how to work on a note. 

[^1]: [[Evergreen notes should be constantly integrating new knowledge]]

- **\#EVER** see all the [[evergreen notes]] in [[Obsidian (software)]]
	- Seeds essentially functions as my writing inbox. If it doesn't have a body or links it cannot store for long and needs to be looked at.
	- **\#EVER\/SEED** a seed of thought which could lie dormant or could flower quickly
		- **\#EVER\/SEED/UNPLANTED** has no links into the [[web of thought]]
		- **\#EVER\/SEED/WATER** has no body
	- Once I have gotten my initial thoughts out I like to let notes mature so I can find opportunities to link them elsewhere and  be certain they remain [[conceptual notes|conceptual]]. 
	- **\#EVER/SPROUT** a concept that has information and value, but I have no current intention of expanding
		- **\#EVER/SPROUT/WATER** I have [[source notes]] or ideas that I want to add 
		- **\#EVER/SPROUT/CULTIVATE** needs to looked at in relation to other notes, or requires citation or outside content
	- **\#EVER/GREEN** concept that holds weight, value, and [[knowledge]] in the [[second brain]]
		- **\#EVER/GREEN/GROWING** This is a note that has the solid base of a concept and is interlinked with the [[second brain]], but many of those links need water, or are unplanted. This note is not ever/green because the notes linked within in it are actively changing, and that may require to work on the ever/green
		- **\#EVER/GREEN/PRUNE** [[evergreen notes]] that needs to be looked at and rethought through in the context of the [[second brain]]. May include adding and removing connections, separating out distinct concepts into their own notes and removing inaccurate information

In practice, this is how I assign status:
```mermaid
flowchart TB;
Q1-->|No|#EVER/SEED/UNPLANTED
Q1[Does the note have topics or backlinks?]-->|Yes|Q2[Does the note have a body?]
Q2-->|Yes|Q3[Do I agree with what the note is saying?]
Q2-->|No|#EVER/SEED/WATER
Q3-->|No|WORK[#TO/TEND/PRUNE]
Q3-->|Yes|Q4[Is the note a complete concept?]
Q5-->|Yes|#EVER/GREEN
Q4-->|No|Q7[Is it too large or too small?]
Q4-->|Yes|Q5[Is the note used a lot? in practice or in other notes]
Q5-->|No|#EVER/SPROUT/CULTIVATE
Q6-->|Yes|WATER[#EVER/SPROUT/WATER]
Q6-->|No|STABLE[#EVER/SPROUT]
Q7-->|too small|Q6[Do I have more to say?]
Q7-->|too large|GRAFT[#TO/TEND/GRAFT]
```