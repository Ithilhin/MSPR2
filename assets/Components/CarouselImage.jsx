import React, { useEffect, useState } from "react";

export default function CarouselImage({ src, alt }) {
  return (
    <img src={src} className="d-block h-75 rounded" alt={alt} />
  );
}
