var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolecarrier = require('role.carrier');
var roledefender = require('role.defender');
var moddevelop = require('mod.develop');
var init = require('init');

var role_lis=[roleharvester,roleupgrader,rolebuilder,rolecarrier,roledefender];
var mod_lis=[moddevelop];
init.run();
module.exports.loop = function () {
    for(var name in Game.spawns){
        var spawn = Game.spawns[name];
        console.log(spawn.memory.spawnList);
        mod_lis[spawn.memory.mod].run(spawn);
    }
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            var deadcreep=Memory.creeps[name];
            Game.spawns[deadcreep.mother].addTask([deadcreep.role,deadcreep.lv,deadcreep.site]);
            delete Memory.creeps[name];
        }
        else{
            var creep = Game.creeps[name];
            role_lis[creep.memory.role].run(creep);
        }
    }
}
