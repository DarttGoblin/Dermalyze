const file_input = document.querySelector('.file-input');
const take_image = document.querySelector('.take-image');
const analyse_skin = document.querySelector('.analyse-skin');
const gender_select = document.querySelector('.gender-select');
const age_select = document.querySelector('.age-select');
const region_select = document.querySelector('.region-select');
const result_container = document.querySelector('.result-container');
const preview = document.querySelector('.preview');

const age_range = [10, 90];
const gender_option = ['Male', 'Female'];
const region_option = ['Head/Neck', 'Upper Limb', 'Lower Limb', 'Torso', 'Palm/Sole', 'Nail', 'Genital Area', 'Unknown/Other'];

GenerateOptions();
UploadImage();
TakeImage();

analyse_skin.onclick = function() {
    if (CheckValidInput()) {
        SendToModel();
    } else {
        alert('Something is missing...');
    }
}

function SendToModel() {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log()
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your text! Please try again.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with the server! Please try again.');
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
    ) {
        return true;
    }
    else {return false;}
}