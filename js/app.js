// const displayData = () => {
//   fetch(`http://127.0.0.1:8000/apiApp/list/`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       console.log("Response Status : ", res.status);
//       if (!res.ok) {
//         throw new Error("Network Response Waz Not Ok")
//       }
//       return res.json()
//     })
//     .then((data) => {
//       const apiData = document.getElementById("data-container");
//       console.log("Recived Data : ", data);
//       apiData.innerHTML = "";
//       data.forEach((item) => {
//         const card = document.createElement("div");
//         card.className = "card w-25 container p-5";
//         card.style.borderRadius = "15px";
//         card.style.boxShadow = "4px 4px 8px gray";
//         card.innerHTML = `
//           <h2><strong>ID : </strong> ${item.id}</h2>
//           <h3>Title : ${item.title}</h3>
//           <h3>Product : ${item.product}</h3>
//           <br/>
//           <button class="w-25 btn btn-danger">Delete</button>
//       `;
//         apiData.appendChild(card);
//       });
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation : ", error)
//     })
// }
// displayData();

const addData = async () => {
  const wordInput = document.getElementById("word-input").value;
  const quantityInput = document.getElementById("quantity-input").value;

  const payload = {
    title: wordInput,
    product: parseInt(quantityInput),
  };
  console.log("Payload being sent:", payload);

  try {
    const response = await fetch('http://127.0.0.1:8000/apiApp/create/', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const fetchData = () => {
  fetch(`http://127.0.0.1:8000/apiApp/list/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network Response Was Not Ok");
      }
      return res.json();
    })
    .then((data) => {
      const apiData = document.getElementById("data-container");
      apiData.innerHTML = "";
      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card w-25 container p-5 mb-2";
        card.innerHTML = `
          <h2><strong>ID: </strong> ${item.id}</h2>
          <h3>Title: ${item.title}</h3>
          <h3>Quantity: ${item.product}</h3> 
        `;
        apiData.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
document.getElementById("add-button").addEventListener("click", addData);
fetchData();