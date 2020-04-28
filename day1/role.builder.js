var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.lv==1){
    	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
    	    }
    	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.building = true;
    	    }
    	    if(creep.memory.building) {
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
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
    	        var target=Game.spawns[creep.memory.mother];
                if(target.memory.urgent_produce==1){
                                    
                }
                else{
                    if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }                    
                }

    	    }
    	}
    }
};
module.exports = roleBuilder;