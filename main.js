function findOptionByName(name) {
    for (let i = 0; i < currentModule.config.length; i++) {
        if (currentModule.config[i].type === globalProperty) {
            for (let j = 0; j < currentModule.config[i].options.length; j++) {
                let current = currentModule.config[i].options[j].name;
                if (current.includes("!!!")) {
                    current = current.slice(3, current.length);
                }
                if (current === name) {
                    return currentModule.config[i].options[j];
                }
            }
        }
        else if(currentModule.config[i].type === channelProperty) {
            for (let j = 0; j < currentModule.config[i].options.values.length; j++) {
                let current = currentModule.config[i].options.values[j].name;
                if (current.includes("!!!")) {
                    current = current.slice(3, current.length);
                }
                if (current === name) {
                    return currentModule.config[i].options.values[j];
                }
            }
        }
    }
}

function findPropByOption(option) {
    for (let i = 0; i < currentModule.config.length; i++) {
        if (currentModule.config[i].type === globalProperty) {
            for (let j = 0; j < currentModule.config[i].options.length; j++) {
                if (currentModule.config[i].options[j] === option) {
                    return currentModule.config[i];
                }
            }
        } else if(currentModule.config[i].type === channelProperty) {
            for (let j = 0; j < currentModule.config[i].options.values.length; j++) {
                if (currentModule.config[i].options.values[j] === option) {
                    return currentModule.config[i];
                }
            }
        } else {
            if (currentModule.config[i].options === option) {
                return currentModule.config[i];
            }
        }
    }
}

function returnChannelEnable() {
    for (let i = 0; i < currentModule.config.length; i++) {
        if (currentModule.config[i].type === channelEnable) {
            return currentModule.config[i];
        }
    }
}

function addArrow(button) {
    let span = document.createElement("SPAN");
    span.innerText = "▼";
    span.className = "dropdown";
    button.appendChild(span);
}

