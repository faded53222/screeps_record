var biuld_priority_lis=[STRUCTURE_SPAWN,STRUCTURE_WALL,STRUCTURE_RAMPART,STRUCTURE_LINK,STRUCTURE_EXTENSION,STRUCTURE_ROAD,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_STORAGE];
var roleBuilder = {
    run: function(creep) {
        var LAB=0;
        if(!creep.memory.target_room){
            creep.memory.target_room=-1;
        }
        if(!creep.memory.remote_work){
            creep.memory.remote_work=0;
        }
        if(creep.memory.target_room!=-1){
            if (creep.room.name!=creep.memory.target_room) {
                LAB=1;
                creep.memory.remote_work=1;
                creep.memory.unrenew=1;
                creep.memory.reborn=0;
                var exit = creep.room.findExitTo(creep.memory.target_room);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }            
        }
        if(LAB==0){
    	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
    	    }
    	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.building = true;
    	    }
    	    if(creep.memory.building) {
    	        var labo=0;
    	        if(creep.memory.remote_work==1){
                    var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                     || s.structureType == STRUCTURE_EXTENSION)
                                     && s.energy < s.energyCapacity
                    });	            
                    if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        labo=1;
                    }
    	        }
    	        if(labo==0){
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
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);
                        }
                    }
    	        }

                } 
    	    else {
    	        if(creep.memory.remote_work==0){
                    if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1
                    ||(Game.spawns[creep.memory.mother].memory.lv>=3 && creep.room.storage) ){
                        var target =creep.room.storage;              
                        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        } 
                    }
                    else{
                        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                         || s.structureType == STRUCTURE_EXTENSION)
                                         && s.energy > 10
                        });
                        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
    	       }
                else{
            	    if(creep.store.getFreeCapacity() > 0) {
                        var targets = creep.room.find(FIND_DROPPED_RESOURCES);
        	            targets.sort((a,b) =>b.energy - a.energy);
        	            if(targets.length > 0) {
        	                creep.memory.pick_site=[targets[0].pos.x,targets[0].pos.y];
                        if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                            }
        	            }
        	            else{
                            var sources = creep.room.find(FIND_SOURCES);
                            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(sources[0]);
                            }
        	            }
                    }
                }
        
    	    }
	    }
    }
};
module.exports = roleBuilder;