import { useReducer } from "react";

let initialState = {count: 0};

function reducer(state, action) {
    switch (action.type) {
        case "join":
            return {count: state.count + 1};
        case "exit":
            return {count: state.count - 1};
        default:
            return state;
    }
}

export function ReducerDemo() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="container-fluid">
            <h2>Live <span className="bi bi-camera-video"></span> Video Streaming</h2>
            <h4>{state.count} Watching</h4>
            <button className="btn btn-primary p-1 m-1" onClick={() => dispatch({type: "join"})}>Start Watching</button>
            <button className="btn btn-danger p-1 m-1" onClick={() => dispatch({type: "exit"})}>Stop Watching</button>
        </div>
    );
}