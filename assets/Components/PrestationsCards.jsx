import React from 'react'
import Card from 'react-bootstrap/Card';

function PrestationsCards({ title, index}) {
  return (
    <div key={index} className="col-lg col-8 position-relative m-auto h-400">
            <p className="fw-bold vertical-text mt-4">{title}</p>
            <div
              className="darkBackground animatedBackground h-100 bg-dark"
              style={{ opacity: "0.5" }}
            ></div>
            <img
              className="object-fit-cover w-100 h-100"
              src={`./image/presta${index+1}.jpg`}
              alt=""
            />
          </div>
    // <Card className="bg-dark text-white">
    //   <Card.Img src="./image/carousel1.jpg" alt="Card image" />
    //   <Card.ImgOverlay>
    //     <Card.Title>Card title</Card.Title>
    //     <Card.Text>
    //       This is a wider card with supporting text below as a natural lead-in
    //       to additional content. This content is a little bit longer.
    //     </Card.Text>
    //     <Card.Text>Last updated 3 mins ago</Card.Text>
    //   </Card.ImgOverlay>
    // </Card>
  );
}

export default PrestationsCards;