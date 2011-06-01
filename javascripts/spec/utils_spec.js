describe("MyApp.utils.random()", function(){
  it("return value from first given value, inclusive", function() {
    var i, result;
    for (i = 0; i < 100; i++){ //for consistency
      
      result = MyApp.utils.random(3,15);
      expect(result).toBeGreaterThan(2);
    }
  });
  it("return value up to second given value, inclusive", function() {
    var i, result;
    for (i = 0; i < 100; i++){ //for consistency
      
      result = MyApp.utils.random(3,15);
      expect(result).toBeLessThan(16);
    }
  });
  it("return every value from the range", function() {
    var i, results = [];
    for (i = 0; i < 100; i++){ //for consistency
      results.push(MyApp.utils.random(3,15));
    }
    for (i = 3; i <= 15; i++){
      expect(results).toContain(i);
    }
  });
});