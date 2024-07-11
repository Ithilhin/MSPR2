import React, { useState, useEffect } from "react";
import textsAPI from "../Services/textsAPI";
import TextLoader from "./loaders/TextLoader";

// Define the TextForDisplay functional component that displays texts based on the provided page prop
export default function TextForDisplay({ page }) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    textsAPI
      .getTexts()
      .then((data) => {
        const filteredData = data.filter((text) => {
          return text.Page === page; // Filter texts to include only those related to the current page
        });

        return filteredData;
      })
      .then((data) => {
        setTexts(data);
        setLoading(false); // Set loading to false as data fetching is complete
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false); // Ensure loading is set to false in case of error
      });
  }, []);

  return (
    <>
      {loading ? (
        <TextLoader /> // Display the loader while texts are loading
      ) : (
        texts.map((text, index) => (
          <div key={index} className="text-container">
            <p
              className="m-5 mt-0"
              dangerouslySetInnerHTML={{ __html: text.text }} // Render the text as HTML
            ></p>
          </div>
        ))
      )}
    </>
  );
}
