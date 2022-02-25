class dv_funcs {
    averageLinks(tag, dv) {
        let pages = dv.pages(tag)
        let totalOutlinks = pages.array().map(p => p.file.outlinks.length).reduce((p,n) => p+n)
        let totalInlinks = pages.array().map(p => p.file.inlinks.length).reduce((p,n) => p+n)
        let totalLinks = totalInlinks+totalOutlinks
        let totalPages = pages.length
        let average = totalLinks / totalPages
        let averageIn = totalInlinks / totalPages
        let averageOut = totalOutlinks / totalPages
        return {totalInlinks, totalOutlinks, totalLinks, average, totalPages, averageIn, averageOut}
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return date
        if (typeof(d) === d.getMonth()) {} else {
            return [year, month, day].join('-');
        }
    }

    lastEdited(page) {
        let days = datediff(new Date(page.file.mtime), new Date())
        if (days === 0) {
            return "Today"
        }
        return `${days} days ago`
    }

    dateDiff(first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    statusLevel = (status) => {
        let statusDict = {
            "GREEN": 0,
            "SPROUT": 1,
            "SEED": 2
        }
        if (!status) { return 0 }
        try {
            let [_, growth, state] = status.split("/")
            return statusDict[growth]
        } catch (TypeError) {
            return 0
        }
    }

    wrap(name, alias) {
        if (alias) {
            alias = ' | ' + alias
        } else {
            alias = ""
        }
        return `[[${name}${alias}]]`
    }

    getIO(page, dv, that, justInOutline = false) {
        // const inlinks = page.file.inlinks.filter(l => l.path !== page.file.path && !l.path.contains("aliases"))
        // const inOutline = this.getNotesInOutline(dv.current().file.name, dv, that).length - 1
        // const totalOutlinks = this.getTotalLinks(page.file.name, dv, that).filter(l => l !== page.file.name).length
        // return `${inlinks.length}/${justInOutline ? inOutline : totalOutlinks}`
        return `${page.file.inlinks.length}/${page.file.outlinks.length - 1}`
    }

    getFileText(path, that) {
        var thisTFile = that.app.vault.getAbstractFileByPath(path);
        var content = thisTFile.unsafeCachedData;
        return content
    }

    getNotesInOutline(name, dv, that, justEmbeds = false) {
        const file = dv.page(name)

        const linksInOutline = /[\s\t]*\-\s.*\!*\[\[([^\#\]]+)(\#[^\]]+)*\]\]/g;
        const content = this.getFileText(file.file.path, that)
        let matches = []
        for (let match of content.matchAll(linksInOutline)) {
            matches.push(match)
        }
        // console.log(matches)
        // console.log([name].concat(matches.map((m) => m[2] ? (justEmbeds ? m[1] : this.getNotesInOutline(m[1], dv, that)) : m[1])).flat() )
        return Array.from(new Set([name].concat(matches.map((m) => m[2] ? (justEmbeds ? m[1] : this.getNotesInOutline(m[1], dv, that)) : m[1])).flat()))
    }

    getFileNameFromPath(path) {
        const match = path.match(/.*\/([^\/]*)\.md/)
        return match && match[1]
    }

    getTotalLinks(name, dv, that) {
        const outlinks = dv.page(name).file.outlinks.map(l => this.getFileNameFromPath(l.path))
        const outline = this.getNotesInOutline(name, dv, that)
        const outlinedIn = this.outlinedIn(dv, that, dv.page(name))
        return Array.from(new Set([...outlinks, ...outline, ...outlinedIn]))
    }

    notLinkedPages(args) {
        const { dv, folder, that, all = false } = args;
        // const allEmbeds = this.getEmbeds(dv.current().file.name, dv, that).map(f => f.file.outlinks).flat().map(l => l.path)
        const note = dv.current()
        console.log(note)
        let included = [note.file.name]
        if (note.includes) {
            included = included.concat(Array.from(note.includes).map(l => l.path)).flat()
        }
        let query = included.map(name => this.wrap(name)).join(" or ")
        let allNotes = included.map(name => this.getNotesInOutline(name, dv, that)).flat()
        console.log(allNotes)
        let parents = this.outlinedIn(dv, that, dv.current(), true)
        parents = parents ? parents.map(l => l.path) : []
        return dv.pages(all ? "" : query).where(p => {
            return !allNotes.includes(p.file.name) && !parents.includes(p.file.name) && folder && p.file.path.contains(folder)
        }).sort(p => this.getTotalLinks(p.file.name, dv, that), 'desc')
    }

    defaultTable(args) {
        const {
            dv,
            that,
            pagesQuery = "",
            pagesArray = dv.pages(),
            whereCheck = ((p) => true),
            title = "Page",
            sortCheck = ((p) => this.getTotalLinks(p.file.name, args.dv, args.that)),
            sortDir = 'asc',
            lastEdited = true,
            columnTitles = [title, "I/O", "Outlined In", "Mentioned In", "Edited", "Created"],
            columns = ((p) => [
                p.file.link,
                this.getIO(p, dv, that),
                // this.outlinedIn(dv, that, p, true),
                // p.file.inlinks.filter(l => dv.page(l.path).file.tags.includes("#node/topic/outline")),
                p.topics || p.see,
                this.pageMentions(dv, p),
                lastEdited ? moment(p.file.mtime.ts).fromNow() : p.file.mtime,
                this.formatDate(p.created || p.file.ctime)
            ])
        } = args;

        const pages = pagesQuery ? dv.pages(pagesQuery) : pagesArray
        if (pages.length > 0) {
            dv.table(columnTitles, pages.where((p) => whereCheck(p)).sort((p => sortCheck(p)), sortDir).map(columns))
        }
        // this.sortableColumns()
    }

    statusTable = (args) => {
        const { dv, title, that, folder, all = false, lastEdited = true } = args;
        this.defaultTable({
            pagesArray: this.notLinkedPages({ dv, folder, that, all }),
            sortCheck: ((p) => this.statusLevel(p.status)),
            columnTitles: [title || folder || "Page", "I/O", "Status", "Edited", "Created"],
            columns: (p => [
                p.file.link,
                this.getIO(p, dv, that),
                p.status,
                // this.outlinedIn(dv, that, p, true),
                lastEdited ? moment(p.file.mtime.ts).fromNow() : p.file.mtime,
                this.formatDate(p.created || p.file.ctime)
            ]),
            ...args
        })
    }


    topicNoteDataviews(args) {
        const { dv, that } = args
        dv.header(3, `Notes not in ${dv.current().file.name} outline`)
        this.defaultTable({
            ...args,
            pagesArray: this.notLinkedPages({ dv, folder: "30_Topics", that }),
            title: "30_Topics"
        })
        this.defaultTable({
            ...args,
            pagesArray: this.notLinkedPages({ dv, folder: "40_Evergreens", that }),
            title: "40_Evergreens"
        })
        this.defaultTable({
            ...args,
            pagesArray: this.notLinkedPages({ dv, folder: "10_Sources", that }),
            title: "ContentNotes"
        })
    }

    outlinedIn(dv, that, page = dv.current(), excludeAlreadyLinked = true) {
            const linkedNotes = page.parents || page.topics || []
            const linkedNames = []
            try {
                linkedNames = linkedNotes.type === 'file' ? [linkedNotes.path] : linkedNotes.map(l => l.path) //path only has names 
            } catch {

            }

            const inlinks = page.file.inlinks.filter(l => l.path.contains("TopicNotes"))
                //grab names
                .map(l => this.getFileNameFromPath(l.path))
                //if exclude aloow filter
                .filter(name => excludeAlreadyLinked && linkedNames.includes(name))
                // console.log(inlinks)

            let outlinedIn = inlinks.filter(name =>
                name !== dv.current().file.name &&
                this.getNotesInOutline(name, dv, that).includes(dv.current().file.name) &&
                !this.getFileNameFromPath(page.file.path) !== name
            )

            if (!outlinedIn || outlinedIn.length === 0) {
                return ""
            }
            if (outlinedIn.length > 0) {
                // console.log(linkedNotes)
                // if (linkedNames.length > 0) {
                //     return '\\- ' + outlinedIn.map(n => dv.fileLink(n)).join(',')
                // }
                // console.log(outlinedIn.map(n => dv.fileLink(n)))
                return outlinedIn.map(n => dv.fileLink(n))
            }
        }
        // get the number of topics, evergreens, and source notes and return them as a string
    pageMentions(dv, page) {
        let inlinks = []
        if (page) {
            inlinks = page.file.inlinks
            console.log(inlinks)
        } else {
            inlinks = dv.current().file.inlinks
        }
        let topics = inlinks.filter(l => l.path.contains("30_Topics")).length
        let evergreens = inlinks.filter(l => l.path.contains("40_Evergreens")).length
        let sources = inlinks.filter(l => l.path.contains("10_Sources")).length
        topics = topics > 0 ? (topics > 1 ? `${topics} topics` : "1 topic") : ""
        evergreens = evergreens > 0 ? (evergreens > 1 ? `${evergreens} evergreens` : "1 evergreen") : ""
        sources = sources > 0 ? (sources > 1 ? `${sources} sources` : "1 source") : ""
        return `${topics}${topics && evergreens ? ', '+evergreens : evergreens}${(evergreens || topics) && sources ? ', '+sources : sources}`
    }
    mentionedIn(dv, page) {
        let mentions = this.pageMentions(dv, page)
        if (mentions) {
            return `<s class="aside-in">*mentioned in ${mentions}*</s>`
        }
    }

    topicOutlineHeader(dv, that) {
        return this.getIO(dv.current(), dv, that, true)
    }
    topicHeader(dv, that) {
        return this.getIO(dv.current(), dv, that)
    }
    evergreenHeader(dv, that) {
        return this.getIO(dv.current(), dv, that)
    }

    sortableColumns = () => {
        // Source https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

        const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2, undefined, { numeric: true })
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

        document.querySelectorAll('table').forEach(table => {

            // do the work...
            Array.from(table.querySelectorAll('th')).forEach(th => th.style.cursor = "pointer");

            table.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
                const tbody = table.querySelector('tbody');
                Array.from(tbody.querySelectorAll('tr'))
                    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                    .forEach(tr => tbody.appendChild(tr));
            })));
        })
    }
}