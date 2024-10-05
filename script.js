window.addEventListener('keydown', (e) => {
    // console.log(e);
    if (e.key == "ArrowLeft") {
        prevMussic()
    }
    if (e.key == "ArrowRight") {
        nextMusic()
    }
})
const hamburger = document.querySelector(".btn-open");
const toggle = document.querySelector(".toggle");

hamburger.addEventListener("click", () => {
    toggle.classList.add("open");

})
// obtenir l"heur
let localTime = document.querySelectorAll(".hour")
function heureMin() {
    let h = new Date().getHours()
    let min = new Date().getMinutes()
    localTime.forEach(el => {
        el.textContent = `${h}:${min}`
        if (h < 10) {
            el.textContent = `0${h}:${min}`
        }
        if (min < 10) {
            el.textContent = `${h}:0${min}`
        }
    })
}
heureMin()
setInterval(() => {
    heureMin()
}, 60000);
// INSERTION DUNAMIQUE DES DONNEES
import { musics } from "./data.js";

let allMusics = musics();
let orderList = orderMusics(allMusics)
// TRIE DE DONNEE 
function orderMusics(data) {
    const orderData = data.sort((a, b) => {
        if (a.musicName.toLowerCase() < b.musicName.toLowerCase()) {
            return -1;
        }
        if (a.musicName.toLowerCase() > b.musicName.toLowerCase()) {
            return 1;
        }
        return 0
    })
    return orderData;
}
createMusicsList(orderList)
// CREATiON DE DONNEes
function createMusicsList(listMusics) {
    listMusics.forEach(function (musics, indexe) {
        let musicItems = document.createElement("div")
        musicItems.classList.add("music-items")
        musicItems.innerHTML = `
        <div class="music-infos">
              <div class="img">
                  <img src=${"RESSOURCES/IMAGES/"}${musics.imageArtist} alt="">
              </div>
              <div class="music-name">
                  <p > ${musics.musicName}</p>
                  <p>${musics.musicArtist}</p>
              </div>   
        </div> 
         <div class="bounce">
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div>
            <div class="block"></div> 
        </div>

      `
        musicItems.addEventListener("click", () => {
            index = indexe;
            loadMusics(index)
            sonplay()

        })
        document.querySelector(".music-list").appendChild(musicItems);
    });
}
//*************RECHERCHE DE MUSIQUE */ 
const inputSearch = document.querySelector("#search")
let listMusics = document.querySelector(".music-list");

inputSearch.addEventListener("input", (e) => {
    document.querySelector(".search-controls").classList.add("focus")
    listMusics.innerHTML = "";
    let inputValue = e.target.value.toLowerCase().replace(/\s/g, "");
    const filterMusic = orderList.filter((el) =>
        el.musicName.toLowerCase().replace(/\s/g, "").includes(inputValue) ||
        el.musicArtist.toLowerCase().replace(/\s/g, "").includes(inputValue))

    createMusicsList(filterMusic)

})
// ************TELCHARGER LES AUDIOS 
let player = document.querySelector(".music-player")
let images = document.querySelectorAll(".image");
let musicTitle = document.querySelectorAll(".music-title")
let Artist = document.querySelectorAll(".artist")
let song = document.querySelector(".audio")

/**TELECHARGER LES SONS */
window.addEventListener('load', () => {
    loadMusics(index)
})
let index = Math.floor(Math.random() * allMusics.length);
let cheminMusic = "RESSOURCES/MUSIC/";
let cheminImage = "RESSOURCES/IMAGES/";
function loadMusics(musicIndex) {
    images.forEach(image => {
        image.src = `${cheminImage}${allMusics[musicIndex].imageArtist}`;
    });
    musicTitle.forEach(title => {
        title.innerText = allMusics[musicIndex].musicName;
    });
    Artist.forEach(artist => {
        artist.innerText = allMusics[musicIndex].musicArtist;
    });
    song.src = `${cheminMusic}${allMusics[musicIndex].song}`;
    //    document.querySelector("main").style.background=allMusics[musicIndex].bgColor;
}
// PAUSE PLAY 
let imganim = document.querySelector(".imgbox")
let play = document.querySelector(".play")
let prev = document.querySelector(".prev")
let next = document.querySelector(".next")

