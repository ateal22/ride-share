
class Drivers extends Model {
    static get tableName() {
        return 'Drivers';
    }

    static get relationMappings() {
        return {
            Ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: 'Ride.id',
                    to: 'Drivers.rideId'
                }
            },
            Driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Driver,
                join: {
                    from: 'Ride.id',
                    to: 'Drivers.rideId'
                }
            }
        }
    }
}
