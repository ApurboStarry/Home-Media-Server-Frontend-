# IMPORTANT: The repository of the backend of this project is [here](https://github.com/ApurboStarry/Home-Media-Server-Backend-)

# Table of Contents
- [What it does?](#what-it-does)
- [How to run it?](#how-to-run-it)
- [How it works?](#how-it-works)
# What it does?
This is LAN media server whose contents can be accessed by any device on the LAN.

For example, you have a device(e.g. PC, Laptop) that has movies, photos etc which you want to access from your other devices(e.g. TV, Phone). There are several way of doing so. You can copy the files, cast to the desired device and many more. But these are not practical and convenient solutions always.

Let's imagine, you have a 4K movie stored in your PC or Laptop whose size is around 6 GB. If you want to access this movie from another device, you have to copy the movie file to that device which will take around 5 minutes. Or you can cast from the device where the movie file is located to the device from where the movie will be accessed. But this is also not convenient for several reasons.

That's when this **Home Media Server** comes into the picture. You can access any movie, any photo from any device on the LAN which are stored in your PC or Laptop with least latency. This app streams videos so efficiently that you won't feel any difference.

# How to run it?
0. Follow the steps described in the backend repository of this project.
1. You must have [node.js](https://nodejs.org/en/) installed on your system.
2. You must have [create-react-app](https://create-react-app.dev/) installed on your system. If not simply run int the terminal: `sudo npm i -g create-react-app`
3. Download all the files from this repository
4. In the terminal run: `npm init`
4. Edit the file named *ipAddress.json* inside **src** folder. Edit the IP address of the server.
5. In the terminal run: `npm start`
6. The above command will start the app if no error occurs and will print the ip address app to access in your network.
7. That's it. Use the IP address to access your media files. Enjoy!

# How it works?
1. This is a client app that uses React. It has several components to render on the client side.
2. Among all the components, the **video** component uses HTML5 to render video on the client side.
