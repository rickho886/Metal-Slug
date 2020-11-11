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
export default class Menu extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start(){
        cc.find("Canvas/LoginButton").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadLoginScene()
        },this);

        cc.find("Canvas/SignupButton").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadSignupScene()
        },this);
        
        if(cc.audioEngine.isMusicPlaying() == false) {
            this.playBGM();
        }
        
    }
 
    loadLoginScene(){
        cc.director.loadScene("login");
    }

    loadSignupScene(){
        cc.director.loadScene("signup");
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }
}
