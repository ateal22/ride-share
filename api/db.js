/*
db.js
Ride Share ORM
April 21, 2022
*/

const knex = require('knex') ({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'allison_teal',
        password: 'tacipeme',
        database: 'allison_teal',
    }
})

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);






