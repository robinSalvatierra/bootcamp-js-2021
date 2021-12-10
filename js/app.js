const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = Redux.applyMiddleware(loggerMiddleware, addorModifyProductMiddleware, generadorCodigoProductoBuilder(0));
const store = Redux.createStore(reducer, preloadedState, middlewares);




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
       agregarOModificarProducto(producto)
    )
}

ui.onEditarClick = (codigo) => {
    store.dispatch(
        productoSeleccionado(codigo)
    )
}

ui.onEliminarClick = codigo =>  store.dispatch( productoEliminado(codigo))


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