function generateConfigTool(properties, container) {
    let configProperties = document.createElement("DIV");
    configProperties.className = "config-properties";
    container.appendChild(configProperties);

    function addChannelContainer() {
        if (document.querySelector(".config-properties .channel-editor") === null) {
            let channel = document.createElement("DIV");
            channel.className = "channel-editor";
            let channelProperty = document.createElement("DIV");
            channelProperty.className = "channel-property";
            let placeholder = document.createElement("DIV");
            placeholder.className = "placeholder";
            channelProperty.appendChild(placeholder);
            for (let i = 0; i < currentModule.channels; i++) {
                let title = document.createElement("P");

                title.innerText = "Channel " + (i + 1);
                channelProperty.appendChild(title);
                channel.appendChild(channelProperty);
            }
            document.querySelector(".config-properties").appendChild(channel);
        }
    }
    for (let i = 0; i < properties.length; i++) {
        // global property editor generator
        if (properties[i].type === globalProperty) {
            if (document.querySelector(".config-properties .global-editor") === null) {
                let global = document.createElement("DIV");
                global.className = "global-editor";
                if (document.querySelector(".config-properties .channel-editor") === null) {
                    document.querySelector(".config-properties").appendChild(global);
                } else {
                    let configContainer = document.querySelector(".config-properties .channel-editor");
                    configContainer.parentNode.insertBefore(global, configContainer);
                }
            }
            let editor = document.createElement("DIV");
            let title = document.createElement("P");
            title.innerText = properties[i].name;
            let button = document.createElement("BUTTON");
            let options = document.createElement("DIV");
            options.className = "options";
            options.style.visibility = "hidden";
            properties[i].elements = new Array();
            for (let j = 0; j < properties[i].options.length; j++) {
                if (properties[i].options[j].name.includes("!!!")) {
                    button.innerText = properties[i].options[j].name.slice(3, properties[i].options[j].length);
                    properties[i].value = properties[i].options[j].value;
                }
                let option = document.createElement("P");
                if (properties[i].options[j].name.includes("!!!")) {
                    option.innerText = properties[i].options[j].name.slice(3, properties[i].options[j].name.length);
                    option.classList.add("bold");
                } else {
                    option.innerText = properties[i].options[j].name;
                }
                option.addEventListener("click", function (e) {
                    let selected = findOptionByName(this.innerText);
                    findPropByOption(selected).value = selected.value;
                    updatePreview();
                    this.parentNode.classList.remove("show");
                    this.parentNode.classList.add("hide");
                    this.parentNode.previousElementSibling.innerText = this.innerText;
                    addArrow(this.parentNode.previousElementSibling);
                    e.stopPropagation();
                });
                options.appendChild(option);
                properties[i].elements.push(options);
            }
            editor.appendChild(options);
            button.addEventListener("click", function (e) {
                let optionDiv = this.parentNode.querySelector("div.options");
                optionDiv.style.left = this.getBoundingClientRect().left + "px";
                optionDiv.style.width = (this.getBoundingClientRect().width - 2) + "px";
                if (optionDiv.classList.contains("show")) {
                    this.querySelector("span").innerText = "▼";
                    optionDiv.classList.remove("show");
                    optionDiv.classList.add("hide");
                } else {
                    this.querySelector("span").innerText = "▲";
                    let shown = document.querySelectorAll(".config-properties .show");
                    for (let i = 0; i < shown.length; i++) {
                        shown[i].classList.remove("show");
                        shown[i].classList.add("hide");
                    }
                    optionDiv.classList.remove("hide");
                    optionDiv.classList.add("show");
                }
                e.stopPropagation();
            });
            editor.prepend(button);
            editor.prepend(title);
            document.querySelector(".config-properties .global-editor").appendChild(editor);
            button.style.width = (options.getBoundingClientRect().width + 3) + "px";
            options.classList.add("hide");
            options.style.visibility = "visible";
            // channel property editor generator
        } else if (properties[i].type === channelProperty) {
            addChannelContainer();
            let channelEditor = document.querySelector(".channel-editor");
            let channelProperty = document.createElement("DIV");
            channelProperty.className = "channel-property";
            let title = document.createElement("P");
            title.innerText = properties[i].name;
            channelProperty.appendChild(title);
            properties[i].values = new Array(currentModule.channels);
            for (let j = 0; j < currentModule.channels; j++) {
                let button = document.createElement("BUTTON");
                let options = document.createElement("DIV");
                options.className = "options";
                options.style.visibility = "hidden";
                properties[i].elements = new Array();
                for (let k = 0; k < properties[i].options.values.length; k++) {
                    if (properties[i].options.values[k].name.includes("!!!")) {
                        button.innerText = properties[i].options.values[k].name.slice(3, properties[i].options.values[k].length);
                        properties[i].values[j] = (parseInt(properties[i].options.channels[j], 16) + parseInt(properties[i].options.values[k].value, 16)).toString(16);
                    }
                    let option = document.createElement("P");
                    if (properties[i].options.values[k].name.includes("!!!")) {
                        option.innerText = properties[i].options.values[k].name.slice(3, properties[i].options.values[k].name.length);
                        option.classList.add("bold");
                    } else {
                        option.innerText = properties[i].options.values[k].name;
                    }
                    option.addEventListener("click", function (e) {
                        let selected = findOptionByName(this.innerText);
                        let property = findPropByOption(selected);
                        let options = this.parentNode.parentNode.querySelectorAll("div.options");
                        for(let i = 0; i < options.length; i++) {
                            if(options[i] === this.parentNode) {
                                property.values[i] = (parseInt(property.options.channels[i], 16) + parseInt(selected.value, 16)).toString(16);
                            }
                        }
                        updatePreview();
                        this.parentNode.classList.remove("show");
                        this.parentNode.classList.add("hide");
                        this.parentNode.previousElementSibling.innerText = this.innerText;
                        addArrow(this.parentNode.previousElementSibling);
                        e.stopPropagation();
                    });
                    options.appendChild(option);
                    properties[i].elements.push(options);
                }
                channelProperty.appendChild(button);
                channelProperty.appendChild(options);
                button.addEventListener("click", function (e) {
                    let optionDiv = this.parentNode.querySelectorAll("div.options")[j];
                    optionDiv.style.left = this.getBoundingClientRect().left + "px";
                    optionDiv.style.width = (this.getBoundingClientRect().width - 2) + "px";
                    if (optionDiv.classList.contains("show")) {
                        button.querySelector("span").innerText = "▼";
                        optionDiv.classList.remove("show");
                        optionDiv.classList.add("hide");
                    } else {
                        this.querySelector("span").innerText = "▲";
                        let shown = document.querySelectorAll(".config-properties .show");
                        for (let i = 0; i < shown.length; i++) {
                            shown[i].classList.remove("show");
                            shown[i].classList.add("hide");
                        }
                        optionDiv.classList.remove("hide");
                        optionDiv.classList.add("show");
                    }
                    e.stopPropagation();
                });
            }
            channelEditor.appendChild(channelProperty);
            for(let j = 0; j < currentModule.channels; j++) {
                let buttons = channelProperty.querySelectorAll("button");
                buttons[j].style.width = (buttons[j].nextElementSibling.getBoundingClientRect().width + 20) + "px";
                buttons[j].nextElementSibling.classList.add("hide");
                buttons[j].nextElementSibling.style.visibility = "visible";
            }
            // channel enable editor generator
        } else if (properties[i].type === channelEnable) {
            let configStart = properties[i].options.start;
            properties[i].value = (parseInt(configStart, 16) + currentModule.channels - 1).toString(16);
            addChannelContainer();
            let channelEditor = document.querySelector(".channel-editor");
            let enableProperty = document.createElement("DIV");
            enableProperty.className = "channel-property";
            let title = document.createElement("P");
            title.innerText = "Enabled";
            enableProperty.appendChild(title);
            for (let j = 0; j < currentModule.channels; j++) {
                let enable = document.createElement("DIV");
                enable.className = "checkbox";
                enable.classList.add("checked");
                enable.addEventListener("click", function () {
                    if (this.classList.contains("checked")) {
                        let checkboxes = document.querySelectorAll(".checkbox.checked");
                        if (!checkboxes[checkboxes.length - 1].isSameNode(this) || checkboxes.length === 1) {
                            alert("Channels must be enabled consecutively and start from 1.");
                            return;
                        }
                    } else {
                        let checkboxes = document.querySelectorAll("div.checkbox:not(.checked)");
                        if (!checkboxes[0].isSameNode(this)) {
                            alert("Channels must be enabled consecutively and start from 1.");
                            return;
                        }
                    }
                    if (this.classList.contains("checked")) {
                        this.classList.remove("checked");
                    } else {
                        this.classList.add("checked");
                    }
                    let enableConfig = returnChannelEnable();
                    let startValue = enableConfig.options.start;
                    let enabled = document.querySelectorAll(".checkbox.checked");
                    enableConfig.value = (parseInt(startValue, 16) + enabled.length - 1).toString(16);
                    updatePreview();
                });
                enableProperty.appendChild(enable);
            }
            if (channelEditor.children.length > 1) {
                channelEditor.prepend(enableProperty);
            } else {
                channelEditor.appendChild(enableProperty);
            }
        } else if (properties[i].type === reservedField) {
            properties[i].value = "0000";
        }
    }
    let preview = document.createElement("DIV");
    preview.className = "config-preview";
    let codeBlock = document.createElement("DIV");
    codeBlock.className = "code-block";
    let pre = document.createElement("PRE");
    let previewCode = document.createElement("CODE");
    previewCode.className = "cpp";
    previewCode.innerText = "const char " + currentModule.name.replace(/-/g, "_").toUpperCase() + "_CONFIG[] = { " + generateConfigArray() + " };";
    pre.appendChild(previewCode);
    codeBlock.appendChild(pre);
    preview.appendChild(codeBlock);
    let button = document.createElement("BUTTON");
    button.innerText = "Copy Configuration Array";
    preview.appendChild(button);
    button.addEventListener("click", function () {
        let selection = new Range();
        selection.setStartBefore(this.previousElementSibling.firstChild.firstChild.firstChild);
        selection.setEndAfter(this.previousElementSibling.firstChild.firstChild.lastChild);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(selection);
        document.execCommand("copy");
    });
    container.appendChild(preview);
    updatePreview();
    let buttons = document.querySelectorAll(".config-properties button");
    for(let i = 0; i < buttons.length; i++) {
        if(buttons[i].parentNode.className === "channel-property") {
            setTimeout(function () {
                addArrow(buttons[i]);
            }, 50);
        }
        else {
            addArrow(buttons[i]);
        }
    }
}

