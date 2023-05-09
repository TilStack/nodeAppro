const faker = require('faker');


function generatestock(objects1) {
    console.log('------------------------');
    const randomproduit=faker.random.arrayElement(objects1);
    const stock= {
        date:faker.date.recent(),
        quantity: 0,        
        produit:randomproduit._id,
        priceachat: faker.finance.amount(20000,100000,2),       
        createdAt:faker.date.recent(),
    };
    return stock;
}

module.exports = generatestock;