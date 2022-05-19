objection = require('objection');
const Model = objection.Model;
const { hash, compare } = require("bcrypt");

const SALT_ROUNDS = 10;

  
class User extends Model {
    static get tableName() {
        return 'User';
    }
    // Encrypt the password before storing it in the database.
  // SHOULD ALSO DO THIS ON UPDATE!

  // eslint-disable-next-line no-unused-vars
  async $beforeInsert(queryContext) {
    this.password = await hash(this.password, SALT_ROUNDS);
  }

  async verifyPassword(plainTextPassword) {
    console.log(`compare(${plainTextPassword}, ${this.password})`);
    return compare(plainTextPassword, this.password);
  }


    static get relationMappings() {
        return {
            
            Ride: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname+'./Ride',
                join: {
                    from: 'User.id',
                    through: {
                        from: 'Passenger.userId',
                        to: 'Passenger.rideId'
                    },
                    to: 'Ride.id'
                }

            },
            Driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname+'./Driver',
                join: {
                    from: 'User.id',
                    to: 'Driver.userId'
                }
            },
            State: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname+'./State',
                join: {
                    from: 'User.id',
                    through: {
                        from: 'Driver.userId',
                        to: 'Driver.licenseState'
                    },
                    to: 'State.abbreviation'
                }

            },
        }
    }
    
} 

module.exports = User;