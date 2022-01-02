---
stats:
  - totags: 
  - toexplore:
  - todo:
  - totend:
  - evergreens: 
  - topics:
  - sources:
---
#### Modified today
```dataview
TABLE 
	Status,
	length(file.inlinks) as In, 
	length(file.outlinks) as Out
WHERE date(file.mday) = date(today)
```
#### Created today
```dataview
TABLE
	file.inlinks as In,
	length(file.outlinks) as Out
FROM #created/evergreen/<% tp.date.now("YYYY/MM/DD") %>
```

#### Modified Yesterday
#### Created Yesterday

