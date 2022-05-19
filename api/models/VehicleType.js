const Vehicle = require('./Vehicle');
class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }

    static get relationMappings() {
        return {
            Vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Vehicle.vehicleTypeId',
                    to: 'VehicleType.id'
                }
            }
        }
    }
}
module.exports = VehicleType;
