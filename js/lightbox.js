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
    (function(index) {
      triggers[i].onclick = function(e) {
        e.preventDefault();
        var image_href = this.href;
        document.getElementById('content').innerHTML = '<img src="' + image_href + '" /><div class="title">' + photos[index]['title'] + '</div>';
        lightbox.style.display = 'block';
      }
    })(i);
    
  }
  lightbox.onclick = function() {
    lightbox.style.display = 'none';
  }
});