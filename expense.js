// BACKEND DATA RENDER ON FRONT END
// const form = document
//   .getElementById("registration-form")
//   .addEventListener("submit", showOutput);
let resultDiv = document.getElementById("result");
//const total = document.getElementById("total");
//let totalAmount = 0;
function showOutput(data) {
  //const data = { name, Amount, Desc };
  // totalAmount += newData.Amount * 1;
  // console.log(totalAmount);
  // total.innerHTML = `total worth of the products :$${totalAmount}`;
  OutputHTML = `
  <ul class="product-list">
    <li class="product-name">Product Name: ${data.spentAmount}</li>
    <li class="selling-price">Selling Price: ${data.Description}</li>
    <li class="product-desc">Desc: ${data.category}</li>
    <li class="product-actions">
      <button class="delete-button" onclick="deleteData('${data.id}')">Delete</button>
      <button class="edit-button" onclick="updateData('${data.id}')">Edit</button>
    </li>
  </ul>`;
  resultDiv.innerHTML += OutputHTML;
}

//POST REQUEST

const form = document
  .getElementById("expense-form")
  .addEventListener("submit", networkCall);

function networkCall(event) {
  event.preventDefault();
  const spentAmount = document.getElementById("name").value;
  const Description = document.getElementById("email").value;
  const category = document.getElementById("phone").value;
  const data = { spentAmount, Description, category };
  axios
    .post("http://localhost:4000/user/add-Expense", data)
    .then(function (res) {
      showOutput(res.data.data);
      console.log(res.data.data);
      console.log("user created!");
    })
    .catch(function (err) {
      console.log(err.name);
    });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

// LOAD DATA

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4000/user/get-Expense")
    .then((res) => {
      const dataArray = res.data.data;
      dataArray.forEach((data) => {
        showOutput(data);
      });
      console.log("response", dataArray);
    })
    .catch((error) => {
      console.log(error);
    });
});

//DELETE REQUEST

function deleteData(id) {
  axios
    .post("http://localhost:4000/user/delete-Expense", { id: id })
    .then(function (res) {
      console.log("user deleted!");
    })
    .catch((err) => console.log(err));

  location.reload();
}

// function updateData(id) {
//   const name = document.getElementById("name").value;
//   const Amount = document.getElementById("Amount").value;
//   const Desc = document.getElementById("Desc").value;

//   axios
//     .post("http://localhost:3000/user/edit-prod", { name, Amount, Desc })
//     .then(function (res) {
//       console.log("user updated!");
//     })
//     .catch((err) => console.log(err));
// }
