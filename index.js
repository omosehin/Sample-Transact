const baseUrl = " http://5d2c2f2b8c90070014972225.mockapi.io/api/v2/";

const mountains = [{ Title: "", Url: "1654", Avatar: "Parco", Action: "" }];

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

      console.log("key", element[key]);
      if (key === "avatar") {
        let img = document.createElement("img");
        img.src = element[key];

        cellContent = img;
      } else {
        cellContent = document.createTextNode(element[key]);
      }

      cell.appendChild(cellContent);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(mountains[0]);
let dataArr = [];
fetch(baseUrl + "/news?page=1&limit=10")
  .then(res => res.json())
  .then(data => {
    console.log("datat____", data);
    let dataArr = data.map(({ title, url, avatar }) => {
      return {
        title,
        url,
        avatar
      };
    });
    generateTable(table, dataArr);
  })
  .catch(error => {
    console.log("hiiii", error);
  });

generateTableHead(table, data);

var tr = document.getElementsByTagName("tr");
