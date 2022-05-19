// Knex
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "pg.cse.taylor.edu", // PostgreSQL server
    user: "allison_teal", // Your user name
    password: "tacipeme", // Your password
    database: "allison_teal", // Your database name
  },
  searchPath: ["ride-share"],
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const User = require("./models/User");

// Hapi
const Joi = require("@hapi/joi"); // Input validation
const Hapi = require("@hapi/hapi"); // Server

const server = Hapi.server({
host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "POST",
      path: "/users",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            //phone: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingUser = await User.query()
          .where("email", request.payload.email)
          .first();
        if (existingUser) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newUser = await User.query().insert({
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
          //phone: request.payload.phone,
        });

        if (newUser) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "GET",
      path: "/users",
      config: {
        description: "Retrieve all users",
      },
      handler: (request, h) => {
        return User.query();
      },
    },

    {
      method: "DELETE",
      path: "/users/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },

    {
      method: "POST",
      path: "/sign-in",
      config: {
        description: "Log in",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const user = await User.query()
          .where("email", request.payload.email)
          .first();
        if (
          user //&&
          //(await User.verifyPassword(request.payload.password))
        ) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: User.id,
              firstName: User.first_name,
              lastName: User.last_name,
              email: User.email,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },
    {
      method: "GET",
      path: "/map",
      config: {
        description: "map",
      },
      handler: (request, h) => {
        return User.query();
      },
    },
    
  {
    method: "GET",
    path: "/rides",
    config: {
      description: "Get all rides",
    },
    handler: (request, h) => {
      return Ride.query();
    },
  },

  /*{
    method: "POST",
    path: "/driver",
    config: {
      description: "Driver sign up form",
      validate: {
        payload: Joi.object({
          
        })
      }
    }
  }
*/

]);

  // Start the server.
  await server.start();
}

// Go!
init();
