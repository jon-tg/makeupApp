let form = document.getElementById('search');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    data(); 
    });

async function data() {
    try {
        let container=document.getElementById('container');
        let product_type = document.getElementById('product_type').value;
        let brand=document.getElementById('brand').value;
        let filters=[];
        filters.push(product_type, brand);
        let filters_string=filters.join(',');

        let url=`https://sephora.p.rapidapi.com/us/products/v2/search?q=${filters_string}&pageSize=60&currentPage=1`;
        let options={
            method: 'GET',
	        headers: {
		'X-RapidAPI-Key': 'b826344945msh42df2aaca0f0af7p174a20jsna8ff390fb6ef',
		'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
            
	},
        
};

        let response= await fetch(url, options);
        let data= await response.json();
        let products=await data.products;
        console.log(products);
        console.log(data);

        for (let i=0; i<products.length; i++)
            {
                let product=document.createElement('img');
                let product_container=document.createElement('div');
                product_container.id='product-container';
                let productName=document.createElement('h4');
                let brandName=document.createElement('p');
                productName.textContent=products[i].productName;
                brandName.textContent=products[i].brandName;
                container.appendChild(product_container);
                product.src=products[i].heroImage;
                product_container.appendChild(product);
                product_container.appendChild(productName);
                product_container.appendChild(brandName);
            }


    } catch (error) {
        console.error('Error:', error);
    }

}

