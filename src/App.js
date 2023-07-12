import React, { useRef } from "react";

function CanvasPixelDataDownload() {
  const canvasRef = useRef(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const character = "A"; // Replace with your desired character
    const fontFamily = "Arial"; // Replace with your desired font family
    const fontColor = "#FF0000"; // Replace with your desired font color (e.g., red)

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    context.fillStyle = "#FFF"; // Set canvas background color (e.g., white)
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.fillStyle = fontColor;
    context.font = "bold 16px " + fontFamily;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(character, canvasWidth / 2, canvasHeight / 2);

    const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = imageData.data;

    let pixelData = "";

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const hexColor = rgbToHex(r, g, b);
      pixelData += hexColor + "\n";
    }

    const blob = new Blob([pixelData], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "pixel_data.txt";
    downloadLink.click();
  };

  // Convert RGB color values to hex format
  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return (
    <div>
      <canvas ref={canvasRef} width={16} height={34} style={{ border: "1px solid #000" }}></canvas>
      <br />
      <button onClick={handleDownload}>Download Pixel Data</button>
    </div>
  );
}

export default CanvasPixelDataDownload;
