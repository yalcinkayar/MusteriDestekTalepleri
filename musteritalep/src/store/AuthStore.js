import {observable, action, makeAutoObservable} from 'mobx';

class AuthStore{
    appState = null;
    constructor(){
        makeAutoObservable(this, {
            appState:observable,
            save:action,
            get:action,
            remove:action
        })
    };

    async save(appState){
        try{
            await localStorage.setItem('appState', JSON.stringify(appState));
        }
        catch(e){
            console.log(e);
        }
    }
    async get(){
        try{
            const appValue = localStorage.getItem('appState');
            if(appValue){
                this.appState = JSON.parse(appValue);
            }else{
                this.appState = null;
            }
        }catch(e){

        }
    }
    async remove(){
        try{
            await localStorage.removeItem('appState');
            this.appState = null;
        }
        catch(e){
            console.log(e);
        }
    }
}

export default new AuthStore();