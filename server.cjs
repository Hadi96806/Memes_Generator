const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/download-image", async (req, res) => {
  try {
    const imageUrl = "URL_OF_THE_IMAGE_API"; // Replace with the actual API URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const imageName = "downloaded-image.jpg"; // Specify the image name
    const imagePath = path.join(__dirname, "images", imageName);

    fs.writeFileSync(imagePath, response.data);

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).send("Error downloading image");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
