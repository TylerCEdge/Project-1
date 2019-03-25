// var selectedBars = {};

// var APIKey = "9655ad7887b18cd9176bb5f408b25764";

// // Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Charlotte, US&units=imperial&appid=" + APIKey;

// function toTitleCase(str) {
//   return str.replace(/\w\S*/g, function (txt) {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// }

// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//   // We store all of the retrieved data inside of an object called "response"
//   .then(function (response) {

//     // Log the queryURL
//     // console.log(queryURL);

//     // Log the resulting object
//     // console.log(response);

//     // Creates div tags for information
//     $(".city").html("<h1>" + response.name + " Weather Details</h1>");
//     $(".wind").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
//     $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + " %");
//     $(".temp").text("Temperature " + Math.round(response.main.temp) + " °F");
//     $(".temp").text("Temperature: " + Math.round(response.main.temp) + " °F");
//     var iconcode = response.weather[0].icon;
//     var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//     $('#wicon').attr('src', iconurl);
//     $(".conditions").text("Conditions: " + response.weather[0].main + " | " + toTitleCase(response.weather[0].description));
//     // // Log the data in the console as well
//     // console.log("Wind Speed: " + response.wind.speed);
//     // console.log("Humidity: " + response.main.humidity);
//     // console.log("Temperature (F): " + response.main.temp);
//   });

// var map;

// function initMap() {
//   // Create the map.
//   var charlotte = {
//     lat: 35.227085,
//     lng: -80.843124
//   };
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: charlotte,
//     zoom: 70
//   });

//   // Create the places service.
//   var service = new google.maps.places.PlacesService(map);
//   var getNextPage = null;
//   var moreButton = document.getElementById('more');
//   moreButton.onclick = function () {
//     moreButton.disabled = true;
//     if (getNextPage) getNextPage();
//   };

//   var request = {
//     location: charlotte,
//     radius: '5000',
//     query: ['bar']
//   };

//   // Perform a nearby search.
//   service.textSearch(request,
//     function (results, status, pagination) {
//       if (status !== 'OK') return;

//       createMarkers(results);
//       moreButton.disabled = !pagination.hasNextPage;
//       getNextPage = pagination.hasNextPage && function () {
//         pagination.nextPage();
//       };
//     });
// }

// function createMarkers(places) {
//   var bounds = new google.maps.LatLngBounds();
//   var placesList = $("#places");

//   for (var i = 0, place; place = places[i]; i++) {
//     var image = {
//       url: place.icon,
//       size: new google.maps.Size(71, 71),
//       origin: new google.maps.Point(0, 0),
//       anchor: new google.maps.Point(17, 34),
//       scaledSize: new google.maps.Size(25, 25)
//     };

//     var marker = new google.maps.Marker({
//       map: map,
//       icon: image,
//       title: place.name,
//       position: place.geometry.location
//     });

//     //This creates the new div for each bar
//     var thisBar = $("<div>").text(JSON.stringify(place.name));
//     thisBar.attr({
//       "data-name": JSON.stringify(place.name),
//       "data-rating": JSON.stringify(place.rating),
//       "data-address": place.formatted_address,
//       "data-hours": JSON.stringify(place.opening_hours),
//       "data-price": JSON.stringify(place.price_level)
//     });

//     thisBar.addClass("bar");
//     thisRating = $("<div>").text("Rating: " + JSON.stringify(place.rating));
//     thisImageUrl = place.photos[0].getUrl({
//       'maxWidth': 300,
//       'maxHeight': 300
//     });

//     // console.log(thisImageUrl);
//     thisImage = $("<img>").attr("src", thisImageUrl);

//     thisBar.append(thisRating, thisImage);
//     $("#displayResults").prepend(thisBar);

//     // console.log(place);

//     bounds.extend(place.geometry.location);
//   }
//   map.fitBounds(bounds);
//   allowClicks();
// }

