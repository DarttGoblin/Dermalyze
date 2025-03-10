const file_input = document.querySelector('.file-input');
const take_image = document.querySelector('.take-image');
const result = document.querySelector('.result');



function UploadImage() {

}

function TakeImage() {
    const cameraInput = document.createElement('input');

    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'environment';
    cameraInput.style.display = 'none';

    take_image.addEventListener('click', () => cameraInput.click());
    cameraInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '200px';
                img.style.height = '200px';
                document.body.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
}

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (!isMobile()) {
    take_image.classList.add('hide-take-image');
    take_image.disabled = true;
}