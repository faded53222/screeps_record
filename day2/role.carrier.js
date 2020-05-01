var roleCarrier = {
    run: function(creep) {
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
	    }
	    if(!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.carrying = true;
	    }
	    if(creep.memory.carrying) {
	        var target;
	        if(Game.spawns[creep.memory.mother].memory.urgent_produce==1){
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION
                                 || s.structureType == STRUCTURE_TOWER)
                                 && s.energy < s.energyCapacity
                });	            
	        }
	        else{
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION)
                                 && s.energy < s.energyCapacity
                });
	        }
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
	    }
        else {
            var things=creep.room.lookAt(creep.memory.site1[0],creep.memory.site1[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='structure' && thing['structure'].structureType=='container'){
                    target=thing['structure'];
                    break;
                }
            }
            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);
            }
        }
    }
};
module.exports = roleCarrier;