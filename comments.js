const ul = document.getElementById("subCommentAvatar");
const editForm = document.forms["editForm"];
const editCard = document.querySelector(".editCard");
const submitEdit = document.querySelector("#submitEdit");
let editCommentId = null;
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
    getCommentTodelete(datas);
  })
  .catch(error => {});

const generateData = datas => {
  return datas.map(data => {
    let li = createNode("li"),
      img = createNode("img"),
      span = createNode("p"),
      span2 = createNode("span"),
      span3 = createNode("span");
    img.style.borderRadius = "10%";
    let nameParagraph = createNode("p");
    img.src = data.avatar;
    nameParagraph.textContent = data.name;
    span.textContent = data.comment;
    span2.textContent = "Delete";
    span2.classList.add("deleteButton");
    getCommentTodelete(data, span2);
    span3.textContent = "Edit";
    span3.classList.add("editButton");
    editCommentId = data;
    getEditTodelete(data, span3);

    append(li, img);
    append(li, nameParagraph);
    append(li, span);
    append(li, span2);
    append(li, span3);
    append(ul, li);
  });
};

function getCommentTodelete(data, span2) {
  span2.addEventListener("click", function() {
    let deleteUrl = baseUrl + `${data.id}` + "/comments/" + `${data.id}`;
    fetch(deleteUrl, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          document.location.reload(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
}

function getEditTodelete(data, span3) {
  span3.addEventListener("click", function() {
    editCard.classList.toggle("editCard");
    editCommentId = data.id;
    editForm.edit.value = data.comment;
    editCard.style.width = "40%";
    editCard.style.margin = "0 auto";
  });
}

const onSubmitEdit = e => {
  e.preventDefault();
  const editComment = {};
  editComment.comment = editForm.edit.value;
  editCommentApi(JSON.stringify(editComment));
  return addComment;
};
editForm.addEventListener("submit", onSubmitEdit, false);

function editCommentApi(data) {
  let editUrl =
    baseUrl + `${editCommentId}` + "/comments/" + `${editCommentId}`;
  console.log(editUrl);
  fetch(editUrl, {
    method: "PUT",
    body: data
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function handleImageUpload() {
  let image = document.getElementById("upload").files[0];

  var reader = new FileReader();

  reader.onload = function(e) {
    document.getElementById("display-image").src = e.target.result;
  };

  reader.readAsDataURL(image);
}
