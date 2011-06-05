(function(){
  
    var changeBgPossitionX = function(elem, to){
      elem.style.backgroundPosition = to + " " + elem.style.backgroundPosition.split(" ")[1];
    };
    var changeBgPossitionY = function(elem, to){
      elem.style.backgroundPosition = elem.style.backgroundPosition.split(" ")[0] + " " + to;
    };
    
    MyApp.utils.changeBgPossitionX = changeBgPossitionX;
    MyApp.utils.changeBgPossitionY = changeBgPossitionY;
    MyApp.utils.animate = function(elem, steps, cyclic, callback){
    var countUp = 0;
    if (typeof elem.animator === "object"){
      elem.animator.stopAnimation();
    }
    var animationSpeed = MyApp.params.animationSpeed;
    var timerHandle, animationStoped = false;
    var innerAnimate = function(){
      if (animationStoped){ return };
      countUp ++;
      if (countUp === steps){
        if (!cyclic){ 
          if (typeof callback === "function"){
            callback(elem);
          }
          return; 
        }
        countUp = 0;
      }
      changeBgPossitionX(elem, countUp * -32);
      timerHandle = setTimeout(innerAnimate, animationSpeed);
    };
    innerAnimate();

    elem.animator = {
      stopAnimation: function(){
        clearTimeout(timerHandle);
        animationStoped = true;
      }
    };
    return elem.animator;
  }

})();