

const loadingPhone = async (searchText = '13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayShowPhone(phones, isShowAll)
    // console.log(phones);

};

// loadingPhone();

const displayShowPhone = (phones , isShowAll) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';


    // How much search show phone 
       // 

    const showAll = document.getElementById('showAllPhone');
    if(phones.length > 10 && !isShowAll){
      showAll.classList.remove('hidden')
    }
    else{
      showAll.classList.add('hidden') 
    }

    if(!isShowAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {

        // console.log(phone);
        const phoneCardList = document.createElement('div');
        phoneCardList.classList = `card w-96 bg-gray-100 shadow-xl`;
        phoneCardList.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.brand}</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}'); show_detais_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        
        `;

        phoneContainer.appendChild(phoneCardList)
    });

    toggleLoadingSpinner(false);
}




const searchDataHandle = (isShowAll) =>{
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('searchhField');
  const searchText = searchField.value;
  console.log(searchText)

  loadingPhone(searchText , isShowAll);
}


const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loadingSpinner');
  
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}





// Show ALl 
const handleShowALl = () =>{
  searchDataHandle(true);
};


const handleShowDetails = async (id) =>{
  // console.log('Show details Click');
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();

  const phone = data.data

  showPhoneDetails(phone);

}


const showPhoneDetails = (phone) =>{

  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const phoneDetails =document.getElementById('showDetailsContainer');
  phoneDetails.innerHTML =  `
  <img src="${phone.image}" alt="" srcset="">

  <p> <span>Storage: ${phone?.mainFeatures.storage} </span> </p>
  <br>
  <p> <span>GPS: ${phone?.others.GPS} </span> </p>
  <br>
  <p> <span>GPS: ${phone?.releaseDate} </span> </p>
  <br>

  <button class="btn btn-outline btn-success">Buy Now</button>
 
 
  





  `

  show_detais_modal.showModal()


}

loadingPhone();