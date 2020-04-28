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
        mod_lis[spawn.memory.mod].run(spawn);
    }
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            var deadcreep=Memory.creeps[name];
            if(deadcreep.role==0){
                console.log( Game.spawns[deadcreep.mother].memory.sources_work);
                Game.spawns[deadcreep.mother].memory.sources_work[[deadcreep.site1[0],deadcreep.site1[1]]]-=1;
                Game.spawns[deadcreep.mother].addUrgentTask([deadcreep.role,deadcreep.lv,deadcreep.site1,deadcreep.site2]);
            }
            if(deadcreep.role==2){
                Game.spawns[deadcreep.mother].addTask([deadcreep.role,deadcreep.lv]);
            }
            if(deadcreep.role==3){
                Game.spawns[deadcreep.mother].memory.sources_carry[[deadcreep.site1[0],deadcreep.site1[1]]]-=1;
            }

            delete Memory.creeps[name];
        }
        else{
            var creep = Game.creeps[name];
            role_lis[creep.memory.role].run(creep);
        }
    }
}
