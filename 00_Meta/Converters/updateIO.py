import os
import re
import json

def get_IO_all_files(directory):
    file_io = dict()
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            if filename.endswith('.md') and '00_Meta' not in filepath and '10_Sources' not in filepath: 
                name = filename.replace('.md', '')
                file_io[name] = {'inlinks': set(), 'outlinks': set(), 'path': filepath}
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            if filename.endswith('.md') and '00_Meta' not in filepath and '10_Sources' not in filepath: 
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                name = filename.replace('.md', '')
                links = re.findall(r'\[\[([^\]\|\#]+)', text)
                for m in links:
                    if m in file_io.keys():
                        file_io[m]['inlinks'].add(name)
                    file_io[name]['outlinks'].add(m) 
    for file in file_io:
        file_io[file]['inlinks'] = list(file_io[file]['inlinks'])
        file_io[file]['outlinks'] = list(file_io[file]['outlinks'])
    return file_io

if __name__ == '__main__':
    files = get_IO_all_files(r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM')
    with open('00_Meta\\file_io.json', 'w') as f:
        json.dump(files, f)
                    
