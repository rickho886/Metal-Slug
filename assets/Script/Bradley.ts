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
export default class Bradley extends cc.Component {
     
    @property({type: cc.AudioClip})
    bradley_shoot: cc.AudioClip = null

    @property({type: cc.AudioClip})
    bradley_dead: cc.AudioClip = null

    @property({type: cc.AudioClip})
    bradley_hit: cc.AudioClip = null

    @property(cc.Node)
    player:cc.Node =null;

    @property(cc.Prefab)
    private missilePrefab: cc.Prefab = null;

    private state:string='idle';
    private anim: cc.Animation = null;
    private animateState = null;
    private speed:number=0;
    private life:number=50;
    private direction:number=1;
    private change:boolean=true;
    private gateflag:boolean=true;
    cam: cc.Node = null;
    

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;
        this.cam = cc.find("Canvas/Main Camera");
    }

    update (dt) {
        // /cc.log(this.state);
        this.updatestate();
        this.movement(dt);
        this.animation();
        
    }

    updatestate(){
        if(this.life<=0){
            this.state='dead';
            if(this.gateflag){this.cam.getComponent('Camera_Control').gate4 = true ;this.gateflag=false;}
        }
        else if(this.state=='idle'){
            if(Math.abs(this.node.x-this.player.x)<=700){
                this.state='move';
            }
        }
    }

    private createMissile() {
        let missile = cc.instantiate(this.missilePrefab);
        missile.getComponent('BradleyMissile').init(this.node);
    }

    movement(dt){
        if(this.state=='dead'){
            this.speed=0;
            this.node.scaleX = -1;
        }
        else if(this.state=='move'){
            this.speed=40;
            if(this.change){
                if(Math.abs(this.node.x-this.player.x)<=400 && Math.abs(this.node.x-this.player.x)>=300){
                    this.direction=-1;
                }else if(Math.abs(this.node.x-this.player.x)<=200){
                    this.direction=1;
                }else{
                    this.direction=(Math.random()>=0.5)?1:-1;
                }
                this.change=false;
            }
        }else{
            this.speed=0;
        }
        this.node.scaleX=1;
        this.node.x += this.speed * this.direction *dt;
    }

    animation(){
        //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).size);
        if(this.state=='dead'){
            if(this.animateState == null || this.animateState.name != 'wrecked'){
                this.animateState=this.anim.play('wrecked');
                cc.audioEngine.playEffect(this.bradley_dead, false);
                
                /*this.animateState.on('finished',()=>{
                    this.node.y-=35;
                    this.node.getComponent(cc.PhysicsBoxCollider).size=cc.size(0,0);
                    //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).size);
                    //cc.log(this.node.getComponent(cc.PhysicsBoxCollider).offset);
                })*/
            }
        }else if(this.state=='move'){
            if(this.animateState == null || this.animateState.name != 'walking'){
                this.animateState=this.anim.play('walking');
                this.scheduleOnce(()=>this.state='stop',2);
            }
        }else if(this.state=='stop'){
            if(this.animateState == null || this.animateState.name != 'stopping_frames'){
                this.change=true;
                this.animateState=this.anim.play('stopping_frames');
                this.animateState.on('finished',()=>this.state='shoot');
            }
        }else if(this.state=='shoot'){
            if(this.animateState == null || this.animateState.name != 'shooting'){
                
                this.animateState=this.anim.play('shooting');
                this.animateState.repeatCount=6;
                cc.audioEngine.playEffect(this.bradley_shoot, false);
                this.animateState.on('finished',()=>this.state='cooldown');
            }
        }else if(this.state=='cooldown'){
            if(this.animateState == null || this.animateState.name != 'idle'){
                this.animateState=this.anim.play('idle');
                this.scheduleOnce(()=>this.state='move',1);
            }
        }
    }

    onBeginContact(contact, self, other){
        if(other.node.name=='bullet' || other.node.name=='MachinegunBullet' && this.state != 'dead'){
            this.life-=1;
            cc.audioEngine.playEffect(this.bradley_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='Shotgun' || other.node.name=='player_grenade' && this.state != 'dead'){
            this.life-=2;
            cc.audioEngine.playEffect(this.bradley_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='flame' && this.state != 'dead'){
            this.life-=3;
            cc.audioEngine.playEffect(this.bradley_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='NPC' || other.node.name=='gift_laser' || other.node.name=='gift_mg' || other.node.name=='gift_shotgun' || other.node.name=='Projectile'){
            contact.disabled=true;
        }
    }
}
