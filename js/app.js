const addData = () => {
  const wordInput = document.getElementById("word-input").value;
  const quantityInput = document.getElementById("quantity-input").value;

  const payload = {
    title: wordInput,
    product: parseInt(quantityInput),
  };
  console.log("Payload being sent:", payload);

  fetch("http://127.0.0.1:8000/apiApp/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    })

    .then((data) => {
      console.log(data);
      alert("Data added successfully!");
      window.location.reload();
    })

    .catch((error) => {
      console.error("There Was A Problem With The Add Operation : ", error);
    })
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
        card.className = "card bg-dark text-light w-25 container p-5 mb-3 hovers";
        card.id = "border";
        card.innerHTML = `
          <h2><b>ID : </b> ${item.id}</h2>
          <h3>Title: ${item.title}</h3>
          <h3>Quantity: ${item.product}</h3> 
          <br>
          <button class="btn btn-light w-50 delete-btn">Delete</button>
        `;
        apiData.appendChild(card);

        //delete 
        const deleteButton = card.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          fetch(`http://127.0.0.1:8000/apiApp/delete/${item.id}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Fialed To Delete The Item.");
              }
            })
            .then(() => {
              console.log(`Item With Id ${item.id} Delete Successfull!`);
              card.remove();
              alert("Delete Successfull");
              window.location.reload();
            })
            .catch((error) => {
              console.error("There was a problem with the delete operation : ", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation : ", error);
    });
};
document.getElementById("add-button").addEventListener("click", addData);
fetchData();