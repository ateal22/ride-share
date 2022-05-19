const User = require('./User');
const Ride = require('./Ride');
class Driver extends Model {
    static get tableName() {
        return 'Driver';
    }

    static get relationMappings() {
        return {
            User: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'Driver.userId',
                    to: 'User.id'
                }
            },
            Ride: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
                join: {
                    from: 'Driver.id',
                    through: {
                        from: 'Drivers.rideId',
                        to: 'Drivers.driverId'
                    },
                    to: 'Ride.id'
                }
            },
            Authorization: {
                relation: Model.BelongsToOneRelation,
                modelClass: Authorization,
                join: {
                    from: 'Driver.id',
                    to: 'Authorization.driverId'
                }
            },
            Vehicle: {
                relation: Model.ManyToManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Vehicle.id',
                    through: {
                        from: 'Authorization.vehicleId',
                        to: 'Authorization.driverId'
                    },
                    to: 'Driver.id'
                }
            },
            State: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            }
        }
    }
}

