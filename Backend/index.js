const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins
const port = 4000; // Port for the backend server


// Set up storage engine with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder where files will be saved
    const uploadPath = '/home/shruti/Desktop/testAing/llm_pipeline/dataset';
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // saved file name in dataset folder
    cb(null, `${file.originalname}`);
  },
});


const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    res.status(400).send('Error uploading file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
