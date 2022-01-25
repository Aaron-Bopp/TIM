<%*

const comPlugin = Object.keys(app.plugins.manifests)

.filter (f => f !== "templater-obsidian");

const lessThenHalfEnabled = (comPlugin.length/2 > app.plugins.enabledPlugins.size);

if (lessThenHalfEnabled) {

comPlugin.forEach (pluginID => app.plugins.enablePluginAndSave(pluginID));

new Notice ("Enabling " + comPlugin.length.toString() + " plugins");

} else {

comPlugin.forEach (pluginID => app.plugins.disablePluginAndSave(pluginID));

new Notice ("Disabling " + comPlugin.length.toString() + " plugins");

}

setTimeout(() => {

app.commands.executeCommandById("app:reload");

}, 2000);

%>