import { useReducer } from "react";
import { UseChangeCase } from "../../hooks/changecase.hook";
import { useState } from "react";
import { useCaptcha } from "../../hooks/captcha.hook";

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
    const [user, setUser] = useState();
    const msg = UseChangeCase("welcome to Custom hook demo");
    const code = useCaptcha();

    return (
        <div className="container-fluid">
            <h1>{msg}</h1>
            <h2>Live <span className="bi bi-camera-video"></span> Video Streaming</h2>
            <h4>{state.count} Watching</h4>
            <dl>
                <dt>Enter User Name</dt>
                <dd><input type="text"/></dd>
                <dt>Captcha</dt>
                <dd>{code}</dd>
            </dl>
            <button className="btn btn-primary p-1 m-1" onClick={() => dispatch({type: "join"})}>Start Watching</button>
            <button className="btn btn-danger p-1 m-1" onClick={() => dispatch({type: "exit"})}>Stop Watching</button>
        </div>
    );
}