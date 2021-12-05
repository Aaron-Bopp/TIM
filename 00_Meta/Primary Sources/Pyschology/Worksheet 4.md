**[Worksheet 4 (25 pts)]{.ul}**

**Instructions:** Respond to each of the following prompts by typing in the space below the prompt. Answers should be written in essay style, not bullet points. Keep in mind that short, 1-2 sentence responses are likely not enough to receive full credit for any of these prompts.

**Dovidio et al. (2017) -- Aversive Racism and Contemporary Bias**

**1.** In your own words, compare and contrast the four forms of "subtle racism" discussed by the authors on pp. 268-274. Be sure to define each form and explain what makes them unique from each of the others. **(5 pts)**
	1. Symbolic racism is when a person's actions (voting patterns) and opinions (black people are threatening and lazy) symbolize the true racist ideas that they hold, but refuse verbalize, as they believe that discrimination no longer exists or that they are not racist.
	2. Modern racism is very similar to symbolic in the way it looks at "indirect" racism and predicts voting patterns, but is built of the negative feelings that whites have towards blacks that cause them to have symbolically racist behaviors. 
	3. Abivalent racism refers to the cognitive dissonance that forms when a person has internalized ambivalence or non-belief towards the discrimination that black people face, but when personally confronted with it, still see the injustice of the situation. These cogntive dissonace comes from clash of the person's belief that they are fair and just, and their incompatible belief that the world is fair and just.
	4. Aversice racism is the closest to the concept of unconscious bias. While the person believes that are non-racist and works to avoid seeming racist, in situations where the racism isn't obvious they can still fall into racist behavior. Because these people actively avoid obvious bias, implicit bias can often go completely unnoticed.

**Correll et al. (2014) -- The Police Officer's Dilemma**

**2.** In this article, the authors argues that, having relevant expertise, police officers are better at differentiating between armed and unarmed targets in the first-person shooter task (FPST). However, the authors mention that police officers perform poorly on the FPST under certain conditions. Using information from the section titled "The Role of Cognitive Control in Expert Performance" (pp. 207-209), describe [two]{.ul} circumstances where a police officer is more likely to show racial bias in the FPST. In your response, be sure to explain the situation as well as why this may cause police officers to exhibit racial bias. **(5 pts)**

**Kuchynka et al. (2018) -- Hostile and Benevolent Sexism**

**3.** Using information from the article, and in your own words:

> **a.)** Define *hostile sexism* and *benevolent sexism* and explain how the two forms differ from one another. **(1 pts)**
> - Hostile sexism is overtly negative beliefs and behavior towards women that includes stereotyping women's behaviors and beliefs. Benevolent sexism is controlling women throuhg paternalistic and patronizing behavior that have positive intentions but are born out of stereotypes. Both of these can include the objectification and hatred of women or their behaviors.
> **b.)** Name the three forms of benevolent sexism discussed in the article, and provide an example of each form other than those given in the article. **(2 pts)**
>
> **c.)** Explain the results of the study with respect to which forms of sexism appear to be detrimental to women's interest and success in STEM majors. **(2 pts)**

**Chapter 4: Racial Microaggressions (pp. 90-91)**

**4.** In this section (Focus 4.1), the authors discuss racial microaggressions and mention three different forms they can take: *microinvalidations*, *microinsults*, and *microassaults*. You can read more about these three forms at [this link](http://auburn.edu/equitytaskforce/pdf/Racial_MicroaggressionsshortVersion.pdf) if you would like.

> **a.)** Give an example of each of the three forms of microaggression. Your examples should be different from those in Focus 4.1 and those found at the link above, and examples do not have to be related to race. **(3 pts)**
> 1. 
> **b.)** In your own words, explain the difference between a *microaggression* and "regular" forms of prejudice and discrimination. **(2 pts)**

	**Dovidio et al. (2017) -- Reducing Intergroup Bias through Intergroup Contact**

**5.** In addition to interpersonal contact, the authors discuss four other types of contact that may be used to reduce intergroup bias (pp. 3-4). For this question:

**a.)** Define each of the four other types of contact in your own words; **(2 pts)**
1. Extended contact: the longer you spend with different groups you will stereotype them less and see more similarities causing a reduction in bias
2. Vicarious contact is seeing someone you identify with have non-biased interactions and learning from their behavior
3. Imagined Contact is simulating how you would interact with other groups and using that experience to reduce your bias.
4. Virtual Contact is controlled contact through the internet that allows to you confront and reduce bias on your own time.
> **b.)** Give an example for each type of contact that might lead to reduced bias in individuals exposed to it. Each of your four examples should target reducing a different type of bias (e.g., anti-Black bias, anti-trans bias, etc.). **(3 pts)**
1. Extended: You live next to black neighbors and for years and have continued good interactions with them. This gives you the experience and reason to confront you stereotypes and bias.
2. Vicarious: One of your friends keeps talking about his hot girlfriend and then you find out that she is trans. This causes you to rethink your own attitudes towards trans women.
3. ImaginedYou try to imagine arguing with a middle-eastern person about 9/11 and why it justifies the destruction of your country and you realize how stupid you sound.
4. Virtual: You become friends with someone through an online game and continue to que together because you two are the only non-toxic people playing. When you finally get in voice chat with this person you find out they are a girl, and that this whole time you've been thinking that they were so good. 

`$=dv.pages('#node/source').where(p => [p.related, p.source].contains("a")).length`

```dataview
TABLE length(rows) as Length, rows.file.link, join(filter(rows, (r) => r.creator)) as Creator
FROM #node/source
WHERE contains([related, source], "a")
GROUP BY null
```
```dataview
TABLE Related
FROM #node/source/articles 
where contains(related, "p")
```