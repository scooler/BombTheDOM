describe("MyApp.utils.random()", function(){
  it("should return value from first given value, inclusive", function() {
    var i, result;
    for (i = 0; i < 100; i++){ //for consistency
      
      result = MyApp.utils.random(3,15);
      expect(result).toBeGreaterThan(2);
    }
  });
  it("should return value up to second given value, inclusive", function() {
    var i, result;
    for (i = 0; i < 100; i++){ //for consistency
      
      result = MyApp.utils.random(3,15);
      expect(result).toBeLessThan(16);
    }
  });
  it("should return every value from the range", function() {
    var i, results = [];
    for (i = 0; i < 100; i++){ //for consistency
      results.push(MyApp.utils.random(3,15));
    }
    for (i = 3; i <= 15; i++){
      expect(results).toContain(i);
    }
  });
});

describe("Array.prototype.each())", function(){
  it("should call function for each element", function(){
    var callCount = 0;
    [1, 2, 3].each(function(elem){
      callCount ++;
    });
    expect(callCount).toEqual(3);
  });

  it("should pass element number on the list to each function call", function(){
    var array = [9, 8, 11];
    array.each(function(elem, elemNumber){
      if (array[elemNumber] !== elem){
        fail("It should be called with given element and it's number in the array");
      }
    });
  });

  it("should not call function for empty array", function(){
    [].each(function(){ fail("It should not be called for empty array") });
  });
});