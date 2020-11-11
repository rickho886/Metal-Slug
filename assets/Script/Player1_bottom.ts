import Player1 from "./Player1"
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
export default class Player1_bottom extends cc.Component {

    //add comment

    private anim: cc.Animation = null;
    private animateState: cc.AnimationState = null;


    @property({ type: cc.AudioClip })
    soundEffect: cc.AudioClip = null;

    player1: cc.Node = null;


    onLoad () {
        this.player1 = cc.find("Canvas/Player1");
        cc.director.getPhysicsManager().enabled = true;
    }

    update(dt) {
        this.playerAnimation();
    }

    start () {
        this.anim = this.getComponent(cc.Animation);
    }



    public playerAnimation()
    {
        /*if(this.player1.getComponent('Player1').isDead==true ){
            if(this.animateState == null || this.animateState.name != 'bottom_die'){
                this.animateState = this.anim.play('bottom_die');

            }

        }*/
        /*else*/ 
        if(this.player1.getComponent(Player1).isWin) {
            if(this.animateState == null || this.animateState.name != 'bottom_blank') 
            {
                this.animateState = this.anim.play('bottom_blank');
            }
        }
        else if(this.player1.getComponent(Player1).sDown)
        {
            if(!this.player1.getComponent(Player1).onGround) {
                this.animateState = this.anim.play('bottom_jump');
            }
            else if(this.animateState == null || this.animateState.name != 'bottom_blank') 
            {
                this.animateState = this.anim.play('bottom_blank');
            }
        }
        else if(this.player1.getComponent(Player1).aDown)
        {
            //this.node.scaleX = -1;

            if(!this.player1.getComponent(Player1).onGround) {
                this.animateState = this.anim.play('bottom_jump');
            }
            else if(this.animateState == null || this.animateState.name != 'bottom_walk') {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('bottom_walk');
            }
            
            
        }
        else if(this.player1.getComponent(Player1).dDown)
        {
            //this.node.scaleX = 1;
            if(!this.player1.getComponent(Player1).onGround) {
                this.animateState = this.anim.play('bottom_jump');
            }
            else if(this.animateState == null || this.animateState.name != 'bottom_walk') {// when first call or last animation is shoot or idle
                this.animateState = this.anim.play('bottom_walk');
            }
        }
        else
        {
            if(!this.player1.getComponent(Player1).onGround) {
                this.animateState = this.anim.play('bottom_jump');
            }
            else if(this.animateState != null)
            {
                this.anim.play('bottom_idle');
                this.animateState = null;
            }
        }
    }   
}
