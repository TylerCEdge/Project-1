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
};
firebase.initializeApp(config);
var database = firebase.database();

// ----- GLOBAL VARIABLES ----- //


$('#submit').on("click", function() {
  event.preventDefault(); //prevents hitting enter and submitting
  var customer = {
    name:  $('#formName').val().trim(),
    emailAddress: $('#formEmail').val().trim(),
    brewery: $('#formBrewery').val().trim(),
    story: $('#formStory').val().trim(),
  }
  database.ref().push(customer);
  }
  
)
database.ref().on('value', function (snapshot) {
  $('#addBeerStoriesHere').empty();
  snapshot.forEach(function (beerStory) {
    console.log(beerStory.val().brewery);  //it works!!
    var createDiv; 
    var createH3;
    var createH6;
    var createP;
    var bStoryName = beerStory.val().name;
    var bStoryBrewery = beerStory.val().brewery;
    var bStory = beerStory.val().story;
    // console.log(bStoryName.brewery);
    createDiv = $('<div>');
    createH3 = $('<h3>').text(bStoryName);
    createH6 = $('<h6>').text(bStoryBrewery);
    createP = $('<p>').text(bStory);
    createDiv.append(createH3, createH6, createP);

$('#addBeerStoriesHere').prepend(createDiv);
$('')

  })
})


//testing because i set database up so you couldn't read or write it. 
// database.ref().on('value', function (snapshot) {
// console.log(snapshot);
// })


// // ----- LINKING IN FIREBASE ----- //

// // Initialize Firebase
// // Mei's Bar Crawl Project config for contact form entry stuff. 
// // One way information

// var config = {
//   apiKey: "AIzaSyBtfleJjantBqTZXzSJnvMJGU6_pMAonPY",
//   authDomain: "bar-crawl-project-f4740.firebaseapp.com",
//   databaseURL: "https://bar-crawl-project-f4740.firebaseio.com",
//   projectId: "bar-crawl-project-f4740",
//   storageBucket: "bar-crawl-project-f4740.appspot.com",
//   messagingSenderId: "917856200360"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

// // ----- GLOBAL VARIABLES ----- //



// $('#submit').on("click", function() {
//   event.preventDefault(); //prevents hitting enter and submitting
//   var customer = {
//     name:  $('#formName').val().trim(),
//     emailAddress: $('#formEmail').val().trim(),
//     brewery: $('#formBrewery').val().trim(),
//     story: $('#formStory').val().trim(),
//   }
//   database.ref().push(customer);

//   }

// )
// database.ref().on('value', function (snapshot) {
//   $('#addBeerStoriesHere').empty();
//   snapshot.forEach(function (beerStory) {
//     console.log(beerStory.val().brewery);  //it works!!
//     var createDiv; 
//     var createH3;
//     var createH6;
//     var createP;
//     var bStoryName = beerStory.val().name;
//     var bStoryBrewery = beerStory.val().brewery;
//     var bStory = beerStory.val().story;
//     // console.log(bStoryName.brewery);
//     createDiv = $('<div>');
//     createH3 = $('<h3>').text(bStoryName);
//     createH6 = $('<h6>').text(bStoryBrewery);
//     createP = $('<p>').text(bStory);
//     createDiv.append(createH3, createH6, createP);

// $('#addBeerStoriesHere').prepend(createDiv);
// $('')

//   })
// })


// //testing because i set database up so you couldn't read or write it. 
// // database.ref().on('value', function (snapshot) {
// // console.log(snapshot);
// // })