// function renderTable(){
//   $("#tableBody").empty();
//   keys = Object.keys(selectedBars);
//   // console.log(keys);
//   for (i = 0; i < keys.length; i++){
//     thisKey = keys[i];
//     thisBar = selectedBars[thisKey];
  
//     newRow = $("<tr>");
//     // there is an error when pulling the object. I have tried several options to resolve the issue. dot notation bracket notation. 
//     thisName = $("<td>").text(thisBar.name);
//     thisRating = $("<td>").text(thisBar.rating);
//     thisAddress = $("<td>").text(thisBar.address);
//     thisPrice = $("<td>").text(thisBar.price);
    
//     newRow.append(thisName, thisRating, thisAddress, thisPrice);
//     $("#tableBody").append(newRow);
//   }
// }

// function allowClicks(){
//   $(".bar").on("click", function(){
//     thisBar = $(this);
//     thisBarName = thisBar.attr("data-name");
//     // console.log(thisBarName);

//     // console.log(thisBar);
//     if (thisBar.hasClass("selected")){
//       // console.log("already selected");
//       delete selectedBars[thisBarName];
//     }

//     //This should store all of the data from the custom attributes 
//     //of the clicked div into an object, then send the object into
//     //an array

//     else{
//       selectedBars[thisBarName] = {};
//       targetObject = selectedBars[thisBarName];
//       targetObject.name = $(this).attr("data-name");
//       targetObject.address = $(this).attr("data-address");
//       targetObject.rating = $(this).attr("data-rating");
//       targetObject.price = $(this).attr("data-price");
//     }
    
//     thisBar.toggleClass("selected");
//     console.log(selectedBars);
//     renderTable();
//   });
// }

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBtfleJjantBqTZXzSJnvMJGU6_pMAonPY",
//   authDomain: "bar-crawl-project-f4740.firebaseapp.com",
//   databaseURL: "https://bar-crawl-project-f4740.firebaseio.com",
//   projectId: "bar-crawl-project-f4740",
//   storageBucket: "bar-crawl-project-f4740.appspot.com",
//   messagingSenderId: "917856200360"
// };

// firebase.initializeApp(config);

// //Defining the database
// var database = firebase.database();

// $("#submitButton").on("click", function(){
//   event.preventDefault();
//   keys = Object.keys(selectedBars);
//   database.ref().push(selectedBars);
//   console.log(selectedBars);
// });

// <<<<<<< HEAD
// database.ref().on('value', function(snapshot) {
//   snapshot.forEach(function(thisCrawl) {
//     // thisCrawl = $("<p>").text(thisCrawl.val().bars);
//     // $("yourCrawl").append(thisCrawl);
//     thisCrawl = $("<p>").text(thisCrawl.name.val().bars);
//     $("yourCrawl").append(thisCrawl);
// });
// =======
// var ref = firebase.database().ref('bars/');

// ref.on("value", function(snapshot) {
//   // console.log(snapshot.val());
//   document.getElementById("testBars").innerHTML = JSON.stringify(snapshot.val());
// }, function (error) {
//   //  console.log("Error: " + error.code);
// >>>>>>> 6354cfaf3ce1d99fb474b6deb6cfdacb2204f874
// });


// var 


var selectedBars = {};

var APIKey = "9655ad7887b18cd9176bb5f408b25764";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Charlotte, US&units=imperial&appid=" + APIKey;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

$.ajax({
    url: queryURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    // console.log(queryURL);

    // Log the resulting object
    // console.log(response);

    // Creates div tags for information
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + Math.round(response.wind.speed) + " mph");
    $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + " %");
    $(".temp").text("Temperature " + Math.round(response.main.temp) + " °F");
    $(".temp").text("Temperature: " + Math.round(response.main.temp) + " °F");
    var iconcode = response.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);
    $(".conditions").text("Conditions: " + response.weather[0].main + " | " + toTitleCase(response.weather[0].description));
    // // Log the data in the console as well
    // console.log("Wind Speed: " + response.wind.speed);
    // console.log("Humidity: " + response.main.humidity);
    // console.log("Temperature (F): " + response.main.temp);
  });

