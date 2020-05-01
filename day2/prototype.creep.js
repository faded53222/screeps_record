var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolecarrier = require('role.carrier');
var roledefender = require('role.defender');
var rolepicker = require('role.picker');
var rolerepairer = require('role.repairer');
var role_lis=[roleharvester,roleupgrader,rolebuilder,rolecarrier,roledefender,rolepicker,rolerepairer];
Creep.prototype.runRole=function () {
    if(!this.memory.renewing){
        this.memory.renewing=0;
    }
    if(this.memory.renewing==0 && this.ticksToLive<=100){
        console.log(this.name,' renewing');
        this.memory.renewing=1;
    }
    if(this.memory.renewing==0){
        role_lis[this.memory.role].run(this);        
    }
    if(this.memory.renewing==1){
        this.renew();
    }

};
Creep.prototype.renew=function(){
    var sta=Game.spawns[this.memory.mother].renewCreep(this);
    var sta2=this.transfer(Game.spawns[this.memory.mother], RESOURCE_ENERGY);
    if(sta!=ERR_FULL && sta!=0){
        this.moveTo(Game.spawns[this.memory.mother]);
    }
    if(sta==ERR_FULL){
        this.memory.renewing=0;
    }
}