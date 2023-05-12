const faker = require('faker')

function generateproduit(object1) {
    console.log('------------------------')
    const min = 1000 // prix minimum en FCFA
    const max = 100000 // prix maximum en FCFA
    const fournisseur=faker.random.arrayElement(object1)
    const produit= {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),       
        price: faker.random.number({ min, max }),
        quantity: faker.datatype.number({min: 1, max: 100}),
        statut:faker.datatype.boolean(),
        fournisseur:fournisseur._id,
        createdAt:faker.date.recent(),
    }
    return produit
}

module.exports = generateproduit