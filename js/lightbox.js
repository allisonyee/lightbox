var domReady = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function() {
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