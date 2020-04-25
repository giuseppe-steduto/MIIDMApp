var qrCodeScanner; //Usa il riconoscimento direttamente del telefono

function avviaWebcam() {
    input = document.querySelector('input[type="range"]');
    navigator.mediaDevices.getUserMedia({video: { facingMode: { exact: "environment" } } })
    .then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream;
      document.querySelector('#takePhotoButton').disabled = false;
    })
    .catch(err => {
        alert("OPS! Errore: " + err);
    });
}

function onTakePhotoButtonClick() {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(document.querySelector('video'), 0, 0);

    scannerizzaQrCode(canvas, context);
}

function scannerizzaQrCode(image, contesto) {
    if ('BarcodeDetector' in window) {
        alert("Questo telefono è figo");
        try {
            qrCodeScanner = new BarcodeDetector({formats: ['qr_code']});
            qrCodeScanner.detect(image)
            .then(barcodes => {
                alert("QR Code: " + barcodes[0]);
            })
            .catch(err => {
                alert("Errore nella scansione del QR!" + err);
            });
        } catch (e) {
            alert('QR Code detection failed:' + e);
        }
        return;
    }

    //BarcodeDetector non supportato. Usa la libreria.
    var imageData = contesto.getImageData(0, 0, image.width, image.height);
    const code = jsQR(imageData.data, image.width, image.height);
    if (code) {
      alert(code.data);
    }
    else {
      alert("Nessun codice trovato. Riprova.");
    }
}
