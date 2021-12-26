<%*
const title = tp.file.title
const content = tp.file.content

const matches = content.matchAll(/\#+ .*\n/g);
console.log(matches)
let output = ""
for (match of matches) {
	//console.log(match)
	const header = match[0]
	let embedcode = header.match(/\^(\d+)\n/)
	if (header.match(/\^(\d+)q\n/)) {continue;}
	embedcode = embedcode ? embedcode[1] : ""
	output += embedcode ? `- ![[${title}#${embedcode}]]\n` : `${header}`
}
tR += output
%>
