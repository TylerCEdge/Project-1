// ----- LINKING IN FIREBASE ----- //

// Initialize Firebase
// Mei's Bar Crawl Project config for contact form entry stuff. 
// One way information
var config = {
  apiKey: "AIzaSyB76RPsQKnl5tyOVAR1GA5cUxG6KM0t-Xc",
  authDomain: "bar-crawl-contact-db.firebaseapp.com",
  databaseURL: "https://bar-crawl-contact-db.firebaseio.com",
  projectId: "bar-crawl-contact-db",
  storageBucket: "bar-crawl-contact-db.appspot.com",
  messagingSenderId: "376710116624"
}

firebase.initializeApp(config);
var database = firebase.database();


database.ref().on('value', function (snapshot) {
  $('#addBeerStoriesHere').empty();
  snapshot.forEach(function (beerStory) {
    console.log(beerStory);
    // var createDiv; 
    // var createH3;
    // var createP;
    // var bStoryName = snapshot.name;
    // console.log(bStoryName);

  });
});
