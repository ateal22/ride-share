class User extends Model {
    static get tableName() {
        return 'User';
    }
    static get relationMappings() {
        return {
            Passenger: {
                relation: Model.BelongsToOneRelation,
                modelClass: Passenger,
                join: {
                    from: 'User.id',
                    to: 'Passenger.userId'
                }
            },
            Ride: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
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
                modelClass: Driver,
                join: {
                    from: 'User.id',
                    to: 'Driver.userId'
                }
            },
            State: {
                relation: Model.ManyToManyRelation,
                modelClass: State,
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