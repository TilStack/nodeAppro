const faker = require('faker')


function generatestock() {
    console.log('------------------------');
    const stock= {
        date:faker.date.recent(),
        quantity: 0,        
        nomProduit:faker.commerce.productName(),       
        createdAt:faker.date.recent(),
    }
    return stock
}

module.exports = generatestock