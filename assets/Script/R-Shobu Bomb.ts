const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property({type: cc.AudioClip})
    rshobu_bomb: cc.AudioClip = null;


    public anim: cc.Animation = null;
    public animateState = null;
    private life:number=1;
  

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        this.anim = this.getComponent(cc.Animation)
    }


    update(dt){
        if(this.animateState == null || this.animateState.name != 'bomb') {
            this.animateState = this.anim.play('bomb');
        }
    }

    public init(node: cc.Node) {
        this.setInitPos(node);
        this.bulletMove();
    }
    
    private setInitPos(node: cc.Node) {
        // don't mount under the player, otherwise it will change direction when player move
        this.node.parent = node.parent;
        this.node.position = cc.v2(-8, -62); 
        
       // set the bullet’s absolute position  
       this.node.position = this.node.position.addSelf(node.position);
    }

    private bulletMove() {
        let speed;
        speed = -300;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, speed);
    }
    
    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground") {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.anim.play("grenade_explosion_small")
            cc.audioEngine.playEffect(this.rshobu_bomb, false);
            this.scheduleOnce(function() {
                this.node.destroy();
            }, 1.5)
        }/*else if(other.node.name=='leftbound' || other.node.name=='rightbound'
        || other.node.name=='Brouette' || other.node.name=='Leafy_edge' || other.node.name=='Roof'
        || other.node.name=='Rock' || other.node.name=='Sarubia' || other.node.name=='Bradley'
        || other.node.name=='Landseek' || other.node.name=='Player1' || other.node.name=='flame'){
            this.anim.play("grenade_explosion_small")
            cc.audioEngine.playEffect(this.rshobu_bomb, false);
            this.scheduleOnce(function() {
                this.node.destroy();
            }, 1.5)
        }*/else if(other.node.name=='bullet' || other.node.name=='MachinegunBullet'){
            this.life-=1;
        }
    }
}
