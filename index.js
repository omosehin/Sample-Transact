const baseUrl = "http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/news/";
// const baseUrl = require('./baseUrl')
let errorId = document.getElementById("error");
let errorMsg = document.getElementById("errorMsg");
let Prev = document.getElementById("Prev");
let Next = document.getElementById("Next");
let arrData = null;
let pageNumber = 1;
const pageLimit = 10;

let getData = false;
const tableHeader = [
  { No: "", Title: "", Url: "1654", Avatar: "Parco", Action: "", View: "" }
];

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let cellContent = null;
      if (key === "avatar") {
        let img = document.createElement("img");
        img.src = element[key];
        console.log(img.src);
        cellContent = img;
      } else if (key === "buttonDelete") {
        let buttonDel = document.createElement("button");
        let buttontextDel = document.createTextNode("delete");
        buttonDel.appendChild(buttontextDel);
        buttonDel.setAttribute("class", "delButton");
        clickDelete(buttonDel, element.id);

        cellContent = buttonDel;
      } else if (key === "buttonview") {
        let buttonVie = document.createElement("button");
        let buttontextDel = document.createTextNode("View");
        buttonVie.appendChild(buttontextDel);
        buttonVie.setAttribute("class", "viewButton");
        clickView(buttonVie, element.id);
        cellContent = buttonVie;
      } else {
        cellContent = document.createTextNode(element[key]);
      }

      cell.appendChild(cellContent);
    }
  }
}

function clickView(data, key) {
  data.addEventListener("click", function() {
    location.href = "view_Comment.html";
    localStorage.setItem("id", key);
  });
}

let table = document.querySelector("table");

let data = Object.keys(tableHeader[0]);
generateTableHead(table, data);

const fetchSearchTopStories = (pageNumber, pageLimit = 0) => {
  fetch(baseUrl + `?page= ${pageNumber}&limit=${pageLimit}`)
    .then(res => res.json())
    .then(data => {
      arrData = data;
      let dataArr = data.map(
        ({ id, title, url, avatar, buttonDelete, buttonview }) => {
          return {
            id,
            title,
            url,
            avatar,
            buttonDelete,
            buttonview
          };
        }
      );
      getData = true;
      generateTable(table, dataArr);
      if (data) {
        errorId.style.display = "none";
      }
      if (!data) {
        Next.style.display = "none";
        Prev.style.display = "none";
      }
    })
    .catch(error => {
      text = document.createTextNode("Failed to fetch");
      errorMsg.appendChild(text);
      if (error) {
        Next.style.display = "none";
        Prev.style.display = "none";
      }
    });
};
window.addEventListener("load", fetchSearchTopStories(1, 10));

Next.addEventListener("click", () => {
  fetchSearchTopStories(pageNumber++, 10);
});
if (pageNumber <= 2) {
  Prev.style.disabled = true;
}
Prev.addEventListener("click", () => {
  fetchSearchTopStories(pageNumber--, 10);
});

function clickDelete(data, key) {
  localStorage.setItem("id", key);
  data.addEventListener("click", function() {
    localStorage.setItem("id", key);
    let id = localStorage.getItem("id");
    fetch(baseUrl + `${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.location.reload(true);
      })
      .catch(error => {
        console.log(error);
      });
  });
}
