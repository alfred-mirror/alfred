# alfred

### An Internet-of-Things smart mirror built with JavaScript and Raspberry Pi - works with a [client-side dashboard](https://github.com/alfred-mirror/alfred-dashboard) which pushes directly to the [mirror display](https://github.com/alfred-mirror/alfred-display).

#### The App is on [Heroku](http://alfred-new.herokuapp.com/)
It is recommended to use the deployed version of this app so you don't have to constantly run a local server. However, an installation guide for a local server is included below.

#### Installation to Run Locally

Git clone this repo and install all dependencies:
```
git clone https://github.com/alfred-mirror/alfred.git
cd alfred
npm install
```

This Alfred server saves the user's config settings into a [Mongo](https://www.mongodb.com/) database which you also need to start up locally (make sure you have [MongoDB](https://www.mongodb.com/) installed on your device).
```
mkdir db
mongod --dbpath=./db --smallfiles
```

Then start the server.
```
node server.js
```

Make sure both the client dashboard and the mirror display's servers are also running. The entire app should be now working on the client dashboard's specified port or defaults to ```localhost:3000```.

### Issues? Suggestions? Comments?
Submit an issue on [GitHub](https://github.com/alfred-mirror/alfred/issues).

### License
MIT Licensed. For more details, see the [LICENSE](https://github.com/alfred-mirror/alfred/blob/master/LICENSE.md) file.
