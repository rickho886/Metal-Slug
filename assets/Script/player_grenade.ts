const {ccclass, property} = cc._decorator;

@ccclass
export default class player_grenade extends cc.Component {


    @property({type: cc.AudioClip})
    player_grenade: cc.AudioClip = null

    public anim: cc.Animation = null;
    public animateState = null;
    private boom:boolean=false;
    

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start(){
        this.anim = this.getComponent(cc.Animation);
    }

    update(){
        if(!this.boom){
            if(this.animateState == null || this.animateState.name != 'player_grenade'  ){
                this.animateState = this.anim.play('player_grenade');
            }
        }else{
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }

    public init(player: cc.Node){
        this.node.parent = player.parent;

        if(player.scaleX == -1){
            this.node.position = cc.v2(-35, 15);
            this.node.position = this.node.position.addSelf(player.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-325, 200);

        }else{
            this.node.position = cc.v2(35, 15);
            this.node.position = this.node.position.addSelf(player.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(325, 200);
        }
        
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground" || other.node.name == "Brouette" 
        || other.node.name=='leftbound'|| other.node.name=='rightbound'|| other.node.name=='Sarubia'
        || other.node.name=='R-Shobu'|| other.node.name=='Landseek'|| other.node.name=='Rebel_Soldier'
        || other.node.name=='Bradley') {
            this.boom=true;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.animateState=this.anim.play("grenade_explosion_small");
            this.animateState.on('finished',()=>this.node.destroy());
            cc.audioEngine.playEffect(this.player_grenade, false);
            
        }
    }
}
