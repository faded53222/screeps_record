StructureTower.prototype.runtower =
    function () {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            this.attack(target);
        }
        else {
            const target = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            if(target) {
                    this.heal(target);
                }
                else{
                    var targets = this.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                        && object.structureType!=STRUCTURE_WALL
                        && object.structureType!=STRUCTURE_RAMPART
                    });
                    targets.sort((a,b) =>(b.hitsMax-b.hits)-(a.hitsMax-a.hits));
                    if(targets.length > 0) {
                        this.repair(targets[0]);
                    }
                    else if(this.room.energyAvailable==this.room.energyCapacityAvailable){
                        var labi=0;
                        for(var name in Game.spawns){
                            if(Game.spawns[name].memory.urgent_produce==1 || Game.spawns[name].memory.renewing==1){
                                labi=1;
                                break;
                            }
                        }
                        if(labi==0 && this.store[RESOURCE_ENERGY]>=499){
                            var targets = this.room.find(FIND_STRUCTURES, {
                                filter: object => object.hits < object.hitsMax
                                && (object.structureType==STRUCTURE_WALL
                                || object.structureType==STRUCTURE_RAMPART)
                            });  
                            targets.sort((a,b) =>(a.hits)-(b.hits));
                            if(targets.length > 0 && this.room.storage.store[RESOURCE_ENERGY]>50000) {
                                this.repair(targets[0]);
                            }                            
                        }

                    }
                } 
            }
    };