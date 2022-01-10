#### Modified today
```dataview
TABLE 
	Status,
	length(file.inlinks) as In, 
	length(file.outlinks) as Out
WHERE date(file.mday) = date(today)
```
