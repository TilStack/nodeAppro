const faker = require('faker');

function generateproduit() {
    console.log('------------------------');
    const produit= {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),       
        prixAchat: faker.finance.amount(20000,100000,2),
        prixVente: faker.finance.amount(20000,100000,2),
        statut:faker.datatype.boolean(),
        createdAt:faker.date.recent(),
    };
    return produit;
}

module.exports = generateproduit;