// Flickr API

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ec1d581108a2f696387b66aa9664700&tags=san+francisco&sort=interestingness-desc&format=json&nojsoncallback=1&api_sig=c0654978ac9b05e4c49d3251d09f7aaf", false);
xhr.send();

var response = JSON.parse(xhr.response);
var photos = response["photos"]["photo"].slice(0,8);