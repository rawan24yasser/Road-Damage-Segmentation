const imageInput = document.getElementById("imageInput");

const fileName = document.getElementById("fileName");

const analyzeBtn = document.getElementById("analyzeBtn");

const originalImage = document.getElementById("originalImage");

const resultImage = document.getElementById("resultImage");

const originalPlaceholder =
    document.getElementById("originalPlaceholder");

const resultPlaceholder =
    document.getElementById("resultPlaceholder");

const loading =
    document.getElementById("loading");

const detectionInfo =
    document.getElementById("detectionInfo");

const status =
    document.getElementById("status");

const downloadBtn =
    document.getElementById("downloadBtn");


let resultImageURL = null;


/* =========================
   Choose Image
========================= */

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    fileName.textContent = file.name;


    // Show original image

    const imageURL =
        URL.createObjectURL(file);

    originalImage.src = imageURL;

    originalImage.style.display = "block";

    originalPlaceholder.style.display = "none";


    // Clear previous result

    resultImage.src = "";

    resultImage.style.display = "none";

    resultPlaceholder.style.display = "block";


    detectionInfo.style.display = "none";

    downloadBtn.style.display = "none";
});


/* =========================
   Analyze Image
========================= */

analyzeBtn.addEventListener("click", async function () {

    const file = imageInput.files[0];


    if (!file) {

        alert("Please choose an image first.");

        return;
    }


    // Disable button

    analyzeBtn.disabled = true;

    analyzeBtn.textContent = "Analyzing...";


    // Show loading

    loading.style.display = "block";


    try {

        // Create FormData

        const formData = new FormData();

        formData.append("file", file);


        // Send image to FastAPI

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",
                body: formData
            }
        );


        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );
        }


        const data = await response.json();


        if (!data.success) {

            throw new Error(
                data.message || "Prediction failed."
            );
        }


        // =========================
        // Show AI Result
        // =========================

        resultImageURL =
            "data:image/jpeg;base64," +
            data.image;


        resultImage.src =
            resultImageURL;

        resultImage.style.display =
            "block";

        resultPlaceholder.style.display =
            "none";


        // =========================
        // Detection Info
        // =========================

        detectionInfo.style.display =
            "block";

        status.textContent =
            "Damage Detected";


        // =========================
        // Download Button
        // =========================

        downloadBtn.style.display =
            "block";


    } catch (error) {

        console.error(error);

        alert(
            "Error: " + error.message
        );

    } finally {

        // Hide loading

        loading.style.display =
            "none";


        // Enable button

        analyzeBtn.disabled =
            false;

        analyzeBtn.textContent =
            "Analyze Image";
    }

});


/* =========================
   Download Result
========================= */

downloadBtn.addEventListener(
    "click",
    function () {

        if (!resultImageURL) {
            return;
        }


        const link =
            document.createElement("a");

        link.href =
            resultImageURL;

        link.download =
            "road_damage_result.jpg";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
);