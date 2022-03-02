// spinner add
const displaySpinner = (displayType) => {
    document.getElementById('toggle-spinner').style.display = displayType;
};

// search button event
document.getElementById("search-btn").addEventListener('click', function(){
    document.getElementById('product-details').textContent = '';
    document.getElementById('product-show-more').textContent = '';
    displaySpinner('block');
   dataFetch();
});

// search button data fetch
const dataFetch = () =>{
    const searchInput = document.getElementById('search-input');
    const storeSearchValue =  searchInput.value.toLowerCase();
    if (searchInput.value === ''){
        document.getElementById('product-details').innerHTML =  `
        <p class="text-center my-auto">Please write somthing in search field</p>`;
        document.getElementById('search-result').innerHTML = '';
    }
    else{
       
        const url = `https://openapi.programming-hero.com/api/phones?search=${storeSearchValue}`
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(data => searchResult(data))
        searchInput.value = '';
    };
};

// search result 
const searchResult = searchData => {
    const searchResult = document.getElementById('search-result');
    document.getElementById('product-show-more').innerHTML = '';
    searchResult.innerHTML = '';
    if (searchData.status === false){
        document.getElementById('product-details').innerHTML =  `
        <p class="text-center mt-5 pt-5 fw-bold">No search result found</p>`;
    }
    else{
        const resultArray = searchData.data;
        const sliceIt = resultArray.slice(0,20);
        console.log(sliceIt)

        for (const product of sliceIt){
            
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${product.image}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${product.phone_name}</h5>
                    <h6>${product.brand}</h6>
                </div>
                <button onclick="detailsCall('${product.slug}')" type="button" class="btn btn-outline-primary w-50">Details</button>
            </div>`;
            searchResult.appendChild(div);
        };
        if (sliceIt.length >= 20){
            const showMoreDiv = document.createElement('div')
            showMoreDiv.innerHTML = `
            <button onclick="" type="button" class="btn btn-outline-primary mb-3">Show more</button>`;
            document.getElementById('product-show-more').appendChild(showMoreDiv);
            
        };
    };
    displaySpinner('none');
    
};

// item details data fetch
const detailsCall = id =>{
    // console.log(id)
    const url2 = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url2)
    .then(res => res.json())
    .then(data => details(data.data));

};


// details data display
const details = features =>{
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = '';
    const div2 = document.createElement('div');
    div2.classList.add('card');
    div2.classList.add('text-center');
    div2.classList.add('m-5');
    div2.innerHTML = `
    <div class="card-header">
        Featured
    </div>
    <img src="${features.image}" class="card-img-top w-50 mx-auto p-3" alt="">
    <div class="card-body">
        <h4 class="card-title">${features.name}</h4>
        <h5 class="card-title"><span class="fw-bold">Brand: </span>${features.brand}</h5>
        <p id="release-date" class="card-text"><span class="fw-bold">Release Date: </span>${releaseDate(features.releaseDate)}</p>
        <p class="card-text"><span class="fw-bold">Main Features: </span>
            <ul>
                <li><span class="fw-bold">Chipset:  </span>${features.mainFeatures.chipSet}</li>
                <li><span class="fw-bold">Display Size:  </span>${features.mainFeatures.displaySize}</li>
                <li><span class="fw-bold">Memory:  </span>${features.mainFeatures.memory}</li>
                <li><span class="fw-bold">Sensores:  </span>${features.mainFeatures.sensors}</li>
                <li><span class="fw-bold">Storage: </span>${features.mainFeatures.storage}</li>
            </ul>
        </p>
        <p class="card-text"><span class="fw-bold">others: </span>
            <ul>
                <li><span class="fw-bold">Bluetooth:  </span>${features.others.Bluetooth}</li>
                <li><span class="fw-bold">GPS:  </span>${features.others.GPS}</li>
                <li><span class="fw-bold">NFC:  </span>${features.others.NFC}</li>
                <li><span class="fw-bold">Radio:  </span>${features.others.Radio}</li>
                <li><span class="fw-bold">USB: </span>${features.others.USB}</li>
                <li><span class="fw-bold">WLAN: </span>${features.others.WLAN}</li>
            </ul>
        </p>
    </div>
    <div class="card-footer text-muted">
        Info about ${features.name}
    </div>`
    productDetails.appendChild(div2);
};

// relese date function
const releaseDate = date =>{
    if (date === ""){
        const releaseDateData = 'No release date found';
        return releaseDateData;
    }
    else{
        const releaseDateData2 = date;
        return releaseDateData2;
    };
};



