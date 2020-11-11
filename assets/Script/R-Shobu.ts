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

    @property(cc.Node)
    player:cc.Node =null;

    @property(cc.Prefab)
    private bombPrefab: cc.Prefab = null;

    @property({type: cc.AudioClip})
    Shobu_hit: cc.AudioClip = null

    private anim: cc.Animation = null;
    private speed:number=300;
    private life:number=35;
    private isdead:boolean=false;
    private now_move: boolean = false;
    private delay: number = 1;
    private fast_move: boolean = true;
    

    // onLoad () {}

    start () {
        this.anim = this.getComponent(cc.Animation);
        cc.director.getPhysicsManager().enabled = true;
        this.scheduleOnce(function() {
            this.fast_move = false;
        }, 1);
    }

    update (dt) {
        this.movement(dt);
        if(this.life <= 0) {
            this.node.destroy();
        } 
    }



    movement(dt){
        if(this.isdead){
            this.speed = 0;
        } else {
            if(!this.fast_move) {
                this.speed = 100;
            }
            if(this.node.x < this.player.x - 20) {
                this.node.x += this.speed * this.node.scaleX *dt * this.delay;
            } else if(this.node.x > this.player.x + 20){
                this.node.x += this.speed * this.node.scaleX *dt *-1 * this.delay;
            }
        }
        this.scheduleOnce(this.createBomb, 1);
        this.node.scaleX=1;
    }

    onBeginContact(contact, self, other){
        if(other.node.name=='bullet' || other.node.name=='MachinegunBullet' && this.isdead == false){
            this.life-=1;
            cc.audioEngine.playEffect(this.Shobu_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='Shotgun' || other.node.name=='player_grenade' && this.isdead == false){
            this.life-=2;
            cc.audioEngine.playEffect(this.Shobu_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }else if(other.node.name=='flame' && this.isdead == false){
            this.life-=3;
            cc.audioEngine.playEffect(this.Shobu_hit, false);
            this.node.color = new cc.Color(250, 69, 69);
            this.scheduleOnce(function() {
                this.node.color = new cc.Color(255, 255, 255);
            }, 0.1);
        }/*else if(other.node.name==''){
            contact.disabled=true;
        }*/
    }

    private createBomb() {
        let bomb = cc.instantiate(this.bombPrefab);
        bomb.getComponent('R-Shobu Bomb').init(this.node);
    }

}