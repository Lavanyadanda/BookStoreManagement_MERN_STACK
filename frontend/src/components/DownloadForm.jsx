import { useState } from "react";
import axios from "axios";

const DownloadForm = ({ book }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleDownload = async () => {
    if (!userName || !userEmail) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5555/api/downloads", {
        userName,
        userEmail,
        bookTitle: book.title,
        bookId: book._id,
      });

      window.open(book.pdfUrl, "_blank"); // download the PDF
    } catch (err) {
      alert("Error while downloading.");
      console.error(err);
    }
  };

  return (
    <div className="mt-2 border p-2 rounded">
      <input
        className="border p-2 mr-2 mb-4"
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="border p-1 mr-2"
        type="email"
        placeholder="Your Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadForm;
