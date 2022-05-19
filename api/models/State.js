const User = require('./User');
const Location = require('./Location');
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
                modelClass: __dirname+'./Vehicle',
                join: {
                    from: 'Vehicle.licenseState',
                    to: 'State.abbreviation'
                }
            },
            Driver: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname+'./Driver',
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
module.exports = State;



