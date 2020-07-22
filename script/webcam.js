var input;
var imageCapture;

function avviaWebcam() {
    input = document.querySelector('input[type="range"]');
    navigator.mediaDevices.getUserMedia({video: { facingMode: { exact: "environment" } } })
    .then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream;

      const track = mediaStream.getVideoTracks()[0];
      imageCapture = new ImageCapture(track);

      return imageCapture.getPhotoCapabilities();
    })
    .then(photoCapabilities => {
      const settings = imageCapture.track.getSettings();

      input.min = photoCapabilities.imageWidth.min;
      input.max = photoCapabilities.imageWidth.max;
      input.step = photoCapabilities.imageWidth.step;

      return imageCapture.getPhotoSettings();
    })
    .then(photoSettings => {
      input.value = photoSettings.imageWidth;
    })
    .catch(error => alert('Argh!' + error));

    document.querySelector('video').addEventListener('play', function() {
      document.querySelector('#takePhotoButton').disabled = false;
    });
}

function onTakePhotoButtonClick() {
  imageCapture.takePhoto({imageWidth: input.value})
  .then(blob => createImageBitmap(blob))
  .then(imageBitmap => {
    drawCanvas(imageBitmap);
  })
  .catch(error => alert(error));
  document.querySelector('#scatto').play();
}

/* Utils */

function drawCanvas(img) {
  const canvas = document.querySelector('canvas');
  canvas.style.width = "600px";
  canvas.style.height = "600px";
  canvas.width = getComputedStyle(canvas).width.split('px')[0];
  canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
      x, y, img.width * ratio, img.height * ratio);

  getCodiceQR(img.width, img.height);
}

function getCodiceQR(w, h) {
    var canvas = document.querySelector('canvas');
    var tela = canvas.getContext("2d");
    var imageData = tela.getImageData(0, 0, w, h);
    canvas.style.width = 0;
    canvas.style.height = 0;
    const code = jsQR(imageData.data, w, h);
    if (code) {
      visualizzaReperto(code.data);
    }
    else {
      alert("Nessun codice trovato. Riprova.");
    }
}
