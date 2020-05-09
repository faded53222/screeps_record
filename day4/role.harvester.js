var biuld_priority_lis=[STRUCTURE_SPAWN,STRUCTURE_WALL,STRUCTURE_RAMPART,STRUCTURE_LINK,STRUCTURE_EXTENSION,STRUCTURE_ROAD,STRUCTURE_TOWER,STRUCTURE_CONTAINER,STRUCTURE_STORAGE];
var roleHarvester = {
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
        var LAB=0;
        if(!creep.memory.target_room){
            creep.memory.target_room=-1;
        }
        if(!creep.memory.remote_work){
            creep.memory.remote_work=0;
        }
        if(creep.memory.target_room!=-1){
            var defenders = _.filter(Game.creeps, s => s.memory.role == 4);
            var counti=0;
            for(let each of defenders){
                if(!each.spawning){
                    counti+=1;
                }
            }
            if (creep.room.name!=creep.memory.target_room && Game.spawns[creep.memory.mother].room.memory.danger_run!=1 && counti>=2) {
                LAB=1;
                creep.memory.remote_work=1;
                var exit = creep.room.findExitTo(creep.memory.target_room);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }            
        }
        if(LAB==0 && creep.room.name!=creep.memory.target_room && creep.memory.target_room!=-1){
            creep.moveTo(30,15);
            return;
        }
        if(LAB==0){
            if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.harvesting = true;
    	    }
    	    if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0 && creep.store[RESOURCE_ENERGY]!=0 && creep.memory.site3[0]!=-1) {
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
                if(creep.memory.site2[0]!=-1 && !(creep.pos.x==creep.memory.site2[0]&&creep.pos.y==creep.memory.site2[1])){
                    creep.moveTo(creep.memory.site2[0],creep.memory.site2[1]);
                }
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    if(creep.memory.site2[0]==-1){
                        creep.moveTo(creep.memory.site1[0],creep.memory.site1[1]);                    
                    }
                }
            }
            else{
                var LAB2=0;
                if(creep.memory.remote_work==1){
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax*0.8
                    });
                    if(targets.length>0){
                        LAB2=1;
  	                   targets.sort((a,b) =>a.hits - b.hits);
  	                   var s=creep.repair(targets[0])
                       if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                      }                         
                    }
                    else{
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
                            LAB2=1;
                            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            }
                        }                        
                    }
                }
                if(LAB2==0){
                    if(creep.memory.site3[0]!=-1){
                        var target;
                        var things=creep.room.lookAt(creep.memory.site3[0],creep.memory.site3[1]);
                        for(var tem=0;tem<things.length;tem++){
                            if(things[tem]['type']=='structure'&& (things[tem]['structure'].structureType==STRUCTURE_LINK||things[tem]['structure'].structureType==STRUCTURE_CONTAINER)){
                                target=things[tem]['structure'];
                                break;
                            }
                        }
                        if(target.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                            var targets = creep.room.find(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                }
                            });
                            if(targets.length > 0) {
                                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(targets[0]);
                                }
                            }                
                        }   
                        else if(creep.transfer(target,RESOURCE_ENERGY)==ERR_NOT_IN_RANGE){
                            creep.moveTo(target);
                        }                        
                    }
                    else if(creep.room.memory.emegency==1){
                        var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER)
                                && structure.energy < structure.energyCapacity
                            }
                        });
                        if(targets.length > 0) {
                            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(targets[0]);
                            }
                        }                
                    }   
                }
            }
        }
    }
};

module.exports = roleHarvester;