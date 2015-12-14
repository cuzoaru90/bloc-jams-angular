(function() {
  function SongPlayer() {
    var SongPlayer = {};

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
      SongPlayer.currentSong.playing = null;
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
    };

    /**
    * @desc Current song variable (public)
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    
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
      currentBuzzObject.pause();
      song.playing = false;
    };  
    
    return SongPlayer;
  }
 
    angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();