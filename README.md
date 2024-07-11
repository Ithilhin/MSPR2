# Canopées Showcase Website Project

This repository hosts the showcase website project for Canopées, a fictional company founded in 2020 by Bob and Tom, who are passionate about nature. Canopées specializes in designing, creating, and maintaining green spaces for individuals, businesses, and local governments. Their services range from the design and creation of green spaces to maintenance, hedge trimming, tree pruning and felling, and the valorization of green waste through composting.

As part of my Web and Mobile Web Developer (DWWM) training, this project serves as both an evaluation tool and a practical application of the skills I've acquired. Canopées enlisted my expertise to develop a showcase website tailored to their unique requirements. The goal of this project is to deliver an engaging and user-friendly online platform that enables visitors to explore the services Canopées offers, view project portfolios, and reach out to the company for quotes or further information.

## Project Objectives

- **Responsive and Aesthetic Design:** To create a website that is both visually appealing and functional across all devices.
- **Secure Administrator Section:** Implement a login-secured admin area, allowing Bob and Tom to update site content and images independently.

## Technologies Used

- **Back-end Development:** Utilized Symfony for API development and data management, incorporating Easy Admin for streamlined administration.
- **Front-end Development:** Employed React to craft dynamic and responsive user interfaces.
- **Database and Other Tools:** Doctrine for database management, PHPMyAdmin for database visualization and management, Figma for UI/UX design, and GitHub for version control and collaboration.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**

2. **Navigate to the project directory:**

3. **Install dependencies:**
- For frontend:
  ```
  npm install
  ```
- For backend:
  ```
  composer install
  ```
4. **Set up the environment:**
- Copy the `.env.example` file to `.env` and adjust the database and other configurations as needed.
5. **Start the project:**
- Use Docker Compose to build and start the project:
  ```
  npm run dev-server
  symfony serve
  ```

## Default Admin Users

For initial testing, two admin users are created:

- **Email:** tom@canopee.com | **Password:** password
- **Email:** bob@canopee.com | **Password:** password
