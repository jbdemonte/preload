/*
* Preload Image Plugin for JQuery
* Version : 1.0
* Date : 2011/12/13
* Licence : GPL v3 : http://www.gnu.org/licenses/gpl.html
* Author : DEMONTE Jean-Baptiste
* Contact : jbdemonte@gmail.com
* Dependency : jQuery 1.6+ (holdReady)
*/

;(function($){
  var loading = 0, holdReady = false, end = false;
  
  function check(){
    if (!loading && end && holdReady){
      holdReady = false;
      $.holdReady(false);
    }
  }
  
  function img(src){
    if (!holdReady){
      $.holdReady(true);
      holdReady = true;
    }
    var imgs = new Image();
    loading++;
    imgs.onload = function(){ 
      loading--; 
      check(); 
    };
    imgs.src = src;
  }

  $.preload = {
    add : function (mixed){
      if (typeof(mixed) === 'string'){
        img(mixed);
      } else if ($.isArray(mixed)){
        for(var i=0; i<mixed.length; i++){
          img(mixed[i]);
        }
      }
    },
    end: function(){
      end = true;
      check();
    }
  };

}(jQuery));