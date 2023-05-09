const faker = require('faker');


function generateappro(objects1) {
    console.log('------------------------');
    const randomproduit=faker.random.arrayElement(objects1);
    const appro= {
        type:faker.random.arrayElement(['entre', 'sortie']),       
        produit:randomproduit._id,
        quantity: faker.random.alphaNumeric(12),       
        createdAt:faker.date.recent(),
    };
    return appro;
}

module.exports = generateappro;