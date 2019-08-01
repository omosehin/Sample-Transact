let avatar = document.querySelector(".avatarCls");
let title = document.querySelector(".fetchTitle");
let name = document.querySelector(".name");
let url = document.querySelector(".url");
let dateCreated = document.querySelector(".created");
let editButton = document.getElementById("edit_comment");
let formsy = document.querySelector("#addComment");


// formsy.style.display='none'
// document.forms.hero.heroName.focus();
const form = document.forms["addComment"];

const onSubmit = e => {
  e.preventDefault();
  const addComment = {};
  addComment.comment = form.comment.value;
  addComment.name = form.name.value;
  console.log(JSON.stringify(addComment));
  return addComment;
};
form.addEventListener("submit", onSubmit, false);
let id = localStorage.getItem("id");
let getById = baseUrl + `/${id}`;
fetch(getById)
  .then(res => res.json())
  .then(data => {
    getData(data);
  })
  .catch(error => {
    console.log("I am error", error);
  });

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
