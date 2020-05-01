var rolePicker = {
    run: function(creep) {
        if(creep.memory.picking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.picking = false;
	    }
	    if(!creep.memory.picking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.picking = true;
	    }
	    if(creep.memory.picking) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
        else {
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(target) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_STORAGE
                                 || s.structureType == STRUCTURE_EXTENSION)
                });
                if(creep.withdraw(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }                
            }
        }
    }
};
module.exports = rolePicker;