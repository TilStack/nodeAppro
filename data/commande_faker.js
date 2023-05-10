const faker = require('faker');

function generatecommande(objects1,objects2) {
    const quantity=['1','2','3','4','5','6','7','8','9','10']
    console.log('------------------------');
    const randomfournisseur=faker.random.arrayElement(objects1)
    const randomproduit=faker.random.arrayElement(objects2)
    const commande= {
        dateCommande: faker.date.past(),
        dateLivraison: faker.date.future(),             
        fournisseurId: randomfournisseur._id,
        produit:randomproduit._id,
        quantity: faker.random.arrayElement(quantity),
        prixUnitaire: faker.finance.amount(20000,100000,2),
        montant: faker.finance.amount(30000,100000,1.5),
        createdAt:faker.date.recent(),
    }
    return commande
}

module.exports = generatecommande;