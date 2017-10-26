// EXERCISE
// Detect first visit
function isFirstVisit(){
  // this is the first time
  if (! localStorage.noFirstVisit) {
    // show the element
    $("#firstVisit").show();

    // and do the thing

    // document.getElementById('first').style.display = 'block';


    // check this flag for escaping this if block next time
    localStorage.noFirstVisit = true;
  }
}
