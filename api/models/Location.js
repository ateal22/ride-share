const Ride = require('./Ride');
class Location extends Model {
    static get tableName() {
        return 'Location';
    }

    static get relationMappings() {
        return {
            State: {
                relation: Model.BelongsToOneRelation,
                modelClass: State,
                join: {
                    from: 'State.abbreviation',
                    to: 'Location.State'
                }
            },
            Ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: 'Ride.fromLocationId',
                    to: 'Location.id'
                }
            },
            Ride: {
                relation: Model.BelongsToOneRelation,
                modelClass: Ride,
                join: {
                    from: 'Ride.toLocationId',
                    to: 'Location.id'
                }
            },
        }
    }
}

module.exports = Location;