import React, { useState, useEffect } from "react";
import textsAPI from "../Services/textsAPI";
import TextLoader from "./loaders/TextLoader";

export default function TextForDisplay({ page }) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    textsAPI
      .getTexts()
      .then((data) => {
        const filteredData = data.filter((text) => {
          return text.Page === page;
        });

        return filteredData;
      })
      .then((data) => {
        setTexts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <TextLoader/>
      ) : (
        texts.map((text, index) => (
          <div key={index} className="text-container">
            <p
              className="m-5 mt-0"
              dangerouslySetInnerHTML={{ __html: text.text }}
            ></p>
          </div>
        ))
      )}
    </>
  );
}
