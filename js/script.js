// global var to keep track of current photo in lightbox 
var curr_photo = 0;
// global var to keep track of current set of photos
var photos;

var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
  // populate gallery initially
  photos = get_photos("san+francisco");
  update_gallery(photos);

  var search = document.getElementById('search');
  var timer;
  search.onkeyup = function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      var query = search.value.split(' ').join('+');
      photos = get_photos(query);
      update_gallery(photos);
    }, 1000)
  }

  var lightbox = document.getElementById('lightbox');
  var triggers = document.getElementsByClassName('lightbox_trigger');

  // add keydown functionality
  document.onkeydown = function(e) {
    if (lightbox.style.display == 'block') {
      // right arrow
      if (e.keyCode == 39) {
        if (curr_photo == 7) update_content(photos, 0);
        else update_content(photos, curr_photo+1);
      }
      // left arrow
      else if (e.keyCode == 37) {
        if (curr_photo == 0) update_content(photos, 7);
        else update_content(photos, curr_photo-1);
      }
      // esc 
      else if (e.keyCode == 27) {
        lightbox.style.display = 'none';
      }
    }
  };

  // open lightbox with correct image and set prev/next buttons
  for (var i = 0; i < triggers.length; i++) {
    (function(index) {
      triggers[i].onclick = function(e) {
        e.preventDefault();
        update_content(photos, index);
        update_previews(photos);
        lightbox.style.display = 'block';

        document.getElementById('btn_prev').onclick = function(e) {
          e.preventDefault();
          if (curr_photo == 0) update_content(photos, 7);
          else update_content(photos, curr_photo-1);
          update_previews(photos);
        }
        document.getElementById('btn_next').onclick = function(e) {
          e.preventDefault();
          if (curr_photo == 7) update_content(photos, 0);
          else update_content(photos, curr_photo+1);
          update_previews(photos);
        }
      }
    })(i);
  }
  document.getElementById('content').onclick = function() {
    lightbox.style.display = 'none';
  }
});