function generateConfigArray() {
    let configArray = new String();
    let fieldBytes = new Number();
    let reserved = new Array();
    let currentByte = -1;

    function addReserved() {
        reserved.splice(reserved.indexOf(currentByte), 1);
        currentByte++;
        configArray += ", ";
        configArray += "0x00";
    }

    for (let i = 0; i < currentModule.config.length; i++) {
        if(currentModule.config[i].type === reservedField) {
            for(let j = currentModule.config[i].options; j < currentModule.config[i].options + currentModule.config[i].bytes; j++) {
                reserved.push(j);
            }
        }
    }
    for (let i = 0; i < currentModule.config.length; i++) {
        if(currentModule.config[i].type === channelProperty) {
            fieldBytes = currentModule.config[i].bytes;
            for(let j = 0; j < currentModule.channels; j++) {
                let data = currentModule.config[i].values[j].slice(0, fieldBytes);
                if (data.length === 1) {
                    data = "0" + data;
                }
                currentByte++;
                while(reserved.includes(currentByte)) {
                    addReserved();
                }
                if(i === 0) { 
                    if(j !== 0) { configArray += ", "; } 
                }
                else {
                    configArray += ", ";
                }
                configArray += "0x" + data;

                if(fieldBytes !== 1) {
                    currentByte++;
                    while(reserved.includes(currentByte)) {
                        addReserved();
                    }
                    data = currentModule.config[i].values[j].slice(fieldBytes, fieldBytes + fieldBytes)
                    if (data.length === 1) {
                        data = "0" + data;
                    }
                    configArray += ", ";
                    configArray += "0x" + data;
                }
            }
        }
        else if(currentModule.config[i].type === reservedField) {}
        else {
            fieldBytes = currentModule.config[i].bytes;
            let data = currentModule.config[i].value.slice(0, fieldBytes);
            if (data.length === 1) {
                data = "0" + data;
            }
            currentByte++;
            while(reserved.includes(currentByte)) {
                addReserved();
            }
            if(i !== 0) { configArray += ", "; }
            configArray += "0x" + data;

            if(fieldBytes !== 1) {
                currentByte++;
                while(reserved.includes(currentByte)) {
                    addReserved();
                }
                data = currentModule.config[i].value.slice(fieldBytes, fieldBytes + fieldBytes)
                if (data.length === 1) {
                    data = "0" + data;
                }
                configArray += ", ";
                configArray += "0x" + data;
            }
        }
    }
    if(reserved.length) {
        for(let i = 0; i < reserved.length; i++) {
            if(configArray.length !== 0) { configArray += ", "; }
            configArray += "0x00";
        }
    }
    return configArray;
}

