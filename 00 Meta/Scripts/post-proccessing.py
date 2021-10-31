# %%
import json
import os


# %%
def initial_tags():
    type_to_tags = {'Section': [], 'Location': ['Region'], 'Organization': ['Allignment'], 'Character': ['Alignment']}
    for entity in entities:
        entities[entity].update({"tags": type_to_tags[entities[entity]["entity_type"]]})
        
    with open("entities.json", 'w') as f:
        json.dump(entities, f)
# %%


def load_notes():
    notes = {}
    with os.scandir() as vault:
        for entry in vault:
            if entry.is_dir() and entry.name != ".obsidian":
                with os.scandir(entry.path) as vault_folder:
                    for note in vault_folder:
                        if note.name.endswith(".md"):
                            name = note.name.split(".")[0]
                            with open(note.path) as text:
                                lines = text.readlines()
                                notes.setdefault(name, lines)
            if entry.is_file():
                if entry.name.endswith(".md"):
                    name = entry.name.split(".")[0]
                    with open(entry.path) as text:
                        lines = text.readlines()
                        notes.setdefault(name, lines)
    return notes
# %%


def get_entities(to_search):
    """searches given text for linked [[entities]]

    Args:
        to_search (string): string, does not need to contain [[entities]]

    Returns:
        set: all entities in text
    """
    entities = set()
    i, end = 0, 0
    while i < len(to_search):
        try:
            i = to_search.index('[[', i) + 2
            end = to_search.index(']]', i)
            entity = to_search[i:end]
            entities.add(entity)
        except ValueError:
            # No entitys or no further entitys end loop
            i = len(to_search)
    return entities
# %%

with open('entities.json') as f:
    entities = json.load(f)
    
def reorganize_notes():
    SPACES_PER_TAB = 4
    notes = load_notes()
    linked_notes = {name: {} for name in list(notes) + list(entities)} # String: {String: list} name of file: {parent line: appended child lines}
    for name in notes:
        initial = {'idx': 0, 'entities': [], 'text': ""}
        parent = {0: initial, 1: initial, 2: initial, 3: initial, 4:initial}
        note = notes[name]
        entity_data_idx, notes_idx = None, None
        reachedLinked = False
        i = 0
        while i < len(note) and reachedLinked == False:
            line = note[i]
            if line.startswith("#### Entity Data"):
                entity_data_idx = i
            elif line.startswith("#### Notes"):
                notes_idx = i
            elif line.startswith("#### Linked Notes"):
                notes[name] = 
                [:i+1] 
                reachedLinked = True
            else:
                
                try:
                    start = line.index("-") #Gives values error
                    line_entities = get_entities(line)
                    level = start//SPACES_PER_TAB
                    parent.update({level: {'idx': i, 'entities': line_entities, 'text': line} })
                    if level > 0:
                        line_entities.update(parent[level-1]['entities'])
                        for entity in line_entities:
                            # linked_notes[entity].setdefault(entity, {}).setdefault(parent[level-1]['text'], note).append(note)
                            try:
                                linked_notes[entity][parent[level-1]['text']].append(note)
                            except KeyError:
                                linked_notes[entity][parent[level-1]['text']] = [f"From [[{name}]]", note]
                        
                except ValueError:
                    pass
            i += 1 
        if notes_idx == None:
            note.insert(0, "#### Notes\n\n")
        if entity_data_idx == None:
            note.insert(0, "#### Entity Data\n\n")
            note.insert(1, '#' + '#'.join(entities[name]['tags']) + '\n\n')
    
    for name in notes:
        # notes[name].extend(list(dict.fromkeys(linked_notes[name])))
        added = set()
        
        try:
            for tnote in linked_notes[name]:
                if not (tnote in added):
                    notes[name].append(tnote.strip())
                    added.add(tnote.stip())
                    for child in linked_notes[tnote]:
                        if not (tnote in added):
                            notes[name].append(SPACES_PER_TAB*' ' + child.strip())
                            added.add(tnote.strip())
        except KeyError:
            notes[name]
            pass
    
    for entity in entities:
        entity_type = entities[entity]['entity_type']
        with open(f"{entity_type}\{entity}.md", 'w') as f:
            try:
                f.write("".join(notes[entity]))
            except KeyError:
                initial_string = f"#### Entity Data\n\n#{' #'.join(entities[entity]['tags'])} \n\n#### Notes\n\n#### Linked Notes \n\n{''.join(list(dict.fromkeys(linked_notes[entity])))}"
                f.write(initial_string)
    with os.scandir() as vault:
        for entry in vault:
            if entry.is_file() and entry.name.endswith(".md"):
                os.remove(entry.name)  
reorganize_notes()            
# %%

# %%
