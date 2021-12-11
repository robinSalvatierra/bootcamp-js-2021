import {applyMiddleware, createStore} from "redux";
import {ui} from "./ui"
import * as $store from "./store"

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware($store.loggerMiddleware, $store.addorModifyProductMiddleware, $store.generadorCodigoProductoBuilder(0));
const store = createStore($store.reducer, preloadedState, middlewares);




//llamar unsuscribe() cuando se deba desuscribirse al ejecutar un action
/*
const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
      
        ui.renderTable(currentState.productos)
        ui.renderForm(currentState.producto)
    }
});
*/

store.subscribe(dispatchOnChange (store, (state) => {
    ui.renderTable(state.productos)
    ui.renderForm(state.producto)
}))

ui.onFormSubmit = (producto) => {

    store.dispatch(
        $store.agregarOModificarProducto(producto)
    )
}

ui.onEditarClick = (codigo) => {
    store.dispatch(
        $store.productoSeleccionado(codigo)
    )
}

ui.onEliminarClick = codigo =>  store.dispatch( $store.productoEliminado(codigo))


function dispatchOnChange(store, disparador) {
    let latestState;
    return function(){
        let currentState = store.getState();
        if (currentState != latestState)
        {
            latestState = currentState;
            disparador(currentState)
        }
    }
}