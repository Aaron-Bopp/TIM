import os
import re
import json

def get_IO_all_files(directory):
    file_io = dict()
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                name = filename.replace('.md', '')
                file_io[name] = {'inlinks': set(), 'outlinks': set(), 'path': os.path.join(root, filename)}
    # walk through directoryk
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                name = filename.replace('.md', '')
                links = re.findall(r'\[\[([^\]\|\#]+)[\#\|]?[^\]]*?\]\]', text)
                try:
                    for m in links:
                        print(m[1])
                        if m[1] in file_io.keys():
                            file_io[m[1]]['inlinks'].add(name)
                        file_io[name]['outlinks'].add(m[1])
                except IndexError:
                    pass
    return file_io

if __name__ == '__main__':
    files = get_IO_all_files(r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM')
    with open('00_Meta\\file_io.json', 'w') as f:
        json.dump(files, f)
                    
