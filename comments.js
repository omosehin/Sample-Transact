const ul = document.getElementById("subCommentAvatar");

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {

  return parent.appendChild(el);
  
}
let commentId = localStorage.getItem("id");

let getCommentsId = baseUrl + `${commentId}` + "/comments";

fetch(getCommentsId)
  .then(res => res.json())
  .then(datas => {
    generateData(datas);
  })
  .catch(error => {
    console.log("I am error", error);
  });

const generateData = datas => {
  return datas.map(data => {
    let li = createNode("li");
    let img = createNode("img");
    let span = createNode("p");
    let span2 = createNode("span");
    let span3 = createNode("span");
    img.style.borderRadius = "10%";    
    let nameParagraph = createNode("p");
    img.src = data.avatar;
    nameParagraph.textContent = data.name;
    span.textContent = data.comment;
    span2.textContent = "Delete";
    span2.classList.add('deleteButton');
    span3.textContent = "Edit";
    span3.classList.add('editButton');


    append(li, img);
    append(li, nameParagraph);
    append(li, span);
    append(li, span2);
    append(li, span3);
    append(ul, li);
  });
};
