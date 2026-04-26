import { useState } from "react";
import axios from "axios";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDesc", jobDesc);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);
      alert("Backend connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>AI Resume Analyzer 🚀</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          style={styles.input}
        />

        <textarea
          placeholder="Paste Job Description Here..."
          rows="6"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div style={styles.result}>
            <h3>Result</h3>
            <p><strong>Score:</strong> {result.score}%</p>
            <p><strong>Matched Skills:</strong> {result.matched.join(", ")}</p>
            <p><strong>Missing Skills:</strong> {result.missing.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "420px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "15px",
    width: "100%",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    background: "#eef2ff",
    padding: "15px",
    borderRadius: "8px",
  },
};

export default App;