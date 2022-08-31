const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//song titles in an array
 const songs = ['Boo Up', 'Dusk', 'Elastic Heart', 'Money', 'My Girl', 'Own It', 'Sleep', 'The Greatest', 'Unstoppable', 'Work', 'Yummy']

 // keep track of the songs
 let songIndex = 0

 // initially load the the songs into DOM
 loadSong(songs[songIndex])

 //update song details
 function loadSong(song) {
     // update the title, the audio source, image source
     title.innerText = song
     audio.src = `music/${song}.mp3`
     cover.src = `img/${song}.jpg`
 }

 function playSong() {
     musicContainer.classList.add('play')
     // change the play icon to pause
     playBtn.querySelector('i.fas').classList.remove('fa-play')
     playBtn.querySelector('i.fas').classList.add('fa-pause')


     // play the songs
     audio.play()
 }

 function pauseSong() {
    musicContainer.classList.remove('play')
    // change the pause icon to play
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')


    audio.pause()
 }

 function prevSong () {
     songIndex--

     if (songIndex < 0) {
         songIndex = songs.length - 1
     }
     loadSong(songs[songIndex])

     playSong()
 }

 function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
 }

 // take in the event object on which the suration and current time of the song
 // can be gotten
 
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = ( currentTime / duration ) * 100
    progress.style.width = ` ${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = ( clickX / width ) * duration
}


 // event listeners
 playBtn.addEventListener('click', () => {
     const isPlaying = musicContainer.classList.contains('play')

     if(isPlaying) {
         pauseSong()
     } else {
         playSong()
     }
 })


 // event listeners for changing songs/ next and prev
 prevBtn.addEventListener('click', prevSong)
 nextBtn.addEventListener('click', nextSong)

 // progress bar
 audio.addEventListener('timeUpdate', updateProgress)

 progressContainer.addEventListener('click', setProgress)

 audio.addEventListener('ended', nextSong)