(function(){
  
    MyApp.utils.animate = function(elem, steps, cyclic){
    var countDown = steps;
    var animationSpeed = MyApp.params.animationSpeed;
    var innerAnimate = function(){
      var bgPossition = elem.style.backgroundPosition || "0px 0px";
      var currentPossition = parseInt(bgPossition.split(" ")[0]);
      currentPossition = currentPossition - 32;
      // if (currentStep === steps){
      //   elem.className = "";
      //   if (typeof callback === "function"){
      //     callback(elem);
      //   }
      //   return;
      // }


      elem.style.backgroundPosition = currentPossition + "px " + bgPossition.split(" ")[1];
      countDown --;
      if (countDown !== 0){
        setTimeout(innerAnimate, animationSpeed);
      }else{
        if (cyclic){ //restart animation
          elem.style.backgroundPosition = "0px 0px"//currentPossition + "px " + bgPossition.split(" ")[1];
          countDown = steps;
          setTimeout(innerAnimate, animationSpeed);
        }
      }
    };
    innerAnimate();

    //TODO return token to stop animation
  };

})();