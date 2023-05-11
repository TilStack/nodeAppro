const faker = require('faker')

function generateproduit() {
    console.log('------------------------')
    const min = 1000 // prix minimum en FCFA
    const max = 100000 // prix maximum en FCFA
    const produit= {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),       
        price: faker.random.number({ min, max }),
        quantity: faker.datatype.number({min: 1, max: 100}),
        statut:faker.datatype.boolean(),
        createdAt:faker.date.recent(),
    }
    return produit
}

module.exports = generateproduit