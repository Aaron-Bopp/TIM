
```dataviewjs
const {dv_funcs} = customJS
const pages = dv.pages()
const table = (tag) => {
	dv_funcs.defaultTable({
		dv,
		that:this,
		pagesArray:pages,
		whereCheck: (p => p.status === tag),
		title: tag
	})
}
["/WATER", "/CULTIVATE", ""].forEach(t => table("#EVER/SPROUT" + t))
```
```dataviewjs
console.log(document.querySe)
```
