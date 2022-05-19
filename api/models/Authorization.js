const Driver = require('./Driver');
const Vehicle = require('./Vehicle');
class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }

    static get relationMappings() {
        return {
            Driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Driver,
                join: {
                    from: 'Authorization.driverId',
                    to: 'Driver.id'
                }
            },
            Vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Vehicle.id',
                    to: 'Authorization.vehicleId'
                }
            }
        }
    }
}
module.exports = Authorization;