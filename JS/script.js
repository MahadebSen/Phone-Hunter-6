
document.getElementById("search-btn").addEventListener('click', function(){
    const searchInput = document.getElementById('search-input');
    // console.log(searchInput.value)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.data))
    searchInput.value = '';
});

const searchResult = data => {
    const searchResult = document.getElementById('search-result');
    for (const phone of data){
        const product = document.createElement('div');
        product.classList.add('col');
        product.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6>${phone.brand}</h6>
            </div>
            <button type="button" class="btn btn-outline-primary w-50">Details</button>
        </div>`;
        searchResult.appendChild(product);
    }
}