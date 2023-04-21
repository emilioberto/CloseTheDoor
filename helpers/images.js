export function replaceRandomImages(replaceRate, imageUrls) {
  var images = document.getElementsByTagName("img");

  for (var i = 0; i < images.length; i++) {
    if (Math.random() < replaceRate) {
      var randomIndex = Math.floor(Math.random() * imageUrls.length);
      images[i].src = imageUrls[randomIndex];
    }
  }
}
