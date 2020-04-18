'use strict';

/** контроллер лэндинга */
export default class LandingController {

    /**
     * Инициализация LandingController
     * @param {LandingModel} landingModel модель лэндинга
     * @param {LandingView} landingView view лэндинга
     */
    constructor(landingModel, landingView) {
        this._landingModel = landingModel;
        this._landingView = landingView;
    }

    /**
     * Создание контекста для LandingView
     * @return {obj} созданный контекст
     */
    _makeViewContext(){
        return {
            header: {
                type: 'auth',
                avatar: {
                    photo: null
                }
            },
        }
    }

    /** Запуск контроллера */
    control(){
        this._landingView.context = this._makeViewContext();
        this._landingView.render();
    }
}
