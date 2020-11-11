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
export default class NewClass extends cc.Component {

    @property({type: cc.AudioClip})
    Landseek_explode: cc.AudioClip = null

    @property(cc.Node)
    player:cc.Node =null;

    @property({type: cc.AudioClip})
    Landseek_hit: cc.AudioClip = null

    private state:string='idle';
    private anim: cc.Animation = null;
    private animateState = null;
    private speed:number=300;
    private life:number=29;
    private isdead:boolean=false;
    private isalmostdead: boolean = false;
    private now_move: boolean = false;
    private flag: boolean = true;
    private gateflag:boolean=true;
    cam: cc.Node = null;
    

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;
        this.cam = cc.find("Canvas/Main Camera");
    }

    update (dt) {
        this.updatestate();
        this.movement(dt);
        this.animation();
    }

    updatestate() {
        if(this.life<=0){
            this.isdead=true;
            this.isalmostdead = false;
            if(this.gateflag){this.cam.getComponent('Camera_Control').gate2 = true ;this.gateflag=false;}
        } else if(this.life<=13 && this.life > 0) {
            this.isdead = false;
            this.isalmostdead = true;
        }
        if(Math.abs(this.node.x-this.player.x)<=1000 && this.flag) {
            this.now_move = true;
            this.flag = false;
            this.scheduleOnce(function() {
                this.now_move = false;
            }, 3);
        }
    }

    movement(dt){
        if(this.isdead){
            this.speed=0;
            //this.node.scaleX = -1;
        }
        else if(this.now_move){
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
            if(this.animateState == null || this.animateState.name != 'idle_destroyed'){
                this.animateState=this.anim.play('idle_destroyed');
                cc.audioEngine.playEffect(this.Landseek_explode, false);
            }
        } else if(this.isalmostdead){
            if(this.animateState == null || this.animateState.name != 'idle_damaged'){
                this.animateState=this.anim.play('idle_damaged');
            }
        }
        /*}else if(this.state=='shoot'){
            if(this.animateState == null || this.animateState.name != 'shoot'){
                this.animateState=this.anim.play('shoot');
            }
        }*/
    }

    onBeginContact(contact, self, other){
        if(other.node.name=='bullet' || other.node.name=='MachinegunBullet' && this.isdead == false){
            this.life-=1;
            cc.audioEngine.playEffect(this.Landseek_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='Shotgun' || other.node.name=='player_grenade' && this.isdead == false){
            this.life-=2;
            cc.audioEngine.playEffect(this.Landseek_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='flame' && this.isdead == false){
            this.life-=3;
            cc.audioEngine.playEffect(this.Landseek_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='NPC' || other.node.name=='gift_laser' || other.node.name=='gift_mg' || other.node.name=='gift_shotgun' || other.node.name=='Projectile'){
            contact.disabled=true;
        }
        
    }

}