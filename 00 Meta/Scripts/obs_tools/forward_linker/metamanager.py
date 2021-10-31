import sys
import os

import frontmatter
import yaml
from unlinkr import unlink_text
from linkr import link_title, get_vault_titles

# def get_linkable_lines(txt, ignore_frontmater=True, ignore_headers=True, ignore_dataview_attrs=True, ignore_codeblocks=True):
#     code_lines = []
#     if ignore_codeblocks:
#         block_start = lines.find('```')
#         while(block_start != -1):
#             block_end = lines.find('```', block_start)
#             code_lines.extend(range(block_start, block_end))
#             block_start = lines.find('```', block_end)
  
#     i = txt_start
#     # if ignore_codeblocks: avoided_patterns.add('`%`')
#     for line in lines[txt_start:]:
#         if ignore_headers:
            
#         linkable_lines = [i]
def find_frontmatter_end(lines):
    frontmatter_start, frontmatter_end = -1, -1
    frontmater_start = lines.find("---")
    if all(l == '' for l in lines[:frontmater_start]):
        frontmatter_end= lines.find("---", frontmater_start)
    txt_start = max([frontmater_start, frontmatter_end, 0])
    return txt_start

page_titles = []
page_aliases = {}
generated_aliases = {}
obsidian_home = ''
wikipedia_mode = False
paragraph_mode = False
regenerate_aliases = False
clear_links = False
# main entry point
# validate obsidian vault location
if len(sys.argv) > 1:
    obsidian_home = sys.argv[1]
    if not os.path.isdir(obsidian_home):
        print('folder specified is not valid')
        exit()
    
    # check for additional flags
    if len(sys.argv) > 2:
        for arg_index in range(2, len(sys.argv)):
            flag = sys.argv[arg_index]

            if flag == "-w":
                wikipedia_mode = True
            elif flag == "-p":
                wikipedia_mode = True
                paragraph_mode = True
            elif flag == "-r":
                regenerate_aliases = True
            elif flag == "-u":
                clear_links = True


else:
    print("usage - python obs-link.py <path to obsidian vault> [-r] [-y] [-w / -p]")
    print("-r = regenerate the aliases.md file using yaml frontmatter inside vault markdown files")
    print("-y = use aliases.yml as aliases file instead of aliases.md")
    print("-w = only the first occurrence of a page title (or alias) in the content will be linked ('wikipedia mode')")
    print("-p = only the first occurrence of a page title (or alias) in each paragraph will be linked ('paragraph mode')")
    print("-u = remove existing links in clipboard text before performing linking")
    print("-t = perform replacements on all text in vault")
    exit()

aliases_file = obsidian_home + "/aliases.md"
page_titles, page_aliases = get_vault_titles(obsidian_home)
for root, dirs, files in os.walk(obsidian_home):
    for file in files:
        # ignore any 'dot' folders (.trash, .obsidian, etc.)
        print(file)
        if file.endswith('.md') and '\\.' not in root and '/.' not in root and "aliases" not in file:
            with open(root + "/" + file, 'r', encoding="utf-8") as f:
                unlinked_txt = f.read()
                lines = map(lambda l: l.strip(), unlinked_txt.split("\n"))
                first_line = find_frontmatter_end(lines)
                if (first_line > 0):
                    try:    
                        fm = frontmatter.load(f)
                        print(fm)
                    except yaml.YAMLError as exc:
                        print(f"{exc} while processing frontmatter in {file}")
                if clear_links:
                    unlinked_txt = unlink_text(unlinked_txt)
                
                linked_txt = ""
                for title in page_titles:
                    for line in lines:
                        title_alias = ''
                        if title in page_aliases: title_alias = page_aliases[title]
                        linked_txt += link_title(title, line, alias=title_alias, link_all=(not paragraph_mode)) + "\n"
                    linked_txt = linked_txt[:-1] # scrub the last newline
                