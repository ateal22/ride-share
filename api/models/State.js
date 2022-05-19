const User = require('./User');
class State extends Model {
    static get tableName() {
        return 'State';
    }

    static get relationMappings() {
        return {
            User: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'State.abbreviation',
                    through: {
                        from: 'Driver.licenseState',
                        to: 'Driver.userId'
                    },
                    to: 'User.id'
                }
            },
            Vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vehicle,
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            },
            Driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: Driver,
                join: {
                    from: 'Driver.licenseState',
                    to: 'State.abbreviation'
                }
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: Location,
                join: {
                    from: 'Location.State',
                    to: 'State.abbreviation'
                }
            },
    
        }

    }
}




