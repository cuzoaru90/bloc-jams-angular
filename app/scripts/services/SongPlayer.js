(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc Current album object retrieved from fixtures
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file (private)
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong (private)
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song) {

    if (currentBuzzObject) {
      currentBuzzObject.stop();

      if (SongPlayer.currentSong)
      {
        SongPlayer.currentSong.playing = null;
      }
      
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });
 
      SongPlayer.currentSong = song;
    };
    

    /**
    * @function playSong (private)
    * @desc Plays the loaded currentBuzzObject
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
      SongPlayer.currentAlbum = currentAlbum;
    };

    /**
    * @function stopSong (private)
    * @desc Stops the loaded currentBuzzObject
    * @param {Object} song
    */
    var stopSong = function(song) {
      currentBuzzObject.pause();
      song.playing = null;
      SongPlayer.currentAlbum = null;
      SongPlayer.currentSong = null;
    };
    
    /**
    * @function getSongIndex (private)
    * @desc Gets array index of a song from the current album
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };


    /**
    * @desc Current song variable (public)
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current album variable (public)
    * @type {Object}
    */
    SongPlayer.currentAlbum = null;
    
    /**
    * @function SongPlayer.play (public method of the SongPlayer service)
    * @desc Uses the private setSong and playSong methods to play music one at a time
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
       
      setSong(song);
      playSong(song);

      }
      else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }         

    };

    /**
    * @function SongPlayer.pause (public method of the SongPlayer service)
    * @desc Uses the private setSong and playSong methods to pause currently playing music
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause(); // Pauses song, doesn't stop it
      song.playing = false;
    }; 

    /**
    * @function SongPlayer.previous (public method of the SongPlayer service)
    * @desc Get array index of the song preceding the currentSong
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } 
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    /**
    * @function SongPlayer.next (public method of the SongPlayer service)
    * @desc Get array index of the song following the currentSong
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } 
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };
    
    return SongPlayer;
  }
 
    angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();