var map;

function initMap() {
  // Create the map.
  var charlotte = {
    lat: 35.227085,
    lng: -80.843124
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: charlotte,
    zoom: 70
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  var getNextPage = null;
  var moreButton = document.getElementById('more');
  moreButton.onclick = function () {
    moreButton.disabled = true;
    if (getNextPage) getNextPage();
  };

  var request = {
    location: charlotte,
    radius: '5000',
    query: ['bar']
  };

  // Perform a nearby search.
  service.textSearch(request,
    function (results, status, pagination) {
      if (status !== 'OK') return;

      createMarkers(results);
      moreButton.disabled = !pagination.hasNextPage;
      getNextPage = pagination.hasNextPage && function () {
        pagination.nextPage();
      };
    });
}

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = $("#places");

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    //This creates the new div for each bar
    var thisBar = $("<div>").text(JSON.stringify(place.name));
    thisBar.attr({
      "data-name": JSON.stringify(place.name),
      "data-rating": JSON.stringify(place.rating),
      "data-address": place.formatted_address,
      "data-hours": JSON.stringify(place.opening_hours),
      "data-price": JSON.stringify(place.price_level)
    });

    thisBar.addClass("bar");
    thisRating = $("<div>").text("Rating: " + JSON.stringify(place.rating));
    thisImageUrl = place.photos[0].getUrl({
      'maxWidth': 300,
      'maxHeight': 300
    });

    // console.log(thisImageUrl);
    thisImage = $("<img>").attr("src", thisImageUrl);

    thisBar.append(thisRating, thisImage);
    $("#displayResults").prepend(thisBar);

    // console.log(place);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
  allowClicks();
}

function renderTable(){
  $("#tableBody").empty();
  keys = Object.keys(selectedBars);
  // console.log(keys);
  for (i = 0; i < keys.length; i++){
    thisKey = keys[i];
    thisBar = selectedBars[thisKey];
  
    newRow = $("<tr>");
    thisName = $("<td>").text(thisBar.name);
    thisRating = $("<td>").text(thisBar.rating);
    thisAddress = $("<td>").text(thisBar.address);
    thisPrice = $("<td>").text(thisBar.price);
    
    newRow.append(thisName, thisRating, thisAddress, thisPrice);
    $("#tableBody").append(newRow);
  }
}

function allowClicks(){
  $(".bar").on("click", function(){
    thisBar = $(this);
    thisBarName = thisBar.attr("data-name");
    // console.log(thisBarName);

    // console.log(thisBar);
    if (thisBar.hasClass("selected")){
      // console.log("already selected");
      delete selectedBars[thisBarName];
    }

    //This should store all of the data from the custom attributes 
    //of the clicked div into an object, then send the object into
    //an array

    else{
      selectedBars[thisBarName] = {};
      targetObject = selectedBars[thisBarName];
      targetObject.name = $(this).attr("data-name");
      targetObject.address = $(this).attr("data-address");
      targetObject.rating = $(this).attr("data-rating");
      targetObject.price = $(this).attr("data-price");
    }
    
    thisBar.toggleClass("selected");
    console.log(selectedBars);
    renderTable();
  });
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBtfleJjantBqTZXzSJnvMJGU6_pMAonPY",
  authDomain: "bar-crawl-project-f4740.firebaseapp.com",
  databaseURL: "https://bar-crawl-project-f4740.firebaseio.com",
  projectId: "bar-crawl-project-f4740",
  storageBucket: "bar-crawl-project-f4740.appspot.com",
  messagingSenderId: "917856200360"
};

firebase.initializeApp(config);

//Defining the database
var database = firebase.database();

database.ref().on('value', function(snapshot) {
  snapshot.forEach(function(thisCrawl) {
    thisCrawl = $("<p>").text(thisCrawl.val().bars);
    $("yourCrawl").append(thisCrawl);
});
});

function PrintElem(elem){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

$("#submitButton").on("click", function(){
  PrintElem("table");
});

