'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_driver: DataTypes.INTEGER,
    id_passenger: DataTypes.INTEGER,
    createAt: DataTypes.DATE
    ,
    end: DataTypes.INTEGER
  }, {
      timestamps: false
    });


  Ride.associate = function (models) {
    // associations can be defined here
  };
  return Ride;
};