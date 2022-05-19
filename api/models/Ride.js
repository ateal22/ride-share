objection = require('objection');
const Model = objection.Model;
const User = require('./User');

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }

    static get relationMappings() {
        

        return {
            User: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Passenger.rideId',
                        to: 'Passenger.userId'
                    },
                    to: 'User.id'
                }
            },
            Driver: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname+'./Driver',
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Drivers.rideId',
                        to: 'Drivers.driverId'
                    },
                    to: 'Driver.id'
                }
            },
            
            
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname+'./Location',
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationId'
                }
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname+'./Location',
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationId'
                }
            },
        }
    }
}

module.exports = Ride;