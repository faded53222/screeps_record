var roleHarvester = {
    run: function(creep) {
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
	    }
	    if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = false;
	    }
	    if(creep.memory.harvesting) {
            var things=creep.room.lookAt(creep.memory.site1[0],creep.memory.site1[1]);
            var target;
            for(let thing of things){
                if(thing['type']=='source'){
                    target=thing['source'];
                    break;
                }
            }
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);
            }
        }
        else{
            var things=creep.room.lookAt(creep.memory.site2[0],creep.memory.site2[1]);
            var target=0;
            var lab=0;
            for(let thing of things){
                if(thing['type']=='constructionSite'){
                    target=Game.spawns[creep.memory.mother];
                    break;
                }
                if(thing['type']=='structure'){
                    target=thing['structure'];
                    if(Game.spawns[creep.memory.mother].memory.sources_carry[[creep.memory.site1[0],creep.memory.site1[1]]]==0){
                        for(var j=0;j<Game.spawns[creep.memory.mother].memory.sources[[creep.memory.site1[0],creep.memory.site1[1]]];j++){
                            Game.spawns[creep.memory.mother].addUrgentTask([3,creep.memory.lv,creep.memory.site1,creep.memory.site2]);
                            Game.spawns[creep.memory.mother].memory.sources_carry[[creep.memory.site1[0],creep.memory.site1[1]]]+=1;
                        }
                            
                        }
                    break;
                }
            }
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } 
        }
    }
};

module.exports = roleHarvester;