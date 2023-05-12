const faker = require('faker')

function generatefournisseur(objects1) {
    console.log('------------------------')   
    const fournisseur= {
        name: faker.name.lastName(),
        adresse: faker.address.city(),
        email: faker.internet.email(),
        telephone: faker.phone.phoneNumber(),    
        createdAt:faker.date.recent(),
    }
    return fournisseur
}

module.exports = generatefournisseur