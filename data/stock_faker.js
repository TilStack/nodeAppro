const faker = require('faker')


function generatestock(objects1) {
    console.log('------------------------');
    const randomP=faker.random.arrayElement(objects1)
    const stock= {
        date:faker.date.recent(),
        quantity: 0,   
        products:[randomP._id],     
        nomProduit:faker.commerce.productName(),       
        createdAt:faker.date.recent(),
    }
    return stock
}

module.exports = generatestock