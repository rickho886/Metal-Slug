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

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    start(){
        cc.find("small_canvas_bg/quit").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loadMenuScene();
        },this);

        cc.find("small_canvas_bg/submit").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.loginNow();
        },this);

        cc.find("small_canvas_bg/google_button").on(cc.Node.EventType.MOUSE_DOWN, function() {
            this.googleLogin();
        },this);

        if(cc.audioEngine.isMusicPlaying() == false) {
            this.playBGM();
        }

    }

    private loginNow() {
        var txtEmail = cc.find("small_canvas_bg/email/TEXT_LABEL").getComponent(cc.Label).string
        var txtPassword = cc.find("small_canvas_bg/password").getComponent(cc.EditBox).string
        firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword).then(function() {
            cc.director.loadScene("after_login_menu");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            //create_alert("error", errorMessage);
            alert(errorMessage);
        });
    }

    private googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var curUser = firebase.auth().currentUser;
            var emailModified = curUser.email.replace(".": "-");

            var googleRef = firebase.database().ref('g_user_list/' + emailModified + '/');

            googleRef.once('value').then(function(snapshot) {
                console.log(snapshot.val().account);
            }).catch(function() {
                googleRef.child(emailModified).set({
                    account: 1
                });

                var usersRef = firebase.database().ref('user_list/');
                usersRef.child(emailModified).set({
                    score: 0,
                });

                return result.user.updateProfile({
                    displayName: "GOOGLEACCOUNT",
                })
            })

            
            
            // ...
          }).then(function() {
            cc.director.loadScene("after_login_menu");
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            alert(errorMessage);
          });
    }
 
    loadMenuScene(){
        cc.director.loadScene("menu");
    }

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, true);
    }

    
}
