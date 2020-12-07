let allCars = [];
let data=[];
let cars_container = undefined;


function loadCarData() {
    let responseData;
        let url = "data/cars.json";
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
    let fuel=document.querySelector('input[name="fuel"]:checked').value;
    console.log(fuel);
    let new_cars = [];

    for (i = 0; i < cars.length; i++)
    {        
        if (cars[i].price <= price_value )
        {            
            new_cars.push(cars[i]);            
        }
    }
    for(z=0;z<new_cars.length;z++)
    {
        if(new_cars[z].type==fuel)
        finalcars.push(new_cars[z]);
    } 

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



