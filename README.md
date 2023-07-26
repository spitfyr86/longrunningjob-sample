# Angular + .Net Core Web API + Docker containerization

General idea of the app: Simulate a hard processing work of the input data items given by user.
Bare minimum requirements:
1. Example of the simple SPA with .Net 7+ on the backend, and Angular/ReactJS on the front-end.
2. On the front-end side user should be able to enter the text into the text field, press "Convert" button, and get this text encoded into the base64 format.
3. Encoding should be performed on the backend side.
4. Encoded string should be returned to the client one character at a time, one by one, and for each returned character there should be random pause on the server 1-5 seconds.
5. All received characters should form a string in a UI textbox, hence it will be updated in real-time by adding new incoming characters.
6. User cannot start another encoding process while the current one is in progress, 
7. User can press "cancel" button and thus cancel the currently running process.

Additional requirements:
1. Web page should look neat, use Bootstrap or its derivatives
2. Use default IoC, package managers and other tools to build & run the app
3. Use the latest released .Net & C# with all possible new features they provide
4. Business logic should be implemented as a services, with unit tests for each respectively
5. Server-side app should be hosted in Linux Docker container
6. Host API & UI backend in different containers
7. Support basic authentication using nginx in another container


## Installation

1. Install Docker Desktop.
2. Clone the repository.
3. Run command below to build the images.
	- `docker-compose build`
4. Run command below to create and run the containers from the created images.
	- `docker-compose up`
5. Open a browser and go to [localhost:4200](http://localhost:4200)
	

## Example of the app functioning:
input = "**Hello, World!**". Generated base64="**SGVsbG8sIFdvcmxkIQ==**"

What web client receives from the server:
- Random pause… "**S"**
Random pause… "**G**"
Random pause… "**V**"
Random pause… "**s**"
Etc.

What does user see in the result text field on web UI:
- Random pause… "**S**"
Random pause… "**SG**"
Random pause… "**SGV**"
Random pause… "**SGVs**"
Etc.