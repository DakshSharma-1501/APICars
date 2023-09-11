const express=require('express');
const app=express();
const port=4543;

app.use(express.json());

//array of cars
let cars=[
        {
          "id": 1,
          "name": "E20d",
          "brand": "Mercedes",
          "price": 300000,
          "fuelType": "petrol",
          "transmission": "Automatic",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstimg.cardekho.com%2Fimages%2Fcarexteriorimages%2F930x620%2FMercedes-Benz%2FGLA%2F10849%2F1690447163011%2Ffront-left-side-47.jpg&tbnid=XKkwNhDKut7HiM&vet=12ahUKEwih39DC-6GBAxXEmmMGHQCkBZMQMygAegQIARB0..i&imgrefurl=https%3A%2F%2Fwww.cardekho.com%2Fcars%2FMercedes-Benz&docid=LwjBxXJR7KFxPM&w=930&h=620&q=mercedes&ved=2ahUKEwih39DC-6GBAxXEmmMGHQCkBZMQMygAegQIARB0"
        },
        {
          "id": 2,
          "name": "wrv",
          "brand": "Honda",
          "price": 1000000,
          "fuelType": "petrol",
          "transmission": "Manual",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstimg.cardekho.com%2Fimages%2Fcarexteriorimages%2F630x420%2FHonda%2FWR-V%2F7665%2F1645419998984%2Ffront-left-side-47.jpg&tbnid=5WiUWdlA6_hCiM&vet=12ahUKEwi0tcmZ_KGBAxVPSGwGHfSWDgkQMygBegQIARB2..i&imgrefurl=https%3A%2F%2Fwww.cardekho.com%2Fhonda%2Fwr-v-2020-2023&docid=RULhZj1uGSaBbM&w=630&h=420&q=wrv&ved=2ahUKEwi0tcmZ_KGBAxVPSGwGHfSWDgkQMygBegQIARB2"
        },
        {
          "id": 3,
          "name": "Harrier",
          "brand": "Tata",
          "price": 705445,
          "fuelType": "petrol",
          "transmission": "Manual",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimgd.aeplcdn.com%2F370x208%2Fn%2Fcw%2Fec%2F139139%2Fharrier-facelift-exterior-right-front-three-quarter.jpeg%3Fisig%3D0%26q%3D80&tbnid=9nvFZ_u6F23eyM&vet=12ahUKEwjmrZXZ_KGBAxU9zaACHQyGDdYQMygBegQIARB2..i&imgrefurl=https%3A%2F%2Fwww.carwale.com%2Ftata-cars%2Fharrier-facelift%2Fimages%2F&docid=60ipQfWXetjMRM&w=370&h=208&itg=1&q=tata%20harrier&ved=2ahUKEwjmrZXZ_KGBAxU9zaACHQyGDdYQMygBegQIARB2"
        },
        {
          "id": 4,
          "name": "Fortuner",
          "brand": "Toyota",
          "price": 10008976,
          "fuelType": "petrol",
          "transmission": "Manual",
          "imageUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.smartprix.com%2Fbytes%2Fwp-content%2Fuploads%2F2022%2F08%2FFortuner-Gold-1.webp&tbnid=AIRZG7IEsuZYfM&vet=12ahUKEwjhm7an_aGBAxVr2jgGHQikCDoQMygLegUIARCKAQ..i&imgrefurl=https%3A%2F%2Fwww.smartprix.com%2Fbytes%2Fa-look-at-indias-1st-gold-wrapped-toyota-fortuner-legender%2F&docid=bg5RE6Y9kjcKFM&w=1200&h=675&q=fortuner&ved=2ahUKEwjhm7an_aGBAxVr2jgGHQikCDoQMygLegUIARCKAQ"
        },
        {
          "id": 5,
          "name": "Wrangler",
          "brand": "Jeep",
          "price": 450000,
          "fuelType": "petrol",
          "transmission": "Manual",
          "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstormjeeps.com%2F&psig=AOvVaw29szW3Pd2h7pe6-9XQOUO-&ust=1694501939591000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOCtkuP9oYEDFQAAAAAdAAAAABAE"
        }
      ]
      

//Creating a new car
app.post('/api/cars',(req,res)=>{
    const newCar=req.body;
    newCar.id=Math.random()
    cars.push(newCar);
    res.status(201).json(newCar);
});

//Reading all cars
app.get('/api/cars',(req,res)=>{
    res.json(cars);
});

//Read a Single car by ID
app.get('/api/cars/:id',(req,res)=>{
    const car = cars.find((t) => t.id.toString() === req.params.id);

    if(!car){
        res.status(404).send('car not found');
    }
    else{
        res.send(car);
    }
});

//updating a car by id 
app.put('/api/cars/:id', (req, res) => {
    const carId = req.params.id;
    const updatedCar = req.body;
    const index = cars.findIndex(car => car.id.toString() === req.params.id);
  
    if (index >-1) {
     const old =cars[index]
      cars[index]={
        ...old, ...updatedCar} ;
      res.send('done');
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
  });
  

//Delete car by ID
app.delete('/api/cars/:id',(req,res)=>{
    const carID=parseInt(req.params.id);
    const index=cars.findIndex((car)=>car.id.toString()===carID);
    if(!index>-1){
        res.status(404).send("NOt found");
    }
    else{
        cars.splice(index, 1)
        res.send("Car deleted");
    }
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
