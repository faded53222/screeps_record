var roleharvester = require('role.harvester');
var roleupgrader = require('role.upgrader');
var rolebuilder = require('role.builder');
var rolecarrier = require('role.carrier');
var roledefender = require('role.defender');
var rolepicker = require('role.picker');
var rolerepairer = require('role.repairer');
var role_lis=[roleharvester,roleupgrader,rolebuilder,rolecarrier,roledefender,rolepicker,rolerepairer];
Creep.prototype.runRole=function () {
    if(this.hits<this.hitsMax && this.memory.lv<=2){
        this.suicide();
        console.log(this.name,' suicide');
        return;
    }
    if(!this.memory.renewing){
        this.memory.renewing=0;
    }
    if(!this.memory.recycling){
        this.memory.recycling=0;
    }
    if( this.ticksToLive<=200 && Game.spawns[this.memory.mother].memory.renew_lis.indexOf(this.name)==-1){
        Game.spawns[this.memory.mother].memory.renew_lis.push(this.name);
    }
    if(this.memory.recycling==1){
        this.Recycle();
    }
    else if(this.memory.renewing==1){
        this.renew();
    }
    else{
        role_lis[this.memory.role].run(this); 
    }

};
Creep.prototype.renew=function(){
    var sta=Game.spawns[this.memory.mother].renewCreep(this);
    var sta2=this.transfer(Game.spawns[this.memory.mother], RESOURCE_ENERGY);
    if(sta==0){
        Game.spawns[this.memory.mother].memory.renewing=1;
    }
    if(sta!=ERR_FULL && sta!=0){
        this.moveTo(Game.spawns[this.memory.mother]);
    }
    if(sta==ERR_FULL){
        Game.spawns[this.memory.mother].memory.renewing=0;
        this.memory.renewing=0;
        Game.spawns[this.memory.mother].memory.renew_lis.splice(0,1);
    }
}
Creep.prototype.Recycle=function(){
    this.memory.reborn=0;
    this.memory.recycling=1;
    var sta2=this.transfer(Game.spawns[this.memory.mother], RESOURCE_ENERGY);
    var sta=Game.spawns[this.memory.mother].recycleCreep(this);
    if(sta!=0){
        this.moveTo(Game.spawns[this.memory.mother]);
    }
}