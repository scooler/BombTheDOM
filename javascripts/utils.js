MyApp.utils = function(){
  //should we animate value?
  var animate = function(elem, steps, callback){
    var animationSpeed = MyApp.params.animationSpeed;
    var innerAnimate = function(){
      
      var elemClass = elem.className;
      var currentStep = parseInt(elemClass.split("-")[1]);
      currentStep = (currentStep || 0)+1;
      if (currentStep === steps){
        elem.className = "";
        if (typeof callback === "function"){
          callback(elem);
        }
        return;
      }
      elemClass = elemClass.split("-")[0];
      elem.className = elemClass + "-" + currentStep;
      setTimeout(innerAnimate, animationSpeed);
    };
    innerAnimate();
  };


  return {
    random: function(from, to){
      return Math.floor((Math.random()*to)+from);
    },

    animate:          animate
  }
}();