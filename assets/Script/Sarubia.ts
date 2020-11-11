// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Sarubia extends cc.Component {
    @property({type: cc.AudioClip})
    Sarubia_shoot: cc.AudioClip = null

    @property({type: cc.AudioClip})
    Sarubia_reload: cc.AudioClip = null

    @property({type: cc.AudioClip})
    Sarubia_hit: cc.AudioClip = null

    @property({type: cc.AudioClip})
    Sarubia_explode: cc.AudioClip = null

    @property(cc.Node)
    player:cc.Node =null;

    @property(cc.Prefab)
    private projectilePrefab: cc.Prefab = null;

    private state:string='idle';
    private anim: cc.Animation = null;
    private animateState = null;
    private speed:number=0;
    private life:number=42;
    private isdead:boolean=false;
    //private cooldown:boolean=false;
    //private flag: boolean = true;
    private gateflag:boolean=true;
    cam: cc.Node = null;
    

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;
        this.cam = cc.find("Canvas/Main Camera");
    }

    update (dt) {
        //cc.log(this.state);
        this.updatestate();
        this.movement(dt);
        this.animation();
    }

    updatestate(){
        if(this.life<=0){
            this.isdead=true;
            if(this.gateflag){this.cam.getComponent('Camera_Control').gate1 = true ;this.gateflag=false;}
        }
        if(this.state=='idle'){
            if(Math.abs(this.node.x-this.player.x)<=340){
                this.state='move';
                this.scheduleOnce(()=>{
                    this.state='shoot';
                },1);
            }
        }
    }

    private createProjectile() {
        let projectile = cc.instantiate(this.projectilePrefab);
        projectile.getComponent('Projectile').init(this.node);
    }

    movement(dt){
        if(this.isdead){
            this.speed=0;
            this.node.scaleX = -1;
        }
        else if(this.state=='move'){
            this.speed=-100;
        }else{
            this.speed=0;
        }
        this.node.scaleX=1;
        this.node.x += this.speed * this.node.scaleX *dt;
    }

    animation(){
        //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).size);
        if(this.isdead){
            if(this.animateState == null || this.animateState.name != 'explode'){
                this.animateState=this.anim.play('explode');
                cc.audioEngine.playEffect(this.Sarubia_explode, false);
                
                /*this.animateState.on('finished',()=>{
                    this.node.y-=35;
                    this.node.getComponent(cc.PhysicsBoxCollider).size=cc.size(0,0);
                    //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).size);
                    //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).offset);
                })*/
            }
        }else if(this.state=='move'){
            if(this.animateState == null || this.animateState.name != 'move'){
                this.animateState=this.anim.play('move');
            }
        }else if(this.state=='shoot'){
            if(this.animateState == null || this.animateState.name != 'shoot'){
                this.createProjectile();
                this.animateState=this.anim.play('shoot');
                cc.audioEngine.playEffect(this.Sarubia_shoot, false);
                this.animateState.on('finished',()=>this.state='cooldown');
            }
        }else if(this.state=='cooldown'){
            if(this.animateState == null || this.animateState.name != 'idle'){
                this.animateState=this.anim.play('idle');
                this.scheduleOnce(()=>this.state='reload',2.5);
            }
        }else if(this.state=='reload'){
            if(this.animateState == null || this.animateState.name != 'reload'){
                this.animateState=this.anim.play('reload');
                cc.audioEngine.playEffect(this.Sarubia_reload, false);
                this.animateState.on('finished',()=>this.state='shoot');
            }
        }
    }

    onBeginContact(contact, self, other){
        if(other.node.name=='bullet' || other.node.name=='MachinegunBullet' && this.isdead == false){
            this.life-=1;
            cc.audioEngine.playEffect(this.Sarubia_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='Shotgun' || other.node.name=='player_grenade' && this.isdead == false){
            this.life-=2;
            cc.audioEngine.playEffect(this.Sarubia_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='flame' && this.isdead == false){
            this.life-=3;
            cc.audioEngine.playEffect(this.Sarubia_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='NPC' || other.node.name=='gift_laser' || other.node.name=='gift_mg' || other.node.name=='gift_shotgun' || other.node.name=='Projectile'){
            contact.disabled=true;
        }
        
    }

}
