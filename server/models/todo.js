//var bcrypt = require('bcrypt');
var mysql = require('mysql');
const Sequelize = require('sequelize');
var Q = require("q");
const sequelize = new Sequelize('nodetodo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
var findAll = function (callback) {
    var deferred = Q.defer();
    sequelize
        .query(
        'SELECT * FROM tasks',
        { raw: true, }
        )
        .then(success => {
            deferred.resolve(success);
            console.log("get single task success", success)
        }).catch(error => {
            deferred.reject(error);
            console.log("get single task error", error)
        })
    return deferred.promise;
}
var findOne = function (id) {
    var deferred = Q.defer();
    sequelize
        .query(
        "SELECT * FROM tasks WHERE id = '" + id + "'",
        { raw: true, }
        )
        .then(success => {
            deferred.resolve(success);
            console.log("get single task success", success)
        }).catch(error => {
            deferred.reject(error);
            console.log("get single task error", error)
        })
    return deferred.promise;
}
var addTask = function (data) {
    var deferred = Q.defer();
    sequelize
        .query(
        "INSERT INTO tasks (name, description,date,status) VALUES ('" + data.name + "','" + data.description + "','" + new Date() + "','" + data.status + "')",
        { raw: true }
        )
        .then(success => {
            deferred.resolve(success);
            console.log("add single task", success)
        }).catch(error => {
            deferred.reject(error);
            console.log("add single task error", error)
        })
    return deferred.promise;

}
var updateTask = function (data) {
    var deferred = Q.defer();
    sequelize
        .query(
        "UPDATE tasks SET name = '" + data.name + "', description = '" + data.description + "',date = '" + data.date + "',status = '" + data.status + "'  WHERE id = '" + data.id + "'",
        { raw: true }
        )
        .then(success => {
            deferred.resolve(success);
            console.log("update single task", success)
        }).catch(error => {
            deferred.reject(error);
            console.log("update single task error", error)
        })
    return deferred.promise;
}
var deleteTask = function (id) {
    var deferred = Q.defer();
    sequelize
        .query(
        "DELETE FROM tasks WHERE id = '" + id + "'",
        { raw: true }
        )
        .then(success => {
            deferred.resolve(success);
            console.log("delete single task", success)
        }).catch(error => {
            deferred.reject(error);
            console.log("delete single task error", error)
        })
    return deferred.promise;
}
module.exports = {
    findAll: findAll,
    findOne: findOne,
    addTask: addTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}