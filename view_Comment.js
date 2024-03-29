let avatar = document.querySelector(".avatarCls");
let title = document.querySelector(".fetchTitle");
let errorMsg = document.getElementById("errorMsg");
let name = document.querySelector(".name");
let url = document.querySelector(".url");
let dateCreated = document.querySelector(".created");
let editButton = document.getElementById("edit_comment");
let validateName = document.querySelector(".validateName");
let goBack = document.querySelector("#goBack");
// let submitButton = document.querySelector(button);
goBack.addEventListener("click", () => {
  location.href = "index.html";
});
const form = document.forms["addComment"];

const onSubmit = e => {
  e.preventDefault();
  const addComment = {};
  addComment.comment = form.comment.value;
  addComment.name = form.name.value;
  addComment.file = form.file.value;
  submitwithApi(JSON.stringify(addComment));
  return addComment;
};

form.addEventListener("submit", onSubmit, false);

const submitwithApi = data => {
  let getNewsid = baseUrl + `${commentId}` + "/comments";
  fetch(getNewsid, {
    method: "POST",
    body: data
  })
    .then(res => res.json())
    .then(data => {
      let text = document.createTextNode(data);
      errorMsg.appendChild(text);
    })
    .catch(error => {
      let text = document.createTextNode(error);
      errorMsg.appendChild(text);
    });
};
let id = localStorage.getItem("id");
let getById = baseUrl + `/${id}`;
fetch(getById)
  .then(res => res.json())
  .then(data => {
    getData(data);
  })
  .catch(error => {});

function getData(data) {
  let img = document.createElement("img");
  img.src = data.avatar;
  avatar.append(img);
  img.style.borderRadius = "50%";
  let mainTitle = data.title;
  title.textContent = mainTitle;

  let mainUrl = data.url;
  url.textContent = mainUrl;

  let dateCreate = data.createdAt;
  dateCreated.textContent = dateCreate.split("T")[0];
}
