let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/skyline", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let skylineSeed = [
  {
    name: "Playstation 5",
    category: "Video Games",
    price: 500,
    description: "Next gen video game console by Sony"
  },
  {
    name: "Xbox Series X",
    category: "Video Games",
    price: 500,
    description: "Next gen video game console by Microsoft"
  }
];

db.Product.deleteMany({})
  .then(() => db.Product.collection.insertMany(skylineSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
