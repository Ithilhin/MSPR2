import React from "react";

export default function CarouselDisplayImages({ src, alt }) {
  return [<img src={src} className="d-block h-75 rounded" alt={alt} />] ;
}
