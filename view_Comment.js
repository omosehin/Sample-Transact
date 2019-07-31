const baseUrl = " http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news";

let avatar = document.querySelector(".avatarCls");
let title = document.querySelector(".fetchTitle");
let url = document.querySelector(".url");
let dateCreated = document.querySelector(".created");

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
  avatar.append(img.src);

  let mainTitle = data.title;
  title.textContent = mainTitle;

  let mainUrl = data.url;
  url.textContent = mainUrl;

  let dateCreate = data.createdAt;
  dateCreated.textContent = dateCreate.split("T")[0];
}
