import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._isAdmin = false;
        this._user = {};
        this._boughtDevices = [];
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool;
    }
    setUser(user) {
        this._isAuth = user;
    }
    setBoughtDevices(devices) {
        this._boughtDevices = devices;
    }

    get isAuth() {
        return this._isAuth;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    get user() {
        return this._user;
    }
    get boughtDevices() {
        return this._boughtDevices;
    }
}