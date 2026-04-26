const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage()
});

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const data = await pdfParse(req.file.buffer);

    const resumeText = data.text.toLowerCase();
    const jobDesc = req.body.jobDesc.toLowerCase();

    const skills = [
      "javascript",
      "react",
      "node",
      "mongodb",
      "html",
      "css",
      "python",
      "java",
      "sql"
    ];

    let matched = [];
    let missing = [];

    skills.forEach((skill) => {
      if (jobDesc.includes(skill)) {
        if (resumeText.includes(skill)) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }
      }
    });

    let score = 0;

    if (matched.length > 0) {
      score = Math.round(
        (matched.length / (matched.length + missing.length)) * 100
      );
    }

    res.json({
      score,
      matched,
      missing
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error analyzing resume"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});