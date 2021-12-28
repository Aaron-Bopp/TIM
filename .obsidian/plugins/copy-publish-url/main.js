/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
If you want to view the source, visit the plugins’ github repository.
*/

var P=Object.create;var u=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var U=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,S=Object.prototype.hasOwnProperty;var m=s=>u(s,"__esModule",{value:!0});var v=(s,t)=>{m(s);for(var e in t)u(s,e,{get:t[e],enumerable:!0})},T=(s,t,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of U(t))!S.call(s,i)&&i!=="default"&&u(s,i,{get:()=>t[i],enumerable:!(e=y(t,i))||e.enumerable});return s},f=s=>T(m(u(s!=null?P(w(s)):{},"default",s&&s.__esModule&&"default"in s?{get:()=>s.default,enumerable:!0}:{value:s,enumerable:!0})),s);var a=(s,t,e)=>new Promise((i,n)=>{var h=l=>{try{d(e.next(l))}catch(b){n(b)}},c=l=>{try{d(e.throw(l))}catch(b){n(b)}},d=l=>l.done?i(l.value):Promise.resolve(l.value).then(h,c);d((e=e.apply(s,t)).next())});v(exports,{default:()=>g});var r=f(require("obsidian"));var o=f(require("obsidian")),p=class extends o.PluginSettingTab{constructor(t,e){super(t,e);this.plugin=e}display(){let{containerEl:t}=this,{settings:e}=this.plugin;t.empty(),t.createEl("h2",{text:"Copy Publish URL Settings"}),new o.Setting(t).setName("Index note of your published vault").setDesc("Please use the relative path from the vault root. You do not need to include the .md extension.").addText(i=>{i.setPlaceholder("Index").setValue(e.homeNote).onChange(n=>a(this,null,function*(){n.trim().slice(-3)===".md"?e.homeNote=n.trim().slice(0,-3):e.homeNote=n.trim(),yield this.plugin.saveSettings()}))}),new o.Setting(t).setName("Publish base path").setDesc("Please enter the base path of your publish site.").addText(i=>{i.setPlaceholder("https://publish.obsidian.md/help/").setValue(e.publishPath).onChange(n=>a(this,null,function*(){n.trim().slice(-1)==="/"?e.publishPath=n.trim():e.publishPath=n.trim()+"/",yield this.plugin.saveSettings()}))}),new o.Setting(t).setName("Show in file menu").setDesc("Enable it to show the Copy Publish URL action in the file menu.").addToggle(i=>{i.setValue(this.plugin.settings.enableContext),i.onChange(n=>a(this,null,function*(){this.plugin.settings.enableContext=n,yield this.plugin.saveSettings(),n?this.plugin.fileMenuEvent(!0):this.plugin.fileMenuEvent(!1)}))}),new o.Setting(t).setName("Open current note in browser").setDesc("Enable it to get a command to open the current note on the Obsidian Publish site.").addToggle(i=>{i.setValue(this.plugin.settings.enableOpenUrl),i.onChange(n=>a(this,null,function*(){this.plugin.settings.enableOpenUrl=n,yield this.plugin.saveSettings(),n?this.plugin.addCommand(this.plugin.returnOpenCommand()):this.app.commands.removeCommand(`${this.plugin.manifest.id}:open-publish-url`)}))})}};var k={homeNote:"",publishPath:"",enableContext:!1,enableOpenUrl:!0};function C(s,t){let e=s.metadataCache.getFileCache(t),i=e==null?void 0:e.frontmatter;if(i!==void 0)try{return i.publish!==!1}catch(n){return!0}else return!0}var g=class extends r.Plugin{constructor(){super(...arguments);this.returnOpenCommand=()=>({id:"open-publish-url",name:"Open URL in browser",checkCallback:this.giveCallback(this.openPublishUrl.bind(this))});this.returnCopyCommand=()=>({id:"copy-publish-url",name:"Copy URL",checkCallback:this.giveCallback(this.copyPublishUrl.bind(this))});this.fileMenuCallbackFunc=(t,e,i)=>{if(e instanceof r.TFile){if(C(this.app,e)){t.addSeparator();let h=e.path;t.addItem(c=>{c.setTitle("Copy Publish URL").setIcon("link").onClick(()=>a(this,null,function*(){yield this.copyPublishUrl(h)}))})}else return!1;t.addSeparator()}}}getPublishUrl(t){let e=this.settings.publishPath,i=t.slice(0,-3);return i===this.settings.homeNote&&i.includes("/")&&(i=i.split("/").last()),e=encodeURI(e+i),e=e.replace(/%20/g,"+"),e}copyPublishUrl(t){return a(this,null,function*(){let e=this.getPublishUrl(t);yield navigator.clipboard.writeText(e),new r.Notice("Publish Url copied to your clipboard")})}openPublishUrl(t){let e=this.getPublishUrl(t);window.open(e)}giveCallback(t){return e=>{let i=this.app.workspace.getActiveFile();return i!==null?(e||(()=>a(this,null,function*(){if(!C(this.app,i)){new r.Notice("This note contains the publish: false flag.");return}let h=i.path;yield t(h)}))(),!0):!1}}fileMenuEvent(t){t?this.registerEvent(this.app.workspace.on("file-menu",this.fileMenuCallbackFunc)):this.app.workspace.off("file-menu",this.fileMenuCallbackFunc)}onload(){return a(this,null,function*(){console.log("loading Copy Publish URL plugin"),yield this.loadSettings(),this.addCommand(this.returnCopyCommand()),this.settings.enableOpenUrl&&this.addCommand(this.returnOpenCommand()),this.settings.enableContext&&this.fileMenuEvent(!0),this.addSettingTab(new p(this.app,this))})}onunload(){console.log("unloading Copy Publish URL plugin")}loadSettings(){return a(this,null,function*(){this.settings=Object.assign({},k,yield this.loadData())})}saveSettings(){return a(this,null,function*(){yield this.saveData(this.settings)})}};
