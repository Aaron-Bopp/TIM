```dataviewjs

function averageLinks(tag) {
	let pages = dv.pages(tag)
	let totalOutlinks = pages.array().map(p => p.file.outlinks.length) .reduce((p,n) => p+n)
	let totalInlinks = pages.array().map(p => p.file.inlinks.length).reduce((p,n) => p+n)
	let totalLinks = totalInlinks+totalOutlinks
 return `Average: ${totalLinks/pages.length}, Total pages: ${pages.length}, Total links: ${totalLinks}`
}

dv.list(dv.paragraph(averageLinks('#node/evergreen')))

```
	