const State = require('./State');
const Driver = require('./Driver');
class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }

    static get relationMappings() {
        return {
            Driver: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'Vehicle.id',
                    through: {
                        from: 'Authorization.vehicleId',
                        to: 'Authorization.driverId'
                    },
                    to: 'Driver.id'
                }
            },
            Authorization: {
                relation: Model.BelongsToOneRelation,
                modelClass: ___dirname+'./Authorization',
                join: {
                    from: 'Authorization.vehicleId',
                    to: 'Vehicle.id'
                }
            },
            State: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'State.abbreviation',
                    to: 'Vehicle.licenseState'
                }
            },
            VehicleType: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname+'./VehicleType',
                join: {
                    from: 'VehicleType.id',
                    to: 'Vehicle.vehicleTypeId'
                }
            }
        }
    }
}
module.exports = Vehicle;


