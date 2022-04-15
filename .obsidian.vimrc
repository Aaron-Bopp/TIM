imap jk <Esc>
imap kj <Esc>
nmap U <C-r>
nmap Y y$

" Have j and k navigate visual lines rather than logical ones
nmap j gj
nmap k gk
noremap J j
noremap K k
nmap <C-k> {
nmap <C-j> }
" I like using H and L for beginning/end of line
nmap H ^
nmap L $
" Quickly remove search highlights
nmap <F9> :nohl

unmap <Space>
" Change navigation to work better for text editing
"  noremap e E
"  noremap E e
nmap <Space>e ea
nmap <Space>E Ea

"  noremap b B
"  noremap B b
nmap <Space>b bi
nmap <Space>B Bi

nmap <Space>w lwi
nmap <Space>W lWi

noremap <Space>j J
" Yank to system clipboard
set clipboard=unnamed

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcuts for these to work)

"  exmap back obcommand app:go-back
"  nmap <C-o> :back
"  exmap forward obcommand app:go-forward
"  nmap <C-i> :forward

" Surround text with [[ ]] to make a wikilink
" NOTE: must use 'map' and not 'nmap'
exmap wiki surround [[ ]]
map S :wiki

exmap nextHeading jsfile mdHelpers.js {jumpHeading(true)}
exmap prevHeading jsfile mdHelpers.js {jumpHeading(false)}
" nmap ]] :nextHeading
" nmap [[ :prevHeading