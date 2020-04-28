var roleCarrier = {
    run: function(creep) {
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
	    }
	    if(!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.carrying = true;
	    }
	    if(creep.memory.carrying) {
            target=Game.spawns[creep.memory.mother];
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
	    }
        else {
            var things=creep.room.lookAt(creep.memory.site2[0],creep.memory.site2[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='structure'){
                    target=thing['structure'];
                    break;
                }
            }
            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.site2[0],creep.memory.site2[1]);
            }            
        }
        }

};

module.exports = roleCarrier;