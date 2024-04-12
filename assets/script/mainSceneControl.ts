import { _decorator, Component, error, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mainSceneControl')
export class mainSceneControl extends Component {

    public static instance:mainSceneControl = undefined;

    public constructor(){
        super();
        if(mainSceneControl.instance === undefined ){
            mainSceneControl.instance = this;
        }else{
            error(" game errer ,repetitive create mainSceneControl")
        }
    }
w
    start(){
        
    }

    protected onDestroy(): void {
        mainSceneControl.instance = undefined;
    }

    public rotateController(x:number,y:number){

    }

}


