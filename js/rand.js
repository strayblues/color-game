
function generateRandomColors(num){
  setLevel();
  // Objective:
  // Push 3 unique values into array
  var arr = []
  for(var i=0; i<num-2; i++){
      // Get random color and push into array
      if (level === 0){
        // push 1 color
        arr.push(practiceColor()); // TODO Make pushed colors different
        // push 2nd color
        arr.push(practiceColor()); // TODO Make pushed colors different
        // compare 1st and 2nd
        if (arr[i] == arr[i+1]) {
          // Remove 2nd color
          arr.pop(practiceColor());
          // push alternative 2nd color
          arr.push(practiceColor());
        } else {
          if (arr[i] == arr[i+2]) {
            arr.push(practiceColor());
          } else {
            arr.push(practiceColor());
          }
          // the 3rd and first can still be identical
        }
      }
      else {
        arr.push(randomColor()); // TODO Make pushed colors different
      }
  }

  // Return that array
  return arr;
}
