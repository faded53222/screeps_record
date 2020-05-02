var biuld_priority_lis=[STRUCTURE_EXTENSION,STRUCTURE_ROAD,STRUCTURE_TOWER,STRUCTURE_CONTAINER];
var roleBuilder = {
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	    }
	    if(creep.memory.building) {
            var target;
            for(let pr of biuld_priority_lis){
                 target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                    filter: (s) => (s.structureType == pr)
                });
                if(target!=null){
                    break;
                }
            }
            if(target!=null) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
                if(creep.room.controller) {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            } 
	    }
	    else {
            if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1){
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });                    
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });
                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } 
            }
 
	    }
    }
};
module.exports = roleBuilder;