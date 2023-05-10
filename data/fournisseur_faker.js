const faker = require('faker')

function generatefournisseur(objects1) {
    console.log('------------------------')
    const randomProduit=faker.random.arrayElement(objects1)
   
    const fournisseur= {
        name: faker.name.lastName(),
        adresse: faker.address.city(),
        email: faker.internet.email(),
        telephone: faker.phone.phoneNumber(),       
        produits: [randomProduit._id],
        createdAt:faker.date.recent(),
    }
    return fournisseur
}

module.exports = generatefournisseur