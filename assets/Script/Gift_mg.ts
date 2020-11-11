const {ccclass, property} = cc._decorator;

@ccclass
export default class Gift_mg extends cc.Component {



    private anim: cc.Animation = null;
    private animateState: cc.AnimationState = null;

    private used : boolean = false;


    onLoad () {

    }

    start () {
        this.anim = this.getComponent(cc.Animation);
    }

    update(){
        if(this.animateState == null || this.animateState.name != 'HeavyMachineGun'  ){
            this.animateState = this.anim.play('HeavyMachineGun');
        }
    }

    init(node: cc.Node){
        this.node.parent = node.parent;
        this.node.position = cc.v2(0,0);
        this.node.position = this.node.position.addSelf(node.position);
    }

    onBeginContact(contact, self, other) {
        //cc.log(other.node.name);
        if(other.node.name == "Player1" || other.node.name == "NPC" || other.node.name=='Projectile')
        {
            contact.disabled = true;
        }

        if(other.node.name == "Player1"  ) {
            this.node.destroy();
        }
    }
}
