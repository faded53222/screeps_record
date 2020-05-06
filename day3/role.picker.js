var rolePicker = {
    run: function(creep) {
        if(creep.memory.picking && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.picking = false;
	    }
	    if(!creep.memory.picking && creep.store.getFreeCapacity() == 0) {
	        creep.memory.picking = true;
	    }
	    if(creep.memory.picking) {
	        var target;
	        if(Game.spawns[creep.memory.mother].memory.urgent_produce==1 || Game.spawns[creep.memory.mother].memory.renewing==1){
                target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION)
                             && s.energy < s.energyCapacity
                });                    
	        }
	        else{
                var lab1=0;
                var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
                for (let tower of towers) {
                    if(tower.store[RESOURCE_ENERGY]<500){
                        target=tower;
                        lab1=1;
                        break;
                    }
                }
                if(lab1==0){
                    target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN
                                 || s.structureType == STRUCTURE_EXTENSION)
                                 && s.energy < s.energyCapacity
                    });                     
                }
	        }
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
	    else{
	        var labi=0;
	        if(creep.memory.pick_site[0]==-1){
	            labi=1;
	        }
	        else{
	           var target;
               var things=creep.room.lookAt(creep.memory.pick_site[0],creep.memory.pick_site[1]);	           
               var lab2=0;
               for(var tem=0;tem<things.length;tem++){
                    if(things[tem]['type']=='resource'){
                        lab2=1;
                        target=things[tem]['resource'];
                        if(target.energy<10){
                            labi=1;
                        }
                        break;
                    }
               }
               if(lab2==0){
                   labi=1;
               }
               if(labi==0){
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }                   
               }
	        }
	        if(labi==1){
                var targets = creep.room.find(FIND_DROPPED_RESOURCES);
	            targets.sort((a,b) =>b.energy - a.energy);
	            if(targets.length > 0) {
	                creep.memory.pick_site=[targets[0].pos.x,targets[0].pos.y];
                if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    }
	            }
	            else{
	                creep.memory.picking=true;
	            }
    	   }
        }
    }
};
module.exports = rolePicker;