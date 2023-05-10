const faker = require('faker')


function generatestock() {
    console.log('------------------------');
    const stock= {
        date:faker.date.recent(),
        quantite: 0,        
        nomproduit:faker.commerce.productName(),       
        createdAt:faker.date.recent(),
    }
    return stock
}

module.exports = generatestock