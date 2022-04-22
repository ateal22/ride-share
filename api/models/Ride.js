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
                modelClass: User,
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Drivers.rideId',
                        to: 'Drivers.driverId'
                    },
                    to: 'Driver.id'
                }
            },
            Drivers: {
                relation: Model.BelongsToOneRelation,
                modelClass: Drivers,
                join: {
                    from: 'Drivers.driverId',
                    to: 'Ride.id'
                }
            },
            Passenger: {
                relation: Model.BelongsToOneRelation,
                modelClass: Passenger,
                join: {
                    from: 'Passenger.rideId',
                    to: 'Ride.id'
                }
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationId'
                }
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Location.id',
                    to: 'Ride.toLocationId'
                }
            },
        }
    }
}