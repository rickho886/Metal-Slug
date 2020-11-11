const {ccclass, property} = cc._decorator;

@ccclass
export default class Soldier_grenade extends cc.Component {

    @property({type: cc.AudioClip})
    soldier_grenade: cc.AudioClip = null;

    public anim: cc.Animation = null;
    public animateState  = null;

    private boom : boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start(){
        this.anim = this.getComponent(cc.Animation);
    }

    update(){
        if(!this.boom){
           if(this.animateState == null || this.animateState.name != 'soldier_grenade'  ){
                this.animateState = this.anim.play('soldier_grenade');
            }
        }else{
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }

    public init(soldier: cc.Node){
        this.node.parent = soldier.parent;

        if(soldier.scaleX == -1){
            this.node.position = cc.v2(10, 35);
            this.node.position = this.node.position.addSelf(soldier.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-150, 350);

        }else{
            this.node.position = cc.v2(-10, 35);
            this.node.position = this.node.position.addSelf(soldier.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(150, 350);

        }
        
    }




    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground" || other.node.name == "Brouette" ||  other.node.name == "Player1"
        || other.node.name=='rightbound' || other.node.name=='leftbound' || other.node.name=='rightbound' 
        || other.node.name=='Sarubia' || other.node.name=='Bradley' || other.node.name=='Landseek'
        || other.node.name=='R-Shobu') {
            this.boom=true;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.animateState=this.anim.play('normal_explosion_small');
            this.animateState.on('finished',()=>this.node.destroy());
            cc.audioEngine.playEffect(this.soldier_grenade, false);

        }
    }
}
