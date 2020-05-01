var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolecarrier = require('role.carrier');
var roledefender = require('role.defender');
var rolepicker = require('role.picker');
var role_lis=[roleharvester,roleupgrader,rolebuilder,rolecarrier,roledefender,rolepicker];
Creep.prototype.runRole=function () {
        role_lis[this.memory.role].run(this);
};