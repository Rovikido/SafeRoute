# SafeRoute (in progress)

SafeRoute overlays a map with a danger level heatmap based on crime data. <br />
Link: https://main.d3d4kky5khtwtb.amplifyapp.com login: test, password: testtest<br />
The application is built using FastAPI/MongoDB on the backend and React on frontend. API runs in Docker, deployed on AWS Lambda, and main app is deployed on AWS Amplify.<br />

## Installation

To install SafeRoute, you will need to have Docker installed on your machine. Once you have Docker installed, you can follow these steps:

    1. Clone the SafeRoute repository to your local machine.
    2. Navigate to the root directory of the project.
    3. Build the Docker image using: docker build -t saferoute .
    4. Run the Docker container using: docker run -p 8000:8000 saferoute

The application will be accessible at http://localhost:8000 in your web browser.

## Project strucure
<img src="other/github_repo_images/diagram.png" width="512"/><br />
The backend precomputes map data, and writes it to the MongoDB. This data can then be retrieved by FastAPI, and, through AWS Lambda, be sent to the frontend, where it will be displayed on map, via GoogleMapsAPI.

## Stack
* [Python](https://www.python.org/) - high-level programming language known for its simplicity and readability, widely used in web development.
* [FastAPI](https://fastapi.tiangolo.com/) - modern, fast (high-performance) web framework for building APIs with Python, based on standard Python type hints.
* [AWS Amplify](https://aws.amazon.com/amplify/) - development platform provided by Amazon Web Services (AWS) that enables frontend web and mobile developers to build full-stack applications.
* [AWS Lambda](https://aws.amazon.com/lambda/) - serverless computing service provided by AWS that lets you run your code without provisioning or managing servers.
* [MongoDB](https://www.mongodb.com/) - popular NoSQL database program that uses JSON-like documents with optional schemas.
* [Docker](https://www.docker.com/) - platform that allows you to automate the deployment of applications inside containers, providing an efficient and consistent environment for running applications.
* [React](https://reactjs.org/) - JavaScript library for building user interfaces, widely used for creating dynamic and interactive web applications.

## Usage

To use SafeRoute, simply navigate to the homepage of the web application at http://localhost:8000. The application will automatically display a map with a heatmap overlay that shows the dangerousness levels in the area.

Contacts:
* [Telegram](https://t.me/rovikido) 
* Email: oleksandr.zakala@gmail.com
