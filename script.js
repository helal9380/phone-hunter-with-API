/** @format */

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
  // console.log(phones)
};

const displayPhones = (phones) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  // const showAllBtn = document.getElementById("hidden-btn");
  // if (phones.length > 12) {
  //   showAllBtn.classList.remove("hidden");
  // } else {
  //   showAllBtn.classList.add("hidden");
  // }

  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card w-96 bg-base-100 shadow-xl`;
    cardDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowAllDetail('${phone.slug}')" class="btn btn-primary">Show all details</button>
        </div>
        </div>
        `;
    cardContainer.appendChild(cardDiv);
  });
  loadingSpinner(false);
};

// handle show all detail
const handleShowAllDetail = async (id) => {
  // console.log('click show all detail', id)
  // single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  console.log(phone);
  showDetailModel(phone);
};
const showDetailModel = (phone) => {
  show_all_model.showModal();
  const showAllDetails = document.getElementById("show-all-details-container");
  showAllDetails.classList.add("phone-name");
  showAllDetails.innerHTML = `
    <img class= "img-center" src="${phone.image}">
    <h2>${phone.name}</h2>
    <h4>Brand : ${phone.brand}</h4>
    <h4>Display size : ${phone.mainFeatures.displaySize}</h4>
    <h4>Memory : ${phone.mainFeatures.memory}</h4>
    <h4>Storage : ${phone.mainFeatures.storage}</h4>
    <h4 id="sensors">Sensors :</h4>
    <h4>GPS : ${phone?.others?.GPS || 'data no found'}</h4>
    `;
  const getSensor = phone.mainFeatures.sensors;
  const addSensor = document.getElementById('sensors')
  for (const sensor of getSensor) {
    const li = document.createElement('li')
    li.innerText = sensor;
    addSensor.appendChild(li);
  }
};

const handler = () => {
  loadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  loadPhone(searchText);
};
const loadingSpinner = (isLoading) => {
  const toggleLoadingSpinner = document.getElementById("toggleSpinner");
  if (isLoading) {
    toggleLoadingSpinner.classList.remove("hidden");
  } else {
    toggleLoadingSpinner.classList.add("hidden");
  }
};

// loadPhone()
