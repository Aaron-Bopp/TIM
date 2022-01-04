import re
import sys
import os


def convert(directory, new_directory):
    """
    Recursively convert .md files and get relative file path
    """
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            relative_path = os.path.relpath(filepath, directory)
            if filename.endswith('.md'):
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                # check if relative path does not contain any of the following strings
                if not any(s in relative_path for s in ['Scripts', 'Primary Sources', 'Personal']):
                    print(os.path.join(new_directory, relative_path))
                    # create directories
                    os.makedirs(os.path.dirname(os.path.join(new_directory, relative_path)), exist_ok=True)
                    # write file 
                    with open(os.path.join(new_directory, relative_path), 'w', encoding='utf-8') as f:
                        # seed = re.search(r'\:\:\s*\#EVER\/SE', text)
                        seed = False
                        if '20_Entry' in relative_path:
                            text = re.sub(r'```dataview', "````md\n```dataview", text)
                            text = re.sub(r'```\s*$', "```\n````", text)
                        if 'Templates' in relative_path:
                            f.write(f'````md\n{text}\n````')
                        elif not seed:
                            text = re.sub(r'\*?(edited)?\s*`\$?=[^`]*`\*?', "", text)
                            text = re.sub(r'### \<hr.*\/\>', '\n---', text)
                            f.write(text)
            if filename.endswith('.js') or filename.endswith('.py') and '.obsidian' not in filepath:
                text = ""
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
                os.makedirs(os.path.dirname(os.path.join(new_directory, relative_path)), exist_ok=True)
                if filename.endswith('.js'):
                    ending = '.js'
                else:
                    ending = '.py'
                relative_path = relative_path.replace(ending, '.md')
                with open(os.path.join(new_directory, relative_path), 'w', encoding='utf-8') as f:
                    f.write(f'````{ending}\n{text}\n````')
            if 'Attachments' in relative_path:
                os.makedirs(os.path.dirname(os.path.join(new_directory, relative_path)), exist_ok=True)
                # copy .png files from Attachments folder
                os.system(f'copy "{filepath}" "{relative_path}"')
                



def del_current_publish(directory):
    """
    Delete current publish
    """
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            if not filename.endswith('.css') and not any(s in filepath for s in ['.convert', '.obsidian']):
                os.remove(filepath)
if __name__ == '__main__':
    # # get current working directory
    directory = os.getcwd()
    os.chdir(r'../TIM-Publish')
    directory = os.getcwd()
    del_current_publish(directory)
    convert(r'../TIM/', directory)
    # move_stubs(r'../TIM/30_Topics')