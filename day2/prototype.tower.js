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
                    else{
                        var targets = this.room.find(FIND_STRUCTURES, {
                            filter: object => object.hits < object.hitsMax
                            && object.structureType==STRUCTURE_WALL
                        });  
                        targets.sort((a,b) =>(b.hitsMax-b.hits)-(a.hitsMax-a.hits));
                        if(targets.length > 0) {
                            this.repair(targets[0]);
                        }
                    }
                }  
            }
    };