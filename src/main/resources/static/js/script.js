const URL = "https://teachablemachine.withgoogle.com/models/VjokMtC1c/";

let model, webcam, labelContainer, maxPredictions, isProcessing = false;

async function start() {
    if (!isProcessing) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        const flip = true;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            const labelElement = document.createElement("div");
            labelElement.classList.add("label");
            labelContainer.appendChild(labelElement);
        }

        isProcessing = true;
    }
}

function stop() {
    if (isProcessing) {
        webcam.stop();
        isProcessing = false;
    }
}

async function loop() {
    if (isProcessing) {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
