<%*
const stubTemplate = tp.file.find_tfile("STUB");
const content = tp.file.content

const matches = content.matchAll(/\[\[([^\]\#\|]+)[^\]]*\]\]/g);
for (match of matches) {
	const filename = match[1]
	if (!tp.file.exists(filename)) {
		tp.file.create_new(stubTemplate, "30_Topics/31_Stubs/" + filename);
	}
}
%>