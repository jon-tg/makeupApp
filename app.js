let form = document.getElementById('search');
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    productData(); 
    });

async function productData() {
        let container=document.getElementById('container');
        let product_type = document.getElementById('product_type').value;
        let brand=document.getElementById('brand').value;
        let filters=[product_type, brand];
        let filters_string=filters.join(',');

        let url=`https://sephora.p.rapidapi.com/us/products/v2/search?q=${filters_string}&pageSize=60&currentPage=1`;
        let options={
            method: 'GET',
	        headers: {
                'x-rapidapi-key': 'b826344945msh42df2aaca0f0af7p174a20jsna8ff390fb6ef',
                'x-rapidapi-host': 'sephora.p.rapidapi.com'
	}   
};
        try {

        let response= await fetch(url, options);
        let data= await response.json();
        console.log(response, data);
        let products=await data.products;

        try
        {            
       
            for (let i=0; i<products.length; i++)
                {
                    let product=document.createElement('img');
                    product.id='product';
                    product.style.maxWidth='300px';
                    product.style.maxHeight='300px';
                    let product_container=document.createElement('div');
                    product_container.id='product-container';
                    let productName=document.createElement('h4');
                    let brandName=document.createElement('p');
                    productName.textContent=products[i].productName;
                    brandName.textContent=products[i].brandName;
                    let productId=products[i].productId;
                    let productSKU=products[i].currentSku.skuId;
                    container.appendChild(product_container);
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

        catch(e)
        {
            console.log(e);
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
    wholeContainer.id='wholeContainer';
    let detailContainer=document.createElement('div');
    let productData=document.createElement('p');
    let productDetails=data.productDetails.longDescription;
    


    let productString=productDetails.split("<p>");
    let detailsFormatted = productString.join(" ");


  
    let detailLines=detailsFormatted.split("<br>");
    let productDesc="";


    for (let line of detailLines)
    {
        let lineString=line;

        lineString+="<br>"; 

        productDesc+=lineString;

    }

    let description=productDesc + "<br>" + data.productDetails.suggestedUsage + "</br>";


    let productTitle=document.createElement('h3');
    let descHeader=document.createElement('h3');
    
    document.body.appendChild(wholeContainer);
    wholeContainer.appendChild(detailContainer);

    descHeader.textContent="Product Description";
    descHeader.style.textAlign='center';
    productData.innerHTML=description;
    document.body.appendChild(productTitle);
    document.body.appendChild(descHeader);
    product.style.maxWidth='500px';
    wholeContainer.style.display='flex';
    wholeContainer.style.justifyContent='center';
    detailContainer.style.width='25%';
    productTitle.style.marginTop='2vh';
    productTitle.style.marginBottom='0';
    descHeader.style.marginTop='5px';
    wholeContainer.style.positon='relative';
    wholeContainer.style.top='5vh';
    wholeContainer.style.marginLeft='auto';
    wholeContainer.style.marginRight='auto';
    wholeContainer.style.height='auto';
    wholeContainer.style.flexBasis='300px';
    productData.style.margin=0;
    productData.style.padding=0;
    productTitle.textContent=data.content.seoTitle;
    productTitle.style.textAlign='center';
    product.style.alignSelf='center';
    document.body.appendChild(wholeContainer);
    detailContainer.appendChild(productData);
    wholeContainer.appendChild(product);

} catch (error) {
	console.error(error);
}
    

}
