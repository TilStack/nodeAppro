const faker = require('faker');


function generaterapport(objects1,objects2) {
    console.log('------------------------')
    const randomstock=faker.random.arrayElement(objects1)
    const randomcommande=faker.random.arrayElement(objects2)
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const randomString = faker.random.alphaNumeric(6).toUpperCase()
    const uniqueNumber = `${year}${month}${day}-${randomString}`;
    const rapport= {
        number: uniqueNumber,
        stock: randomstock._id,
        commande:[randomcommande._id],
        createdAt:faker.date.recent(),
    }
    return rapport
}

module.exports = generaterapport