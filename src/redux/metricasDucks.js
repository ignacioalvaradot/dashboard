// constantes
const Data = {
  array: [],
  array_expresiones: [],
  array_posturas: [],
};

const DataExp = {
  array: [],
};

//tipos
const OBTENER_METRICAS = "OBTENER_METRICAS";
const OBTENER_METRICAS_EXPRESIONES = "OBTENER_METRICAS_EXPRESIONES";
const OBTENER_METRICAS_POSTURAS = "OBTENER_METRICAS_POSTURAS";
const OBTENER_DATOS_EXPERIMENTO = "OBTENER_DATOS_EXPERIMENTO";

//reduces

export function hablaReducer(state = Data, action) {
  switch (action.type) {
    case OBTENER_METRICAS:
      return {
        ...state,
        array: [...state.array, action.payload] /* array: action.payload */,
      };
    case OBTENER_METRICAS_EXPRESIONES:
      return {
        ...state,
        array_expresiones: [...state.array_expresiones, action.payload],
      };
    case OBTENER_METRICAS_POSTURAS:
      return {
        ...state,
        array_posturas: [...state.array_posturas, action.payload],
      };
    default:
      return state;
  }
}

export function dataExpReducer(state = DataExp, action) {
  switch (action.type) {
    case OBTENER_DATOS_EXPERIMENTO:
      return { ...state, array: action.payload };
    default:
      return state;
  }
}

// Acciones

export const obtenerMetricasAccion = (data) => (dispatch, getState) => {
  const rest = data;
  dispatch({
    type: OBTENER_METRICAS,
    payload: rest,
  });
};
export const obtenerMetricasExpresionesAccion =
  (data) => (dispatch, getState) => {
    const rest = data;
    dispatch({
      type: OBTENER_METRICAS_EXPRESIONES,
      payload: rest,
    });
  };
export const obtenerMetricasPosturasAccion = (data) => (dispatch, getState) => {
  const rest = data;
  dispatch({
    type: OBTENER_METRICAS_POSTURAS,
    payload: rest,
  });
};

export const obtenerDatosExperimentoAccion = (data) => (dispatch, getState) => {
  const rest = data;
  dispatch({
    type: OBTENER_DATOS_EXPERIMENTO,
    payload: rest,
  });
};
