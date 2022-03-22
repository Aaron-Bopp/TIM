```dataviewjs

const {dv_funcs} = customJS
let tags = ["#node/evergreen", "#node/topic", "#node/topic/stub", "#node/source"]
tags.forEach((tag) => {
dv.header(1, tag)
dv.list(dv.paragraph(dv_funcs.averageLinks(tag, dv)))

})

```
	