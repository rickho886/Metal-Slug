const {ccclass, property} = cc._decorator;

@ccclass
export default class laser extends cc.Component {


    public anim: cc.Animation = null;
    public animateState : cc.AnimationState = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

    }
    start(){
        this.anim = this.getComponent(cc.Animation);
    }

    update(){
        if(this.animateState == null || this.animateState.name != 'flame'  ){
            this.animateState = this.anim.play('flame');
        }

    }


    public init(node: cc.Node, direction: string) {
        this.scheduleOnce(function(){this.node.destroy();},1)
        this.node.parent = node.parent;
        let speed =0;
        if(direction == 'front'){
            if(node.scaleX == -1){
                this.node.position = cc.v2(-62,8);
                speed = -200;
            }else{
                this.node.position = cc.v2(62,8);
                speed = 200;
            }
            if(node.getComponent('Player1').sDown && node.getComponent('Player1').onGround){
                this.node.position=this.node.position.addSelf(cc.v2(0,-17));
            }
            this.node.position = this.node.position.addSelf(node.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed,0);
        }else if(direction == 'top'){
            if(node.scaleX == -1){
                this.node.position = cc.v2(-8,62);
                speed = 200;
            }else{
                this.node.position = cc.v2(8,62);
                speed = 200;
            }
            this.node.position = this.node.position.addSelf(node.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, speed);

        }else if(direction == 'down'){
            if(node.scaleX == -1){
                this.node.position = cc.v2(-8,-62);
                speed = -200;
            }else{
                this.node.position = cc.v2(8,-62);
                speed = -200;
            }
            this.node.position = this.node.position.addSelf(node.position);
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, speed);
        }
        
    }
    

    
    
    onBeginContact(contact, self, other) {
        if(other.node.name == "Ground" || other.node.name == "Brouette" 
        || other.node.name=='leftbound'|| other.node.name=='rightbound'|| other.node.name=='Sarubia'
        || other.node.name=='R-Shobu'|| other.node.name=='Landseek'|| other.node.name=='Rebel_Soldier'
        || other.node.name=='Bradley'|| other.node.name=='BradleyMissile'|| other.node.name=='R-Shobu Bomb') {
            self.node.destroy(); 
        }
    }
    
    

}
