import os
import re

def move_stubs(directory):
    """
    Move stubs to new directory
    """
    for root, dirs, files in os.listdir(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                if "node/topic/stub" in text:
                    filename = '31_Stubs\\' + filename
                if "node/topic/term" in text:
                    filename = '32_Terms\\' + filename
                if "node/topic/tool" in text:
                    filename = '33_Tools\\' + filename
                if any(s in filename for s in ['31_Stubs', '32_Terms', '33_Tools']):
                    os.remove(filepath)
                    filepath = os.path.join(root, filename)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(text)

def get_eg_topics(directory):
    topics = dict()
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith('.md'):
                filepath = os.path.join(root, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                if "node/evergreen" in text:
                    m = re.search(r'\*\*Topics\*\*\:\:\s*([^\n]*)\s*', text)
                    if m:
                        notes = re.sub(r'[\[\]]*', '', m[1])
                        notes = notes.split(',')
                        notes = [note.strip() for note in notes]
                        # increment topic count
                        for note in notes:
                            if note in topics:
                                topics[note].append(re.sub('.md', '' , filename))
                            else:
                                topics[note] = [re.sub('.md', '' , filename)]
    return topics

def add_related_egs(text, filename, topics):
    lines = text.split('\n')
    new_text = ''
    in_dne = False
    for i, line in enumerate(lines):
        if r"%% DO NOT EDIT BELOW %%" in line:
            new_text += '\n'.join([f'- {note}\n' for note in topics[filename]])
            in_dne = True
        elif r"%% DO NOT EDIT ABOVE %%" in line:
            in_dne = False
        elif in_dne:
            pass
        else:
            new_text += line
    return new_text

def update_tag(text, name, topics):
    if name in topics.keys() and len(topics[name]) > 0:
        text = re.sub(r'node/topic/(stub|term)', 'node/topic/outline', text)
    return text

                                
if __name__ == '__main__':
    # # get current working directory
    # os.chdir(r'30_Topics')
    directory = r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM'
    # print(directory)
    # move_stubs(r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM\30_Topics')
    topics = get_eg_topics(r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM\40_Evergreens')

    for root, dirs, files in os.walk(directory):
            for filename in files:
                if filename.endswith('.md'):
                    filepath = os.path.join(root, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        text = f.read()
                    name = filename.replace(r'.md', '')
                    new_text = text.replace(r'<% tp.file.include("[[TITLE-TOPIC]]\n") %>', f'\n##### <s class="topic-title">[[{name}]]</s>')
                    if text != new_text:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_text)
                            # f.write(update_tag(text, name, topics))