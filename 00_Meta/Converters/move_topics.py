import os

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
if __name__ == '__main__':
    # # get current working directory
    os.chdir(r'30_Topics')
    directory = os.getcwd()
    print(directory)
    move_stubs(r'C:\Users\aweso\Documents\GitHub\Obsidian-Notes\TIM\30_Topics')