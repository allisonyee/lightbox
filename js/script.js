// Flickr API
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ec1d581108a2f696387b66aa9664700&tags=san+francisco&sort=interestingness-desc&format=json&nojsoncallback=1&api_sig=c0654978ac9b05e4c49d3251d09f7aaf", false);
xhr.send();

var response = JSON.parse(xhr.response);
var photos = response["photos"]["photo"].slice(0,8);


// Lightbox 
var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
  var squares = document.getElementsByClassName('square');

  for (var i = 0; i < photos.length; i++) {
    var url = "https://farm" + photos[i]['farm'] + ".staticflickr.com/" + photos[i]['server'] + "/" + photos[i]['id'] + "_" + photos[i]['secret'] + "_b.jpg";
    squares[i].href = url;
    squares[i].style.backgroundImage = 'url(' + url + ')';
  }

  var triggers = document.getElementsByClassName('lightbox_trigger');
  var lightbox = document.getElementById('lightbox');
  for (var i = 0; i < triggers.length; i++) {
    triggers[i].onclick = function(e) {
      e.preventDefault();
      var image_href = this.href;
      document.getElementById('content').innerHTML = '<img src="' + image_href + '" />';
      lightbox.style.display = 'block';
    }
  }
  lightbox.onclick = function() {
    lightbox.style.display = 'none';
  }
});