const faker = require('faker')

function generateUser(pass) {
    console.log('------------------------')
    const user= {
        name: faker.name.lastName(),
        password: pass,
        email: faker.internet.email(), 
        role:"other",      
        createdAt:faker.date.recent(),
    }
    return user
}

module.exports = generateUser