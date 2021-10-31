import os
import sys
notes = {}

def scanFolder(folderPath=os.getcwd()):                
    with os.scandir(folderPath) as folder:
        for entry in folder:
            if entry.is_dir():
                scanFolder(entry)
            if entry.is_file() and entry.name.endswith(".md"):
                with open(entry.path, encoding='utf-8') as text:
                    print(entry.path)
                    lines = text.read()
                    notes.setdefault(entry, lines)
try:
    folder = sys.argv[1]
    scanFolder(folder)
except IndexError:
    scanFolder()

# def find_string(to_find, pattern_start, pattern_end, replace_start, replace_end):

def replace_links():
    

# tag_patterns = ["[[Allignment", "[[Alignment", "[[Region", "[[Def", "[[Qoute","[[TO", "[[Ref", "[[Yes", "[[Inbox", "[[No", "[[Sometimes", "[[Fun", "[[EVER"]

# for name in notes:               
#     for tagPattern in :
#         end = True
#         while end:
#             try:
#                 tagStart = notes[name].index(tagPattern) + 2
#                 tagEnd = notes[name].index("]]", tagStart)
#                 tag = notes[name][tagStart:tagEnd]
#                 notes[name] = notes[name][0:tagStart - 2] + "#" + tag + notes[name][tagEnd+2:]
#             except ValueError:
#                 end = False
    
# for name in notes:
#     with open(name, 'w', encoding='utf-8') as f:
#         f.write(notes[name])