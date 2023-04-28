const leader = document.getElementById("rzp1");

let isprem = localStorage.getItem("ispremium");
console.log("ispremium:", isprem);
if (isprem === "true") {
  document.getElementById("premuser").style.display = "block";
  document.getElementById("rzp1").style.display = "block";
} else {
  document.getElementById("rzp").style.display = "block";
}

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
    <li class="product-name">cost: ${data.spentAmount}</li>
    <li class="selling-price">description: ${data.Description}</li>
    <li class="product-desc">category: ${data.category}</li>
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
  const userId = localStorage.getItem("token");
  console.log(userId);
  const spentAmount = document.getElementById("name").value;
  const Description = document.getElementById("email").value;
  const category = document.getElementById("phone").value;
  const data = { spentAmount, Description, category, userId };
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

// RAZORPAY
document.getElementById("rzp").onclick = async (e) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    "http://localhost:4000/user/purchasePremium",
    { headers: { Auth: token } }
  );
  console.log("success response", response.data);
  //console.log(response.data.order.id);
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      await axios
        .post(
          "http://localhost:4000/user/status",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Auth: token } }
        )
        .then((res) => {
          console.log(res.data.user);
          localStorage.setItem("ispremium", res.data.user.ispremium);
          let isprem = localStorage.getItem("ispremium");
          console.log("ispremium:", isprem);
          location.reload();
        })
        .catch((err) => console.log(err));
      window.alert("you are a premium member!");
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
  rzp1.on("payment.failed", async function (response) {
    await axios.post(
      "http://localhost:4000/user/status",
      {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
        pf: "fail",
      },
      { headers: { Auth: token } }
    );
    console.log("payment failed response", response);
    window.alert("something went wrong!");
  });
};
// LOAD DATA

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  //console.log(token);
  axios
    .get("http://localhost:4000/user/get-Expense", {
      headers: { Auth: token },
    })
    .then((res) => {
      const dataArray = res.data.data;
      dataArray.forEach((data) => {
        showOutput(data);
      });
      //console.log("response", dataArray);
    })
    .catch((error) => {
      console.log(error);
    });
});

// LEADER BOARD
let leaderDetails = document.getElementById("leaderDetails");
let heading = document.getElementById("heading");
//console.log(heading);
function leaderBoardDetails(data) {
  heading.innerHTML = `<h1>leader board</h1>`;
  OutputHTML = `
  <ul>
    <li>name   :${data.name}</li>
    <li>total expense    :${data.total_cost}</li>
  </ul>`;
  leaderDetails.innerHTML += OutputHTML;
}

// LEADER BOARD

leader.addEventListener("click", leaderBoard);

async function leaderBoard() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/user/premuser", {
      headers: { Auth: token },
    });
    console.log(response.data);
    response.data.userDetails.forEach((data) => {
      leaderBoardDetails(data);
    });
  } catch (err) {
    console.log("premuser error::", err);
  }
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
