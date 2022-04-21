create table "ride-share"."user"
(
    id          serial      not null
        constraint user_pk
            primary key,
    "firstName" varchar(40) not null,
    "lastName"  varchar(40) not null,
    email       varchar(80) not null,
    password    varchar(40) not null,
    phone       varchar(16),
    "isAdmin"   boolean default false
);

create table "ride-share"."vehicleType"
(
    id   serial not null
        constraint vehicletype_pk
            primary key,
    type varchar(40)
);

create table "ride-share".state
(
    abbreviation char(2) not null
        constraint state_pk
            primary key,
    name         varchar(40)
);

create table "ride-share".driver
(
    id              serial not null
        constraint id
            primary key,
    "userId"        integer
        constraint driver_user_id_fk
            references "ride-share"."user",
    "licenseNumber" varchar(40),
    "licenseState"  char(2)
        constraint driver___fk2
            references "ride-share".state
);

create table "ride-share".vehicle
(
    id              serial      not null
        constraint vehicle_pk
            primary key,
    make            varchar(40) not null,
    model           varchar(40) not null,
    color           varchar(40) not null,
    "vehicleTypeId" integer
        constraint vehicle___fk1
            references "ride-share"."vehicleType",
    capacity        integer,
    mpg             double precision,
    "licenseState"  char(2)
        constraint vehicle___fk2
            references "ride-share".state,
    "licensePlate"  varchar(40)
);

create table "ride-share"."authorization"
(
    "driverId"  integer not null
        constraint authorization___fk1
            references "ride-share".driver,
    "vehicleId" integer not null
        constraint authorization___fk2
            references "ride-share".vehicle,
    constraint authorization_pk
        primary key ("driverId", "vehicleId")
);

create table "ride-share".location
(
    id        serial not null
        constraint location_pk
            primary key,
    name      varchar(40),
    address   varchar(40),
    city      varchar(40),
    state     varchar(40)
        constraint location__fk
            references "ride-share".state,
    "zipCode" varchar(40)
);

create table "ride-share".ride
(
    id               serial not null
        constraint rides_pk
            primary key,
    date             date,
    time             time,
    distance         double precision,
    "fuelPrice"      double precision,
    fee              double precision,
    "vehicleId"      integer
        constraint ride___fk1
            references "ride-share".vehicle,
    "fromLocationId" integer
        constraint ride___fk2
            references "ride-share".location,
    "toLocationId"   integer
        constraint ride___fk3
            references "ride-share".location
);

create table "ride-share".passenger
(
    "userId" integer not null
        constraint passenger___fk1
            references "ride-share"."user",
    "rideId" integer not null
        constraint passenger___fk2
            references "ride-share".ride,
    constraint passenger_pk
        primary key ("rideId", "userId")
);

comment on table "ride-share".passenger is 'Associative table between user and ride';

create table "ride-share".drivers
(
    "driverId" integer
        constraint drivers___fk1
            references "ride-share".driver,
    "rideId"   integer
        constraint drivers___fk2
            references "ride-share".ride,
    constraint drivers_pk
        unique ("driverId", "rideId")
);


