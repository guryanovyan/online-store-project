import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = [];
        this._brands = [];
        this._types = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._page = 1; // Current page
        this._totalCount = 0; // All amount of devices on current request
        this._limit = 3; // Amount of devices on 1 page
        this._cart = [];
        this._cartDevices = [];
        makeAutoObservable(this);
    }

    setBrands(brands) {
        this._brands = brands;
    }
    setTypes(types) {
        this._types = types;
    }
    setDevices(devices) {
        this._devices = devices;
    }
    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type;
    }
    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }
    setLimit(limit) {
        this._limit = limit;
    }
    setCart(cart) {
        this._cart = cart;
    }
    setCartDevices(cartDevices) {
        this._cartDevices = cartDevices;
    }

    get brands() {
        return this._brands;
    }
    get types() {
        return this._types;
    }
    get devices() {
        return this._devices;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedBrand() {
        return this._selectedBrand;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
    get cart() {
        return this._cart;
    }
    get cartDevices() {
        return this._cartDevices;
    }
}