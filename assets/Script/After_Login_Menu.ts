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

var stage_2;

@ccclass
export default class After_Login_Menu extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;


    start(){
        cc.find("Canvas/button_stage_1").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadStageOneScene()
        },this);
        cc.find("Canvas/leaderboard").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadLeaderboardScene();
        },this);

        cc.find("Canvas/qna").on(cc.Node.EventType.MOUSE_DOWN, function() {
            if(cc.find("Canvas/rules").opacity == 255) {
                cc.find("Canvas/rules").opacity = 0;
            } else {
                cc.find("Canvas/rules").opacity = 255;
            }
        },this);

        //cc.log(cc.audioEngine.isMusicPlaying())
        if(cc.audioEngine.isMusicPlaying() == false) {
            this.playBGM();
        }
        this.loadUser();
        
        
    }

    private loadUser() {
        firebase.auth().onAuthStateChanged(function(user) {
            cc.find("Canvas/header/user/name").getComponent(cc.Label).string = user.displayName;
            var emailModified = user.email.replace(".": "-");
            var usersRef = firebase.database().ref("user_list/" + emailModified + '/');
            usersRef.once('value').then(function(snapshot) {
                cc.find("Canvas/header/score/value").getComponent(cc.Label).string = snapshot.val().score.toString().padStart(7, "0");
                stage_2 = snapshot.val().stage2;
            })
        });
    }
 
    loadStageOneScene() {
        cc.director.loadScene("Stage1");
    }

    loadLeaderboardScene() {
        cc.director.loadScene("leaderboard");
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

}
