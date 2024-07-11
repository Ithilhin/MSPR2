import React from 'react'
import ContentLoader from 'react-content-loader'

// Defines a functional component named CardLoader that takes props as an argument.
// This component is designed to display a placeholder loading animation, mimicking the layout of a card.
const CardLoader = props => (
  // Uses the ContentLoader component to create a customizable SVG loading animation.
  // The viewBox attribute defines the position and dimension of the SVG canvas.
  <ContentLoader viewBox="0 0 400 475" height={475} width={400} {...props}>
    // Defines a circle element to represent an avatar or profile picture in the card layout.
    <circle cx="30" cy="258" r="30" />
    // Defines a rectangle element to represent a title or heading in the card layout.
    <rect x="75" y="233" rx="4" ry="4" width="100" height="13" />
    // Defines a smaller rectangle element to represent a subtitle or additional information.
    <rect x="75" y="260" rx="4" ry="4" width="50" height="8" />
    // Defines a thin rectangle at the top of the card, possibly to represent a loading state for a progress bar or a separator.
    <rect x="0" y="210" rx="5" ry="5" width="400" height="10" />
    // Defines a large rectangle to represent the main content area of the card, such as an image or a large block of text.
    <rect x="0" y="0" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
)

// Exports the CardLoader component as the default export of this module.
export default CardLoader;