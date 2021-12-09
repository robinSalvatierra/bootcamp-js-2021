const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = Redux.applyMiddleware(loggerMiddleware);
const store = Redux.createStore(reducer, preloadedState, middlewares);

let latestState;


//llamar unsuscribe() cuando se deba desuscribirse al ejecutar un action
const unsuscribe = store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
      
        ui.renderTable(currentState.productos)
        ui.renderForm(currentState.producto)
    }
});


ui.onFormSubmit = (producto) => {
    if(producto.codigo)
    {
        store.dispatch(
           productoModificado(producto)
        )
    }else {
        store.dispatch(
           productoAgregado(producto)
        )
    }


    store.dispatch(
       productoSeleccionado(null)
    )
}

ui.onEditarClick = (codigo) => {
    store.dispatch(
        productoSeleccionado(codigo)
    )
}

ui.onEliminarClick = (codigo) => {
    store.dispatch(
       productoEliminado(codigo)
    )
}