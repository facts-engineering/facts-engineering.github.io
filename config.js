let moduleList = new Array();
for (let i = 0; i < modules.length; i++) {
    for (let j = 0; j < modules[i].modules.length; j++) {
        if (modules[i].modules[j].config !== undefined) {
            moduleList.push(modules[i].modules[j]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let button = document.createElement("BUTTON");
    button.innerText = moduleList[0].name;
    button.addEventListener("click", function (e) {
        let optionDiv = this.parentNode.querySelector("div.options");
        optionDiv.style.left = this.getBoundingClientRect().left + "px";
        optionDiv.style.width = this.getBoundingClientRect().width + "px";
        if (optionDiv.classList.contains("show")) {
            optionDiv.classList.remove("show");
            optionDiv.classList.add("hide");
        } else {
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
    let options = document.createElement("DIV");
    options.className = "options";
    options.style.visibility = "hidden";
    for (let i = 0; i < moduleList.length; i++) {
        let option = document.createElement("P");
        option.innerText = moduleList[i].name;
        option.addEventListener("click", function (e) {
            this.parentNode.classList.remove("show");
            this.parentNode.classList.add("hide");
            this.parentNode.previousElementSibling.innerText = this.innerText;
            for (let i = 0; i < moduleList.length; i++) {
                if (this.innerText === moduleList[i].name) {
                    let configNode = document.querySelector("#configTool");
                    while (configNode.children.length !== 0) {
                        configNode.removeChild(configNode.children[0]);
                    }
                    currentModule = moduleList[i];
                    generateConfigTool(currentModule.config, configNode);
                    let currentImage = document.querySelector("#configImg");
                    currentImage.parentNode.removeChild(currentImage)
                    let imageSrc = "modules/" + currentModule.name + "/" + currentModule.name + "_STRAIGHTON.png";
                    let image = document.createElement("IMG");
                    image.src = imageSrc;
                    image.id = "configImg";
                    image.style.width = "275px";
                    configNode.parentNode.insertBefore(image, configNode.nextSibling);
                }
            }
            e.stopPropagation();
        });
        options.appendChild(option);
    }
    let listLoc = document.querySelector("#moduleList");
    listLoc.appendChild(button);
    button.parentNode.insertBefore(options, button.nextSibling);
    button.style.width = (options.getBoundingClientRect().width + 3) + "px";
    options.classList.add("hide");
    options.style.visibility = "visible";

    document.addEventListener("click", function () {
        let shown = document.querySelectorAll(".show");
        for (let i = 0; i < shown.length; i++) {
            shown[i].classList.remove("show");
            shown[i].classList.add("hide");
        }
    });
    let configTool = document.querySelector("#configTool");
    currentModule = moduleList[0];
    generateConfigTool(currentModule.config, configTool);

    let imageSrc = "modules/" + currentModule.name + "/" + currentModule.name + "_STRAIGHTON.png";
    let image = document.createElement("IMG");
    image.src = imageSrc;
    image.id = "configImg";
    configTool.parentNode.insertBefore(image, configTool.nextSibling);

});