<%*
const title = tp.file.title
const content = tp.file.content

const matches = content.matchAll(/\#+\s*\^(\d+)\n/g);
console.log(matches)
let output = ""
for (match of matches) {
	const header = match[1]
	console.log(match)
	output += `- ![[${title}#${header}]]\n`
}
tR += output
%>
