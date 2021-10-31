<%* 
const filename = String(tp.file.selection()).trim()
const template = tp.file.find_tfile("EGNOTE") 
await tp.file.create_new(template, filename)
if (tp.file.folder !== "SecondBrain/EvergreenNotes"){
 await tp.file.move("SecondBrain/EvergreenNotes/" + tp.file.title)
}

%><% tp.file.selection() %>