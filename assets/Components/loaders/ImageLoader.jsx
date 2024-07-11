import React from 'react'
import ContentLoader from 'react-content-loader'

// Defines a functional component named ImageLoader that takes props as an argument.
const ImageLoader = props => {
  // Returns the ContentLoader component configured to display a custom SVG loading animation.
  return (
    <ContentLoader 
      viewBox="0 0 800 400" // Sets the view box of the SVG, defining the area of the scene.
      height={150} // Sets the height of the SVG element.
      width={150} // Sets the width of the SVG element.
      {...props} // Spreads the rest of the props onto the ContentLoader component.
    >
      // Defines a custom path to simulate the shape of an image or content area.
      <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
      // Defines an ellipse to simulate a circular element, such as a profile picture or logo.
      <ellipse cx="27.53" cy="26.15" rx="27.53" ry="26.15" />
      // Defines multiple rectangles to simulate text lines or content blocks within the loading animation.
      <rect x="69.36" y="0.5" width="87.36" height="16.48" rx="4.5" />
      <rect x="0.53" y="328.35" width="87.36" height="16.48" rx="4.5" />
      <rect x="95.84" y="328.35" width="87.36" height="16.48" rx="4.5" />
      <rect x="195.38" y="328.35" width="304.45" height="16.48" rx="4.5" />
      <rect x="412.47" y="358.52" width="87.36" height="16.48" rx="4.5" />
      <rect x="291.22" y="358.52" width="113.31" height="16.48" rx="4.5" />
      <rect x="0.53" y="358.52" width="282.21" height="16.48" rx="4.5" />
      <rect x="69.36" y="25.22" width="164.67" height="27.07" rx="3.83" />
    </ContentLoader>
  )
}

// Exports the ImageLoader component as the default export of this module.
export default ImageLoader