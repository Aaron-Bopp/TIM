```dataview
TABLE
	Status,
	sr-interval as Interval,
	length(file.inlinks) as In,
	length(file.outlinks) as Out,
	created as Created
FROM #EVER/GREEN
SORT status
```
	```dataviewjs
	
	const {dv_funcs} = customJS
	const pages = dv.pages()
	let lastEdited = false
	dv_funcs.defaultTable({
		dv,
		that:this,
		lastEdited,
		pagesArray:pages,
		whereCheck: (p => p.status === `#EVER/GREEN/GROWING`),
		title: `#EVER/GREEN/GROWING`
	})
	dv_funcs.defaultTable({
		dv,
		that:this,
		lastEdited,
		pagesArray:pages,
		whereCheck: (p => p.status === `#EVER/GREEN/PRUNE`),
		title: `#EVER/GREEN/PRUNE`
	})
	dv_funcs.defaultTable({
		dv,
		that:this,
		lastEdited,
		pagesArray:pages,
		whereCheck: (p => p.status && p.status.trim() == `#EVER/GREEN`),
		title: `#EVER/GREEN`
	})
	
	```

