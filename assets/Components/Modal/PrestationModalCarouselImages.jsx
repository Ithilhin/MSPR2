import React from "react";

export default function PrestationModalCarouselImages({ src, alt }) {
  return (
    <img src={src} className="d-block h-75 rounded" alt={alt} />
  );
}