function updatePreview() {
    let moduleName = currentModule.name.replace(/-/g, "_").toUpperCase();
    let codeBlock = document.querySelector(".config-preview code");
    codeBlock.innerText = "const char " + moduleName + "_CONFIG[] = { " + generateConfigArray() + " };";
    hljs.highlightBlock(codeBlock);
}

let currentModule = {};

window.addEventListener("DOMContentLoaded", function() {

    for(let i = 0; i < sidebarLinks.length; i++) {
        let link = document.createElement("A");
        link.innerText = sidebarLinks[i].name;
        link.href = sidebarLinks[i].url;
        document.querySelector("div.sidebar-header").appendChild(link);
    }
    let linkLine = document.createElement("DIV");
    linkLine.className = "line";
    document.querySelector("div.sidebar-header").appendChild(linkLine);

    function generateCategory(category) {
        let li = document.createElement("LI");
        li.className = "sidebar-category";

        let text = document.createElement("P");
        text.innerText = category.name;
        li.appendChild(text);

        let moduleList = document.createElement("UL");
        moduleList.className = "category-content";
        let included = false;
        let title = document.title;
        for (let i = 0; i < category.modules.length; i++) {
            if (title.includes(category.modules[i].name)) {
                included = true;
            }
        }
        if (included) {
            moduleList.style.display = "block";
			li.classList.add("open");
        } else {
            moduleList.style.display = "none";
			li.classList.add("closed");
        }

        for (let i = 0; i < category.modules.length; i++) {
            let list = document.createElement("LI");
            let link = document.createElement("A");
            link.innerText = category.modules[i].name;
            if (!title.includes("|")) {
                link.href = "modules/" + category.modules[i].name + "/" + category.modules[i].name + ".html";
            } else {
                if (title.includes(category.modules[i])) {
                    link.href = "#";
                } else {
                    link.href = "../" + category.modules[i].name + "/" + category.modules[i].name + ".html";
                }
            }
            list.appendChild(link);
            moduleList.appendChild(list);
        }
        li.appendChild(moduleList);
        document.querySelector(".sidebar-content").appendChild(li);
        let line = document.createElement("DIV");
        line.className = "line";
        li.parentNode.insertBefore(line, li.nextSibling);
    }

    for (let i = 0; i < modules.length; i++) {
        generateCategory(modules[i]);
    }
	
	let copyRight = document.createElement("DIV");
	copyRight.id = "copyright";
	copyRight.innerText = "\u00A9 2020 FACTS Engineering";
	document.querySelector("ul.sidebar-content").appendChild(copyRight);
	

    let categories = document.querySelectorAll(".sidebar-category p");
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener("click", function () {
            if (this.nextElementSibling.style.display === "none") {
				this.parentNode.classList.remove("closing");
				this.parentNode.classList.remove("closed");
				this.parentNode.classList.add("opening");
				this.parentNode.classList.add("open");
                this.nextElementSibling.style.display = "block";
            } else if (this.nextElementSibling.style.display === "block") {
                this.parentNode.classList.remove("opening");
				this.parentNode.classList.remove("open");
				this.parentNode.classList.add("closing");
				this.parentNode.classList.add("closed");
				this.nextElementSibling.style.display = "none";
            }
        });
    }
	
    let links = document.querySelectorAll(".category-content li");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("mousedown", function (e) {
            if(e.button === 0) {
                this.firstChild.click();
            }
            else if(e.button === 1) {
                window.open(this.firstChild.href);
                window.focus();
            }
        });
    }
	

    if (document.title.includes("|")) {

        document.addEventListener("click", function () {
            let shown = document.querySelectorAll(".config-properties .show");
            for (let i = 0; i < shown.length; i++) {
                shown[i].classList.remove("show");
                shown[i].classList.add("hide");
                shown[i].previousElementSibling.querySelector("span").innerText = "▼";
            }
        });

        currentModule.name = document.title.slice(0, document.title.indexOf("|") - 1);
        for (let i = 0; i < modules.length; i++) {
            for (let j = 0; j < modules[i].modules.length; j++) {
                if (modules[i].modules[j] === getPageByName(currentModule.name)) {
                    currentModule = modules[i].modules[j];
                    document.documentElement.style.setProperty("--img-width", currentModule.imageWidth);
                    if (modules[i].modules[j].config === undefined) {
                        // let none = document.createElement("P");
                        // none.innerText = "This module does not require any configuration.";
                        // document.querySelector(".config").appendChild(none);
                    } else {
                        let editorDescription = document.createElement("P");
                        editorDescription.innerText = "This is an interactive tool to generate this module's configuration byte array. All default properties are denoted in bold in their respective dropdowns."
                        let line = document.querySelector(".config .line");
                        line.parentNode.insertBefore(editorDescription, line.nextSibling);
                        generateConfigTool(modules[i].modules[j].config, document.querySelector(".config"));
                    }
                }
            }
        }
    }

});