document.getElementById("SendButton").addEventListener("click", function () {
    var Input = document.getElementById("message");
    var text = Input.value.trim();
    if (text === "") return;

    var fileInput = document.getElementById("image");
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            createMessage(text, e.target.result);
            saveDiv(text, e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        createMessage(text, null);
        saveDiv(text, null);
    }

    Input.value = "";
});

function createMessage(text, imageData) {
    var DivCont = document.createElement("div");
    var Newtext = document.createElement("label");
    var NewImage = document.createElement("img");

    DivCont.style.backgroundColor = "rgba(0, 0, 0, 0.324)";
    DivCont.style.display = "flex";
    DivCont.style.alignItems = "center";
    DivCont.style.justifyContent = "center";
    DivCont.style.alignSelf = "center";
    DivCont.style.margin = "30px auto";
    DivCont.style.boxShadow = "0px 0px 10px rgb(255, 255, 255)";
    DivCont.style.borderRadius = "10px";
    DivCont.style.flexDirection = "column";
    DivCont.style.width = "60%";
    DivCont.style.height = "auto";
    DivCont.style.padding = "10px";

    Newtext.style.fontSize = "30px";
    Newtext.style.textShadow = "0px 0px 20px rgb(255, 255, 255)";
    Newtext.textContent = text;

    if (imageData) {
        NewImage.src = imageData;
        NewImage.style.width = "100px";
        NewImage.style.height = "100px";
        DivCont.appendChild(NewImage);
    }

    DivCont.appendChild(Newtext);
    document.getElementById("Messages").appendChild(DivCont);

    var emptyBox = document.getElementById("EmptyBox");
    if (emptyBox) emptyBox.remove();
}

function saveDiv(text, imageData) {
    let messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push({ text: text, image: imageData });

    // Tieni solo gli ultimi 10
    if (messages.length > 10) {
        messages = messages.slice(-10);
    }

    localStorage.setItem("messages", JSON.stringify(messages));

    // Rimuovi eventuali messaggi in più dal DOM
    const messageContainer = document.getElementById("Messages");
    while (messageContainer.children.length > 10) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
}

window.onload = function () {
    let messages = JSON.parse(localStorage.getItem("messages") || "[]");

    var emptyBox = document.getElementById("EmptyBox");
    if (emptyBox) emptyBox.remove();

    messages.slice(-10).forEach(function (message) {
        createMessage(message.text, message.image);
    });
};
