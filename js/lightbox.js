// get photos from Flickr
var get_photos = function(q) {
  var q_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=94907644bb851ac1e29e11bb0a5f7751&text=" + q + "&sort=relevance&format=json&nojsoncallback=1";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", q_url, false);
  xhr.send();
  var response = JSON.parse(xhr.response);
  return response["photos"]["photo"].slice(0,8);
}

// generate image URL from Flickr data
var url_maker = function(photo) {
  return "https://farm" + photo['farm'] + ".staticflickr.com/" + photo['server'] + "/" + photo['id'] + "_" + photo['secret'] + "_b.jpg";
}

// update gallery with search results
var update_gallery = function(photos) {
  var squares = document.getElementsByClassName('square');
  for (var i = 0; i < photos.length; i++) {
    var url = "https://farm" + photos[i]['farm'] + ".staticflickr.com/" + photos[i]['server'] + "/" + photos[i]['id'] + "_" + photos[i]['secret'] + "_b.jpg";
    squares[i].href = url;
    squares[i].style.backgroundImage = 'url(' + url + ')';
  }
}

// populate lightbox with correct image and title
var update_content = function(photos, index) {
  if (index < 0 || index > 7) return;
  curr_photo = index;
  var squares = document.getElementsByClassName('square');
  var image_href = squares[index].href;
  document.getElementById('content').innerHTML = '<img src="' + image_href + '" /><div class="title">' + photos[index]['title'] + '</div>';
};

// update preview image and title in lightbox navigation
var update_previews = function(photos) {
  if (curr_photo == 0) {
    // make prev of first photo point to the last photo
    document.getElementById('prev_preview').style.backgroundImage = 'url(' + url_maker(photos[7]) + ')';
    document.getElementById('prev_title').innerHTML = photos[7]['title'];
    document.getElementById('next_preview').style.backgroundImage = 'url(' + url_maker(photos[1]) + ')';
    document.getElementById('next_title').innerHTML = photos[1]['title'];
  }
  else if (curr_photo == 7) {
    // make next of last photo point to first photo
    document.getElementById('prev_preview').style.backgroundImage = 'url(' + url_maker(photos[6]) + ')';
    document.getElementById('prev_title').innerHTML = photos[6]['title'];
    document.getElementById('next_preview').style.backgroundImage = 'url(' + url_maker(photos[0]) + ')';
    document.getElementById('next_title').innerHTML = photos[0]['title'];
  }
  else {
    document.getElementById('prev_preview').style.backgroundImage = 'url(' + url_maker(photos[curr_photo-1]) + ')';
    document.getElementById('prev_title').innerHTML = photos[curr_photo-1]['title'];
    document.getElementById('next_preview').style.backgroundImage = 'url(' + url_maker(photos[curr_photo+1]) + ')';
    document.getElementById('next_title').innerHTML = photos[curr_photo+1]['title'];
  }
}