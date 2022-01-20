import os
import re
import json
from datetime import date

def get_files_sizes(directory):
    """
    Store file sizes in a dict
    """
    file_sizes = dict()
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                file_sizes[filepath] = os.path.getsize(filepath)
    return file_sizes

def dump_current_file_sizes(directory):
    # dump file sizes to json
    file_sizes = get_files_sizes(directory)
    print(os.getcwd())
    with open('00_Meta\\file_sizes.json', 'w') as f:
        json.dump(file_sizes, f)

def get_files_sizes_from_json():
    # get file sizes from json
    with open('00_Meta\\file_sizes.json', 'r') as f:
        file_sizes = json.load(f)
    return file_sizes

def update_edit_time(path, date):
    # update edit time
    with open(path, 'r', encoding="utf-8") as f:
        text = f.read()
    text = re.sub(r'\*edited .*\*\n', f'*edited {date.strftime("%B %d, %Y")}*\n', text)
    text = re.sub(r'edited: .*\n', f'edited: {date.strftime("%Y-%m-%d")}\n', text)
    with open(path, 'w', encoding='utf-8') as f:  
        f.write(text)

if __name__ == '__main__':
    directory = r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM'
    file_sizes = get_files_sizes_from_json()
    current_file_sizes = get_files_sizes(directory)
    # get todays date in text
    current_date = date.today()
    for current in current_file_sizes:
        if current not in file_sizes:
            update_edit_time(current, current_date)
            print(f'{current} updated')
        else:
            if file_sizes[current] > current_file_sizes[current] + 100 or file_sizes[current] < current_file_sizes[current] - 100:
                update_edit_time(current, current_date)
                print(f'{current} updated')
        

    dump_current_file_sizes(directory)
