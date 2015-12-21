// Lightbox 
var photo_index = 0;

var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var update_content = function(index) {
  photo_index = index;
  var squares = document.getElementsByClassName('square');
  var image_href = squares[index].href;
  document.getElementById('content').innerHTML = '<img src="' + image_href + '" /><div class="title">' + photos[index]['title'] + '</div>';
};

domReady(function() {
  var squares = document.getElementsByClassName('square');

  // update gallery with photos
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
        console.log(index);
        e.preventDefault();
        update_content(index);
        lightbox.style.display = 'block';

        document.getElementById('btn_prev').onclick = function(e) {
          e.preventDefault();
          update_content(photo_index-1);
        }
        document.getElementById('btn_next').onclick = function(e) {
          e.preventDefault();
          update_content(photo_index+1);
        }
      }
    })(i);
  }
  // lightbox.onclick = function() {
  //   lightbox.style.display = 'none';
  // }
});