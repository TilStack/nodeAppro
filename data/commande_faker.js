const faker = require('faker');

function generatecommande(objects1,objects2) {
    console.log('------------------------');
    const randomfournisseur=faker.random.arrayElement(objects1);
    const randomproduit=faker.random.arrayElement(objects2);
    const commande= {
        dateCommande: faker.date.past(),
        dateLivraison: faker.date.future(),             
        fournisseurId: randomfournisseur._id,
        produit:randomproduit._id,
        quantity: faker.random.alphaNumeric(12),
        prixUnitaire: faker.finance.amount(20000,100000,2),
        montant: faker.finance.amount(30000,100000,1.5),
        createdAt:faker.date.recent(),
    };
    return commande;
}

module.exports = generatecommande;