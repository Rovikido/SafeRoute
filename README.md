# SafeRoute (in progress)

SafeRoute is a web application that overlays a map with a heatmap of dangerousness levels based on crime data. The application is built using FastAPI on the backend and HTML/CSS on frontend technologies, and runs in a Docker container. 
Deployed on https://main.d3d4kky5khtwtb.amplifyapp.com
## Installation

To install SafeRoute, you will need to have Docker installed on your machine. Once you have Docker installed, you can follow these steps:

    1. Clone the SafeRoute repository to your local machine.
    2. Navigate to the root directory of the project.
    3. Build the Docker image using: docker build -t saferoute .
    4. Run the Docker container using: docker run -p 8000:8000 saferoute

The application will be accessible at http://localhost:8000 in your web browser.
## Usage

To use SafeRoute, simply navigate to the homepage of the web application at http://localhost:8000. The application will automatically display a map with a heatmap overlay that shows the dangerousness levels in the area.
