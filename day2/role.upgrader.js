var roleUpgrader = {
    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	    }
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var target;
            if(Game.spawns[creep.memory.mother].memory.urgent_produce==1){
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });                    
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_CONTAINER)
                                 && s.energy > 0
                });
            }
            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }  
        }
	}
};

module.exports = roleUpgrader;