play.addEventListener("click", playpause)
function playpause() {
    if (play.classList.contains('pause')) {
        sonpause()
    }
    else {
        sonplay()
    }
}
/*--------Changer la coouleur de la musique lors du clic------*/
function changeCouleur() {
    const musique = player.getElementsByClassName("music-items")
    for (let i = 0; i < musique.length; i++) {
        musique[i].classList.remove('active');
        musique[i].classList.remove('visible');
    }
    musique[index].classList.add('active');
    musique[index].classList.add('visible');

}
function sonplay() {
    play.classList.remove("play")
    play.classList.add("pause")
    song.play()
    changeCouleur()
    imganim.classList.add("anim")
    imganim.classList.remove("pauseanim")
    document.querySelector(".bounce").classList.add("visible")
}
function sonpause() {
    play.classList.remove("pause")
    play.classList.add("play")
    song.pause()
    imganim.classList.add("pauseanim")
    document.querySelector(".bounce").classList.remove("visible")
}
// PREVBTN
prev.addEventListener("click", prevMussic)
function prevMussic() {
    if (index <= 0) {
        index = orderList.length
    }
    index--;
    loadMusics(index);
    changeCouleur()
    play.classList.add("pause")
    imganim.classList.remove("anim")
    imganim.classList.add("anim")
    song.play()
    // document.querySelector(".bounce").classList.add("visible")
}
//**************NEXTBTN
next.addEventListener("click", () => {
    nextMusic()
})
function nextMusic() {
    if (index >= orderList.length - 1) {
        index = 0
    }
    index++;
    loadMusics(index);
    changeCouleur()
    play.classList.add("pause")
    song.play()
    imganim.classList.add("anim")
}
// obtenir la duree actuelle 
let progress = document.querySelector(".progress");
let curentTime = document.querySelector(".curent");
let dureeSong = document.querySelector('.duree')

let bar = document.querySelector(".bar")
let curent = "";
song.addEventListener("timeupdate", (e) => {
    let duration = e.target.duration;
    curent = e.target.currentTime;
    bar.style.width = (curent / duration) * 100 + "%";
    // console.log(progress.clientWidth)  
    let curentminut = Math.floor(song.currentTime / 60);
    let currentsecond = Math.floor(song.currentTime % 60);
    curentTime.innerText = `0${curentminut}:${currentsecond}`
    if (currentsecond < 10) {
        curentTime.innerText = `0${curentminut}:0${currentsecond}`
    }
})
progress.addEventListener("click", (e) => {
    let progressWidth = e.target.clientWidth
    let progressOffset = e.offsetX
    let duration = song.duration
    song.currentTime = (progressOffset / progressWidth) * duration

})
// obtenir la duree de la musique
song.addEventListener("loadeddata", (e) => {
    let minut = Math.floor(song.duration / 60);
    let second = Math.floor(song.duration % 60);
    dureeSong.innerText = `0${minut}:${second}`
    if (second < 10) {
        dureeSong.innerText = `0${minut}:0${second}`
    }
})

// Retirer 10 sec ou Avancer de 10sec
let moins = document.querySelector(".moin");
moins.addEventListener("click", () => {
    song.currentTime = Math.max(0, song.currentTime - 10)
})

let plus = document.querySelector(".plus");
plus.addEventListener("click", () => {
    song.currentTime = Math.min(song.duration, song.currentTime + 10)
})
// classer repeter aleatoire
let classer = document.querySelector(".classer");
classer.addEventListener("click", () => {
    let classContent = classer.className;
    switch (classContent) {
        case "classer":
            classer.className = "repeter"
            classer.setAttribute("title", "Repeter")
            break;
        case "repeter":
            classer.className = "aleatoire"
            classer.setAttribute("title", "Aléatoire")
            break;
        case "aleatoire":
            classer.className = "classer"
            classer.setAttribute("title", "Classer")
            break;
    }

})
// jouer en fonction de l'icone classer repeteer oun aleatoire
song.addEventListener("ended", mode)

function mode() {
    let classContent = classer.className;
    switch (classContent) {
        case "classer":
            nextMusic()
            break;
        case "repeter":
            song.curentTime = 0;
            loadMusics(index)
            song.play()
            break;
        case "aleatoire":
            let randomIndex = Math.floor(Math.random() * allMusics.length - 1)
            do {
                randomIndex = Math.floor(Math.random() * allMusics.length)
            } while (index == randomIndex)
            index = randomIndex;
            loadMusics(index)
            sonplay()
            break;
    }
}

let musicNow = document.querySelector(".music-now")
musicNow.addEventListener("click", () => {
    toggle.classList.remove("open")

})
