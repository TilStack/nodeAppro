const faker = require('faker');


function generaterapport(objects1,objects2) {
    console.log('------------------------')
    const randomstock=faker.random.arrayElement(objects1)
    console.log('------------------------')
    const randomcommande=faker.random.arrayElement(objects2)
    const rapport= {
        stock: randomstock._id,
        commande:[randomcommande._id],
        quantity:"0",
        createdAt:faker.date.recent(),
    }
    return rapport
}

module.exports = generaterapport