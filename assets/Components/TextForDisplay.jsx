import React, { useState, useEffect } from "react";
import textsAPI from "../Services/textsAPI";

export default function TextForDisplay({ page }) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    textsAPI
      .getTexts()
      .then((data) => {
        const filteredData = data.filter((text) => {
          console.log("from useEffect in TextForDisplay", text.page, page);
          return text.Page === page;
        });

        return filteredData;
      })
      .then((data) => setTexts(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
    console.log("from useEffect in TextForDisplay", texts);
  }, []);

  return (
    <>
      {console.log("from return in TextForDisplay", texts)}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        texts.map((text, index) => (
          <div key={index} className="text-container">
            <p
              className="my-5"
              dangerouslySetInnerHTML={{ __html: text.text }}
            ></p>
          </div>
        ))
      )}
    </>
  );
}
