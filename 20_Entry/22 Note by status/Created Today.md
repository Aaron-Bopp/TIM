#### Created today
```dataview
TABLE
	length(file.inlinks) as In,
	length(file.outlinks) as Out
WHERE date(created).day = date(today).day
```

