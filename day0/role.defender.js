var roleHarvester = {
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var things=creep.room.lookAt(creep.memory.site[0],creep.memory.site[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='source'){
                    target=thing['source'];
                    break;
                }
            }
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.site[0],creep.memory.site[1]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
	}
};

module.exports = roleHarvester;