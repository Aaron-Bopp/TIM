<%*
// get all the files and run them through Array.reduce() method
const {dv_funcs} = customJS
dv_funcs.getIO
const createdDates = app.vault.getMarkdownFiles().map(file =>{
	// get the CachedMetadata
	const cache = app.metadataCache.getFileCache(file)
	console.log(cache)
	const tags = tp.obsidian.getAllTags(cache)
	console.log(tags)
	if (cache.frontmatter && tags.includes('#evergreen')) {
		//return tags
		return cache.frontmatter.created
	}
	}
)
const uniqueDates = Array.from(new Set(createdDates)).sort()
const counts = uniqueDates.map(d => createdDates.reduce((total,x) => (x==d ? total+1 : total), 0))
// return the count
tR += '[' + uniqueDates + ']\n'
tR += '[' + counts + ']'
%>
