const ul = document.getElementById('authors'); // Get the list where we will place our authors
const baseUrl = " http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/";




function createNode(element) {
    return document.createElement(element); // Create the type of element you pass in the parameters
  }

  function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
  }

  fetch(baseUrl + "/news?page=1&limit=10")
  .then(res => res.json())
  .then(function(data) {
      console.log(data)
    let authors = data; // Get the results
    return authors.map(function(author) { // Map through the results and for each run the code below
      let li = createNode('li'), //  Create the elements we need
          img = createNode('img'),
          span = createNode('span');
      img.src = author.avatar;  // Add the source of the image to be the src of the img element
      span.innerHTML = `${author.name.first} ${author.name.last}`; // Make the HTML of our span to be the first and last name of our author
      append(li, img); // Append all our elements
      append(li, span);
      append(ul, li);
    })
  })