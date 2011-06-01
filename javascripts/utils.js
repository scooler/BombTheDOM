MyApp.utils = function(){
  return {
    random: function(from, to){
      return Math.floor((Math.random()*(to-from+1))+from);
    }
  }
}();

MyApp.utils.addOnLoad = (function(){
  var onLoadHandlers = [];
  window.onload = function(){
    var i;
    for (i = 0; i<onLoadHandlers.length; i++){
      if (typeof onLoadHandlers[i]=== "function"){
        onLoadHandlers[i]();
      }
    }
  }
  return function(handler){
      onLoadHandlers.push(handler);
  }
})();


MyApp.utils.addCallback = function(event, callback){
  if (document.addEventListener){
    document.addEventListener(event, callback, false);
  }else if (document.attachEvent){
    document.attachEvent("on"+event, callback);
  }else {
    document["on"+event] = callback;
  }
};