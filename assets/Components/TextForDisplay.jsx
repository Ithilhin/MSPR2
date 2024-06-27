import React, { useState, useEffect } from "react";
import textsAPI from "../Services/textsAPI";

export default function aTextForDisplay({ page }) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    textsAPI
      .getTexts()
      // .then((data) => data.filter((text) => text.Page === page))
      .then((data) => {
        const filteredData = data.filter((text) => {
          return text.page === page;
        });

        return filteredData;
      })
      .then((data) => setTexts(data))
      .catch((error) => console.log(error.response));
    setLoading(false);
  }, []);

  return (
    <>
      {console.log("from return", texts)}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        texts.map((text, index) => (
          <div key={index} className="text-container">
            <p className="my-5" dangerouslySetInnerHTML={{ __html: text.text }}></p>
          </div>
        ))
      )}
    </>
  );
}
