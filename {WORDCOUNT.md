```dataviewjs
// CONFIG
const lang = "en"; //"en" or "de"
const thousandSeperator = ".";
const pages = dv.pages('#node/evergreen');
const max_target = 80000;
const target_type = "chars"; // "words" or "chars"

// TABLE
let wordCharRatio = 0;
if (lang == "de") wordCharRatio = 4.79;
if (lang == "en") wordCharRatio = 5.99;



// TOTAL CALCULATION
let charTotal = Math.round(pages.file.size.array().reduce((acc, val) => acc + val, 0) * 1.005);
let wordTotal = Math.round(charTotal / wordCharRatio);

let progress = 0;
let target_type_text = "";
if (target_type == "chars") {
    progress = (charTotal / max_target * 100).toFixed(1);
    target_type_text = "Characters";
} 
if (target_type == "words") {
    progress = (wordTotal / max_target * 100).toFixed(1);
    target_type_text = "Words";
} 

function thousandSep (num){
    let numText = String(num);
    if (num < 10000) return numText;
    return numText.slice(0, -3) + thousandSeperator + numText.slice (-3);
}

//TOTAL OUTPUT
const br = "  \n";
dv.paragraph("---");

dv.paragraph("**Total:** " + thousandSep(charTotal) + " Characters, "  + thousandSep(wordTotal) + " Words (" + lang + ")" + br
+ "**Target:** " + thousandSep(max_target) + " " + target_type_text + br
+ "**Progress:** " + progress + "%"
);

dv.table(["Note", "Chars", "Words (" + lang + ")"], pages
    .sort (b => (Math.round(b.file.size*1.005) - 350)*-1)
    .map(b => [b.file.link, Math.round(b.file.size*1.005) - 350, Math.round(b.file.size*1.005 / wordCharRatio) - 69])
);

customJS.dv_funcs.sortableColumns()
```