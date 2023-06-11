# SafeRoute (in progress)

SafeRoute overlays a map with a danger level heatmap based on crime data. The application is built using FastAPI/MongoDB on the backend and React on frontend. API runs in Docker, deployed on AWS Lambda, and main app is deployed on AWS Amplify 
Link: https://main.d3d4kky5khtwtb.amplifyapp.com login: test, password: testtest
## Project strucure
<img src="other/github_repo_images/diagram.png" width="512"/>

## Installation

To install SafeRoute, you will need to have Docker installed on your machine. Once you have Docker installed, you can follow these steps:

    1. Clone the SafeRoute repository to your local machine.
    2. Navigate to the root directory of the project.
    3. Build the Docker image using: docker build -t saferoute .
    4. Run the Docker container using: docker run -p 8000:8000 saferoute

The application will be accessible at http://localhost:8000 in your web browser.
## Usage

To use SafeRoute, simply navigate to the homepage of the web application at http://localhost:8000. The application will automatically display a map with a heatmap overlay that shows the dangerousness levels in the area.
