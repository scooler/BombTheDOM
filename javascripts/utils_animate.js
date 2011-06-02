(function(){
  
    MyApp.utils.animate = function(elem, steps, cyclic){
    var countDown = steps;
    var animationSpeed = MyApp.params.animationSpeed;
    var timerHandle, animationStoped = false;
    var innerAnimate = function(){
      if (animationStoped){ return };
      var bgPossition = elem.style.backgroundPosition || "0px 0px";
      var currentPossition = parseInt(bgPossition.split(" ")[0]);
      currentPossition = currentPossition - 32;

      elem.style.backgroundPosition = currentPossition + "px " + bgPossition.split(" ")[1];
      countDown --;
      if (countDown !== 0){
        timerHandle = setTimeout(innerAnimate, animationSpeed);
      }else{
        if (cyclic){ //restart animation
          elem.style.backgroundPosition = "0px 0px";
          countDown = steps;
          timerHandle = setTimeout(innerAnimate, animationSpeed);
        }
      }
    };
    innerAnimate();
    return {
      stopAnimation: function(){
        clearTimeout(timerHandle);
        animationStoped = true;
      }
    }
  }

})();