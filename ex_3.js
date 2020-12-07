let allCars = [];
let data=[];
let cars_container = undefined;



function loadCarData() {
    let responseData;
        let url = "cars.json";
        let methodType = "GET";

        // Create an object of XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Callback implementation
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                responseData = this.responseText;
                console.log(responseData);
                allCars = JSON.parse(responseData);
                displayImages(allCars);

               
            }
        }

        xhr.open(methodType, url, true);
        xhr.send();
}
$(document).ready(function(e){
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
        var concept = $(this).html();
        var search_filter=$(this).text();
        search_filter=search_filter.trim();
        console.log("search filter="+search_filter);

        $("button").on("click", function(){
            var search_input=$('.form-control').val();
            console.log("search_input="+search_input);
            console.log("search filter="+search_filter);
            let filter_model=[];
            let filter_car_petrol=[];
            let filter_car_diesel=[];
            let filter_prices=[];
            let filter_car_fuel=[];
            let all_filter=[];
         
        for(var i9=0;i9<allCars.length;i9++)
        {
            if(search_filter=="Model")
            {
                
                if(search_input==allCars[i9].car_name)
                {
                    
                    filter_model.push(allCars[i9]);
                }
                if(i9==allCars.length-1 && filter_model.length>0)
                displayImages(filter_model);
            }
            else if(search_filter=="Fuel")
            {
                if(search_input==allCars[i9].type)
                {
                    filter_car_fuel.push(allCars[i9]);
                }
                if(i9==allCars.length-1 && filter_car_fuel.length>0)
                displayImages(filter_car_fuel);

            }
            else if(search_filter=="Price")
            {
                if(search_input>=allCars[i9].price)
                filter_prices.push(allCars[i9]);
                if(i9==allCars.length-1 && filter_prices.length>0)
                displayImages(filter_prices);
            }
            else if(search_filter=='All')
            {
                 
                if(search_input==allCars[i9].car_name)
                {
                    
                    all_filter.push(allCars[i9]);
                }
                if(search_input>=allCars[i9].price)
                all_filter.push(allCars[i9]);
                if(search_input==allCars[i9].type)
                {
                    all_filter.push(allCars[i9]);
                }
                if(i9==allCars.length-1 && all_filter.length>0)
                displayImages(all_filter);
            }
            else
            alert("wrong input Please Try Again");
            
        }
        console.log(filter_car_fuel);
        // displayImages(filter_model);
    });
        
		$('.search-panel span#search_concept').html(concept);
		$('.input-group #search_param').val(param);
	});
});
$("button").on("click", function(){
    console.log($('.form-control').val());
  });
function filter()
{
    let cars = [], i = 0, j = 0,z=0;
    let finalcars=[];
    let brands = document.getElementsByName('vehicle1');

    for (i = 0; i < brands.length; i++)
    {        
        if (!brands[i].checked) continue;
        
        for (j = 0; j < allCars.length; j++)
        {            
            if (brands[i].value == allCars[j].car_name)
            {                
                cars.push(allCars[j]);
            }
        }
    }
       

    let price_range = document.getElementById('price-range');
    let price_value = parseInt(price_range.value);
    let fuel_check=document.getElementById('fuel').checked;
    console.log(fuel_check);
    if(fuel_check==true)
    var fuel=document.querySelector('input[name="fuel"]:checked').value;

    let new_cars = [];

    for (i = 0; i < cars.length; i++)
    {        
        if (cars[i].price <= price_value )
        {            
            new_cars.push(cars[i]);            
        }
    }
    if(fuel_check==true) {
    for(z=0;z<new_cars.length;z++)
    {
        if(new_cars[z].type==fuel)
        finalcars.push(new_cars[z]);
    } 
}

else
    finalcars=new_cars;
    console.log(finalcars);

    displayImages(finalcars);    
}
function display_car_based_on_fuel()
{
    let car_fuel=[];
    let k=0;
    let fuel1=document.querySelector('input[name="fuel"]:checked').value;
    for(k=0;k<allCars.length;k++)
    {
        if(allCars[k].type==fuel1)
        car_fuel.push(allCars[k]);
    }
    displayImages(car_fuel);
}
function filter_price()
{
    let car_fuel_filter=[];
    let price_range = document.getElementById('price-range');
    let price_value = parseInt(price_range.value);
    let n=0;
    for(n=0;n<allCars.length;n++)
    {
        if(allCars[n].price<=price_value)
            car_fuel_filter.push(allCars[n]);
    }
    displayImages(car_fuel_filter);
}
function displayImages(cars)
{
    cars_container = document.getElementById("cars-container");
    cars_container.innerHTML = "";

    for (let i = 0; i < cars.length; i++)
    { 
        let strCarDetails = `
        <div class="d-flex flex-row">
            <div class="p-2">
                <img src="${cars[i].image_url}"/>
            </div>
            <div class="p-2">
                <p>
                    <span>${cars[i].car_name}</span><br>
                    <span>Model ${cars[i].model}</span><br>
                    <span>Rs ${cars[i].price}</span><br>
                    <span>${cars[i].desc}</span><br>
                    <span>${cars[i].type}</span><br>
                </p>
            </div>
        </div>
        `;

        cars_container.innerHTML += strCarDetails;
    }
}


changePrice = (e) =>
{    
    document.getElementById('price').value = e.target.value;
}



