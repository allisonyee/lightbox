// get photos from Flickr
var get_photos = function(q) {
  var q_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1da18a4cf739bed92b013de7945c39f&tags=" + q + "&tag_mode=all&text=" + q + "&sort=interestingness-desc&extras=url_l&format=json&nojsoncallback=1";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", q_url, false);
  xhr.send();
  var response = JSON.parse(xhr.response);
  var data = response["photos"]["photo"]
  // grab first 6 photos that have a URL for large-sized image
  var photos = []
  var i = 0;
  while (photos.length < 6) {
    if (data[i]['url_l'] === undefined) continue;
    else photos.push(data[i]);
    i++;
  }
  return photos;
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
    squares[i].innerHTML = '<figcaption><h2>' + photos[i]['title'] + '</h2></figcaption>';
  }
}

// populate lightbox with correct image and title
var update_content = function(photos, index) {
  if (index < 0 || index > 5) return;
  curr_photo = index;
  var squares = document.getElementsByClassName('square');
  var image_href = squares[index].href;
  document.getElementById('content').innerHTML = '<img src="' + image_href + '" /><div class="title">' + photos[index]['title'] + '</div>';
};

// update preview image and title in lightbox navigation
var update_previews = function(photos) {
  if (curr_photo == 0) {
    // make prev of first photo point to the last photo
    update_previews_helper(photos.length-1, curr_photo+1);
  }
  else if (curr_photo == 5) {
    // make next of last photo point to first photo
    update_previews_helper(curr_photo-1, 0);
  }
  else {
    update_previews_helper(curr_photo-1, curr_photo+1);
  }
}

var update_previews_helper = function(prev_index, next_index) {
  document.getElementById('prev_preview').style.backgroundImage = 'url(' + url_maker(photos[prev_index]) + ')';
  document.getElementById('prev_title').innerHTML = photos[prev_index]['title'].substring(0,21);
  document.getElementById('next_preview').style.backgroundImage = 'url(' + url_maker(photos[next_index]) + ')';
  document.getElementById('next_title').innerHTML = photos[next_index]['title'].substring(0,22);
}