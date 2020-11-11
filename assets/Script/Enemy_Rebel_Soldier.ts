const {ccclass, property} = cc._decorator;

@ccclass
export default class soldier extends cc.Component {

    @property({type: cc.AudioClip})
    soldier_die_bullet: cc.AudioClip = null

    @property({type: cc.AudioClip})
    soldier_die_knife: cc.AudioClip = null

    @property({type: cc.AudioClip})
    soldier_pull_knife: cc.AudioClip = null

    @property(cc.Prefab)
    private grenade_prefab: cc.Prefab = null;

    private anim: cc.Animation = null;
    public animateState: cc.AnimationState = null;

    private anim_fin : boolean = true;
    private act : boolean = false;
    private speed : number = 0;

    public knife : boolean = false;

    player : cc.Node = null;
    player_top : cc.Node = null;

    soldier_grenade : cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.game.setFrameRate(61);
        this.player = cc.find("Canvas/Player1");
        this.player_top = cc.find("Canvas/Player1/Bottom/Top");
 
    }

    start () {
        this.anim = this.getComponent(cc.Animation);
        this.animateState = this.anim.play('soldier_idle');
        this.node.scaleX = 1;
    }

     update (dt) {
         //cc.log(this.animateState.time);
        if(this.player.x>this.node.x-400){
            this.act = true;
        }
        this.node.x += this.speed * dt;
        this.soldier_Animation();
        //cc.log(this.animateState.time);
     }

     public soldier_Animation(){
        
        if(this.act== true && this.anim_fin == true){
            var rad = Math.floor(6 * Math.random());
            this.anim_fin = false;
            if(this.node.x - this.player.x < 50 && this.node.x - this.player.x > -50 && this.node.y>this.player.y-50){
                this.knife = true;
                this.speed = 0;
                this.animateState = this.anim.play('soldier_knife');
                this.scheduleOnce(function(){ this.anim_fin =true;this.knife=false; }, 2);
            }else if(rad == 0 ){
                if(this.node.x>this.player.x || this.node.x>this.player.x+350){
                    this.speed = -100;
                    this.node.scaleX = 1;
                }else if(this.node.x<this.player.x || this.node.x<this.player.x-350){
                    this.speed = 100;
                    this.node.scaleX = -1;
                }
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 250);
                this.animateState = this.anim.play('soldier_jump');
                this.scheduleOnce(function(){ this.anim_fin =true; }, 1.5);
            }else if(rad == 1 || rad == 2){
                if(this.node.x>this.player.x || this.node.x>this.player.x+350){
                    this.speed = -100;
                    this.node.scaleX = 1;
                }else if(this.node.x<this.player.x || this.node.x<this.player.x-350){
                    this.speed = 100;
                    this.node.scaleX = -1;
                }
                this.animateState = this.anim.play('soldier_walk');
                this.scheduleOnce(function(){ this.anim_fin =true; }, 2);
            }else{
                if(this.node.x>this.player.x ){
                    this.node.scaleX = -1;
                }else{
                    this.node.scaleX = 1;
                }
                this.speed = 0;
                this.animateState = this.anim.play('soldier_throw_grenade');
                this.scheduleOnce(function(){  this.creategrenade(); }, 0.8);
                this.scheduleOnce(function(){ this.anim_fin =true;  }, 1.4);
            }
        }
     }

     public creategrenade() {
        let grenade = cc.instantiate(this.grenade_prefab);
        grenade.getComponent('Soldier_grenade').init(this.node);
    }

     onBeginContact(contact, self, other) {
        //cc.log(other.node.name);
        if(other.node.name == "Player1" && this.player.getComponent('Player1').knife == true ){
            
            //if(this.player_top.getComponent('Player1_top').animateState.time>0.15){
                cc.audioEngine.playEffect(this.soldier_die_knife, false);
                this.node.destroy();
            //}
        } 
        else if(other.node.name == "Player1" || other.node.name == "Soldier_grenade" || other.node.name == "Rebel_Soldier" || other.node.name == "NPC"
        || other.node.name=='Projectile' || other.node.name=='gift_laser' || other.node.name=='gift_mg' || other.node.name=='gift_shotgun')
        {
            contact.disabled = true;
        }

        if(other.node.name == "bullet" || other.node.name=='flame' || other.node.name=='MachinegunBullet' || other.node.name=='player_grenade' || other.node.name=='Shotgun') {
            cc.audioEngine.playEffect(this.soldier_die_bullet, false);
            this.node.destroy();
        }
    }
}
