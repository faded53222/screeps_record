var roleCarrier = {
    run: function(creep) {
      if(creep.room.name!=Game.spawns[creep.memory.mother].room.name){
            const targets0 = creep.room.find(FIND_HOSTILE_CREEPS);
            for(let eh of targets0){
                if(eh.owner.username=='Invader'){
                    if(Game.spawns[creep.memory.mother].room.memory.danger_run==0){
                       Game.spawns[creep.memory.mother].room.memory.run_time=Game.time;
                        Game.spawns[creep.memory.mother].room.memory.danger_run=1;
                    }
                    creep.renew();
                    return;
                }
            }
        }
        if(!creep.memory.target_room){
            creep.memory.target_room=-1;
        }
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
	    }
	    if(!creep.memory.carrying && creep.store.getFreeCapacity() <= 10) {
	        creep.memory.carrying = true;
	    }
	    if(creep.memory.carrying) {
	        var LAB0=0;
	        if(creep.memory.target_room!=-1){
                if (creep.room.name!=Game.spawns[creep.memory.mother].room.name) {
                    LAB0=1;
                    var exit = creep.room.findExitTo(Game.spawns[creep.memory.mother].room.name);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }         
	        }
	        if(LAB0==0){
	            if(creep.memory.target_room!=-1){
    	            for(const resourceType in creep.carry) {
                        creep.transfer(creep.room.storage, resourceType);
                    }
                     if(creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    } 
	            }
	            else{
        	        if(Game.spawns[creep.memory.mother].memory.urgent_produce==1){
                        var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                         || s.structureType == STRUCTURE_EXTENSION)
                                         && s.energy < s.energyCapacity
                        });	            
                        if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
        	        }
        	        else{
        	            var lab1=0;
        	            var target;
                        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER && s.room.name==creep.room.name);
                        for (let tower of towers) {
                            if(tower.store[RESOURCE_ENERGY]<500){
                                target=tower;
                                lab1=1;
                                break;
                            }
                        }
                        if(lab1==0 || Game.spawns[creep.memory.mother].memory.spawnList.length>=9){
                            target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                         || s.structureType == STRUCTURE_EXTENSION)
                                         && s.energy < s.energyCapacity
                            });                    
                           if(target!=null){
                             if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                 creep.moveTo(target);
                            }                    
                        }
                        else{
            	            for(const resourceType in creep.carry) {
                                creep.transfer(creep.room.storage, resourceType);
                            }
                             if(creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.room.storage);
                            } 	
                            }
        	            }
        	            else{//transfer to tower
                            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                 creep.moveTo(target);
                            }
        	            }
	                }
    	        }
    	    }	            
	    }

        else {
	        var LAB1=0;
	        if(creep.memory.target_room!=-1){
                var defenders = _.filter(Game.creeps, s => s.memory.role == 4);
                var counti=0;
                for(let each of defenders){
                    //each.memory.target_room==creep.memory.target_room && 
                    if(!each.spawning){
                        counti+=1;
                    }
                }
                if (creep.room.name!=creep.memory.target_room && counti>=2 &&  Game.spawns[creep.memory.mother].room.memory.danger_run!=1) {
                    LAB1=1;
                    var exit = creep.room.findExitTo(creep.memory.target_room);
                    creep.moveTo(creep.pos.findClosestByRange(exit));
                }
	        }
	        if(LAB1==0){
	            if(creep.memory.target_room!=-1 && Game.time-Game.spawns[creep.memory.mother].room.memory.run_time>=1400 && Game.spawns[creep.memory.mother].room.memory.danger_run==1){
	                
	                creep.moveTo(30,15);
	            }
	            else{
                    var things=creep.room.lookAt(creep.memory.site1[0],creep.memory.site1[1]);
                    var target=-1;
                    for(let thing of things){
                        if(thing['type']=='structure' && (thing['structure'].structureType=='container'||thing['structure'].structureType=='link') ){
                            target=thing['structure'];
                            break;
                        }
                    }
                    var labjj=0;
                    if(target!=-1){
                        if(target.store[RESOURCE_ENERGY]>250){
                            labjj=1;
                            if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);
                            }                
                        }                    
                    }
                    if(labjj==0){
                        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                        if(target!=null && target.energy>=200 && target.room.name==creep.room.name) {
                            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }
                        else{
                            if(Game.spawns[creep.memory.mother].memory.lv>=3 && creep.room.storage){
                                var target =creep.room.storage;              
                                if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(target);
                                } 
                            }                                      
                        }	                
	                }
                }
            }
        }
    }
};
module.exports = roleCarrier;