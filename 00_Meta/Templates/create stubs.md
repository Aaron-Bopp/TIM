<%*
const stubTemplate = tp.file.find_tfile(""); 
const content = tp.file.content
const root = app.vault.getRoot();
const relative_path = "" 

const matches = content.matchAll(/\[\[([^\[\]\#\|]+)[^\]]*\]\]/g);
for (match of matches) {
	const filename = match[1]
	if (!tp.file.exists(filename)) {
		tp.file.create_new(stubTemplate,  relative_path + "/" + filename, false, root );
	}
}
%>
