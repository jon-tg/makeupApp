let form = document.getElementById('search');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    productData(); 
    });

async function productData() {
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
        try {

        let response= await fetch(url, options);
        let data= await response.json();
        let products=await data.products;
        console.log(products);
        console.log(productData);

        try
        {
            
       
            for (let i=0; i<products.length; i++)
                {
                    let product=document.createElement('img');
                    let product_container=document.createElement('div');
                    product_container.id='product-container';
                    let productName=document.createElement('h4');
                    let brandName=document.createElement('p');
                    productName.textContent=products[i].productName;
                    brandName.textContent=products[i].brandName;
                    let productId=products[i].productId;
                    let productSKU=products[i].currentSku.skuId;
                    container.appendChild(product_container);
                    product.style.maxWidth='300px';
                    product.src=products[i].heroImage;
                    product_container.appendChild(product);
                    product_container.appendChild(productName);
                    product_container.appendChild(brandName);

                    product_container.onclick=()=>
                        {
                            productDetails(productId, productSKU, product);
                        };


                }
        }

        catch
        {
            let error=document.createElement('h3');
            error.style.textAlign='center';
            error.textContent='No matching products';
            document.body.appendChild(error);
        }

    } catch (error) {
        console.error('Error:', error);
    }

   
}

async function productDetails(productId, productSKU, product)
{
    container.remove();
    const url = `https://sephora.p.rapidapi.com/us/products/v2/detail?productId=${productId}&preferedSku=${productSKU}`;
    const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b826344945msh42df2aaca0f0af7p174a20jsna8ff390fb6ef',
		'x-rapidapi-host': 'sephora.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json();
	console.log(data);

    let wholeContainer=document.createElement('div');
    let detailContainer=document.createElement('div');
    let productData=document.createElement('p');
    document.body.appendChild(wholeContainer);
    wholeContainer.appendChild(detailContainer);
    let description=data.productDetails.longDescription + "<br><br>" + data.productDetails.suggestedUsage + "</br></br>";
    let productTitle=document.createElement('p');
    let descHeader=document.createElement('h3');
    descHeader.textContent="Product Description";
    productData.innerHTML=description;
    wholeContainer.style.width='80%';
    detailContainer.style.width='60%';
    detailContainer.style.textAlign='right';
    wholeContainer.style.position='relative';
    wholeContainer.style.marginLeft='20%';
    detailContainer.style.position='relative';
    detailContainer.style.textAlign='left';
    detailContainer.style.marginLeft='25%';
    productData.style.margin=0;
    productData.style.padding=0;
    productTitle.textContent=data.content.seoTitle;
    descHeader.style.textAlign='center';
    descHeader.style.position='relative';
    document.body.appendChild(descHeader);
    document.body.appendChild(wholeContainer);
    detailContainer.appendChild(productTitle);
    detailContainer.appendChild(productData);
    wholeContainer.appendChild(product);
    wholeContainer.style.height=detailContainer.style.height;
    descHeader.style.top='5vh';
    wholeContainer.style.top='5vh';
    product.style.position='absolute';
    product.style.top='15%';
    

} catch (error) {
	console.error(error);
}
    

}
