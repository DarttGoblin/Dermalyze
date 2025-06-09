const file_input = document.querySelector('.file-input');
const take_image = document.querySelector('.take-image');
const analyse_skin = document.querySelector('.analyse-skin');
const gender_select = document.querySelector('.gender-select');
const age_select = document.querySelector('.age-select');
const region_select = document.querySelector('.region-select');
const result_container = document.querySelector('.result-container');
const preview = document.querySelector('.preview');
const prediction_value = document.querySelector('.prediction-value');
const confidence_value = document.querySelector('.confidence-value');

const age_range = [5, 85];
const gender_option = ['Male', 'Female'];
const region_option = ['back', 'lower extremity', 'trunk', 'upper extremity', 'abdomen', 'face', 
                       'chest', 'foot', 'neck', 'scalp', 'hand', 'ear', 'genital', 'acral'];
const cancer_labels = ['Melanoma', 'Basal Cell Carcinoma', 'Actinic Keratoses'];

GenerateOptions();
UploadImage();
TakeImage();

analyse_skin.onclick = function() {
    if (CheckValidInput()) {
        const age = age_select.value;
        const gender = gender_select.value;
        const region = region_select.value;
        const imgPreview = preview;
        analyse_skin.textContent = 'Analysing...';
        SendToModel(age, gender, region, imgPreview);
    } else {
        alert('Something is missing...');
    }
}

function SendToModel(age, gender, region, preview) {
    const formData = new FormData();

    fetch(preview.src)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "image.jpg", { type: blob.type });

            formData.append("image", file);
            formData.append("age", age);
            formData.append("sex", gender.toLowerCase());
            formData.append("localization", region);

            fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                analyse_skin.textContent = 'Analyse';

                if ('abnormal' in data && 'prediction' in data && 'confidence' in data) {
                    if (data.abnormal === false) {
                        let confidencePercent = 100 - (data.confidence * 100).toFixed(2) + '%';
                        prediction_value.textContent = 'Not Cancer';
                        confidence_value.textContent = confidencePercent;
                        result_container.style.display = 'flex';
                    } else {
                        let confidencePercent = (data.confidence * 100).toFixed(2) + '%';
                        prediction_value.textContent = 'Cancer Type: ' + data.prediction;
                        confidence_value.textContent = confidencePercent;
                        result_container.style.display = 'flex';
                    }
                } else {
                    console.error('Unexpected response structure:', data);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('The model is not hosted yet, will be soon, check demo for the moment, to see how things are going!');
                analyse_skin.textContent = 'Analyse';
            });
        });
}

function UploadImage() {
    file_input.onchange = function(event) {
        let file = event.target.files[0];
        if (file) {
            if (!file || !file.type.startsWith("image/")) {return;}

            let reader = new FileReader();
            console.log("File Name:", file.name);
            console.log("File Type:", file.type);
            reader.onload = function(e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
}

function TakeImage() {
    const cameraInput = document.createElement('input');

    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'environment';
    cameraInput.style.display = 'none';

    take_image.onclick = function() {cameraInput.click();}
    cameraInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (!isMobile()) {
    take_image.classList.add('hide-take-image');
    take_image.disabled = true;
}

function GenerateOptions() {
    // Age Options
    for (i = age_range[0]; i < age_range[1] + 1; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        age_select.appendChild(option);
    }

    // Gender Options
    gender_option.forEach(gender => {
        const option = document.createElement('option');
        option.value = gender;
        option.textContent = gender;
        gender_select.appendChild(option);
    });

    // Region Options
    region_option.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        region_select.appendChild(option);
    });
}

function CheckValidInput() {
    if (age_select.value != '' && 
        gender_select.value != '' && 
        region_select.value != '' &&
        preview.src != ''
    ) { return true;} else {return false;}
}
