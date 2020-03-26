'use strict';

import {ajax} from "../utils/ajax";
import {constants} from "../utils/constants";
import CafeModel from "./CafeModel";
import {Router} from "../modules/Router";

export default class CafeListModel{

    constructor() {
        this._cafeModelsList = [];
        const cafeListData = this._loadCafeList();
        this._constructCafe(cafeListData);
    }

    get context(){
        return new Promise(async (resolve) => {
            await this._checkCafeList();
            const cafeList = sessionStorage.getItem('CafeList');
            if(cafeList){
                resolve(JSON.parse(cafeList));
            }
            resolve(null);
        });
    }

    get isEmpty(){
        return new Promise(async (resolve) => {
            await this._checkCafeList();
            resolve(!this._cafeModelsList.length);
        });
    }

    getCafeById(id){
        return this._cafeModelsList.find((cafe) => {
            return cafe._id == id;
        });
    }

    async _checkCafeList(data){
        if(!data){
            await this.cafesList();
        }
    }

    _loadCafeList(){
        let cafeListData = sessionStorage.getItem('CafeList');
        if (cafeListData) {
            cafeListData = JSON.parse(cafeListData);
            return cafeListData;
        } else {
            this._saveCafeList([]);
            return [];
        }
    }

    _saveCafeList(data){
        sessionStorage.setItem('CafeList', JSON.stringify(data));
    }

    _constructCafe(cafeListData){
        cafeListData.forEach((_, id) => {
            const cafe = new CafeModel(id);
            this._cafeModelsList.push(cafe);
        });
    }

    createCafe(){
        let cafeListData = this._loadCafeList();
        cafeListData.push({});
        const cafe = new CafeModel(this._cafeModelsList.length);
        this._cafeModelsList.push(cafe);
        return cafe;
    }

    async cafesList() {
        await ajax(constants.PATH + '/api/v1/cafe',
            'GET',
            {},
            (response) => {
                if(response.data == null){
                    Router.redirect('/createCafe');
                } else {
                    if (response.errors === null) {
                        this._saveCafeList(response.data);
                        this._constructCafe(response.data);
                    } else {
                        throw response.errors;
                    }
                }
            }
        )
    }
}
