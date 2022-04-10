imap jk <Esc>
imap kj <Esc>
nmap U <C-r>
nmap Y y$

" Have j and k navigate visual lines rather than logical ones
nmap J gj
nmap K gk
" I like using H and L for beginning/end of line
nmap H ^
nmap L $
" Quickly remove search highlights
nmap <F9> :nohl

" Yank to system clipboard
set clipboard=unnamed

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcuts for these to work)

exmap back obcommand app:go-back
nmap <C-o> :back
exmap forward obcommand app:go-forward
nmap <C-i> :forward

" Surround text with [[ ]] to make a wikilink
" NOTE: must use 'map' and not 'nmap'
exmap wiki surround [[ ]]
map S :wiki

exmap nextHeading jsfile mdHelpers.js {jumpHeading(true)}
exmap prevHeading jsfile mdHelpers.js {jumpHeading(false)}
" nmap ]] :nextHeading
" nmap [[ :prevHeading