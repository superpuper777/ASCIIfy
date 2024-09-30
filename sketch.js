let img;
let fileInput;
let downloadButton;
let downloadJpegButton;
let fakeButton;

function setup() {
  fileInput = createFileInput(handleFile);
  fileInput.position(-1000, -1000);

  fakeButton = createButton('Загрузить файл');
  fakeButton.position(10, 10);

  fakeButton.style('background-color', 'transparent');
  fakeButton.style('color', '#fff');
  fakeButton.style('padding', '10px 20px');
  fakeButton.style('border', '1px solid white');
  fakeButton.style('border-radius', '5px');
  fakeButton.style('cursor', 'pointer');

  fakeButton.mousePressed(() => fileInput.elt.click());

  noLoop();

  downloadButton = createButton('Скачать изображение');
  downloadButton.position(10, 70, 'fixed');
  downloadButton.hide();
  downloadButton.mousePressed(saveImage);

  downloadJpegButton = createButton('Скачать изображение (JPEG)');
  downloadJpegButton.position(10, 110, 'fixed');
  downloadJpegButton.hide();
  downloadJpegButton.mousePressed(saveAsJpeg);

  loadingSpinner = createDiv('Загрузка...');
  loadingSpinner.style('font-size', '24px');
  loadingSpinner.style('color', 'white');
  loadingSpinner.style('position', 'absolute');
  loadingSpinner.style('top', '50%');
  loadingSpinner.style('left', '50%');
  loadingSpinner.style('transform', 'translate(-50%, -50%)');
  loadingSpinner.style('background-color', 'rgba(0, 0, 0, 0.5)');
  loadingSpinner.style('padding', '20px');
  loadingSpinner.style('border-radius', '10px');
  loadingSpinner.hide();
}

function draw() {
  clear();
  if (img) {
    img.loadPixels();
    let pixelSize = 8;
    let spacing = 2;

    const density = 'Ñ@#W$9876543210?!abc;:+=-,._  ';
    for (let y = 0; y < img.height; y += pixelSize + spacing) {
      for (let x = 0; x < img.width; x += pixelSize + spacing) {
        let c = img.get(x, y);
        fill(c);
        noStroke();

        let avg = (red(c) + green(c) + blue(c)) / 3;
        let charIndex = floor(map(avg, 0, 255, density.length - 1, 0));
        let asciiChar = density.charAt(charIndex);

        textSize(pixelSize);
        textAlign(CENTER, CENTER);
        fill(c);
        text(
          asciiChar,
          x + (pixelSize + spacing) / 2,
          y + (pixelSize + spacing) / 2
        );

        stroke(0);
        strokeWeight(1);
        text(
          asciiChar,
          x + (pixelSize + spacing) / 2,
          y + (pixelSize + spacing) / 2
        );
        noStroke();
      }
    }
  }
}

function handleFile(file) {
  if (file && file.type === 'image') {
    loadingSpinner.show();

    img = loadImage(file.data, () => {
      let imgWidth = img.width;
      let imgHeight = img.height;

      resizeCanvas(imgWidth, imgHeight);
      redraw();

      loadingSpinner.hide();
      downloadButton.show();
      downloadJpegButton.show();
    });
  }
}

function saveImage() {
  saveCanvas('pixel_image', 'png');
}

function saveAsJpeg() {
  let canvas = document.querySelector('canvas');
  let dataURL = canvas.toDataURL('image/jpeg', 0.8);

  let link = document.createElement('a');
  link.href = dataURL;
  link.download = 'pixel_image.jpg';

  link.click();
}
