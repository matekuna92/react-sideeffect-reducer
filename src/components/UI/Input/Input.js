import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// 2nd (rare) argument: it decides if a ref should be set from outside
// refers to: Login.js ref={emailInputRef} part.. it makes the connection, so internal functions can be used outside 

// Component needs to be wrapped in React.forwardRef. It returns a component, which now can is capable of being bound to a ref
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        // return object contains all data that can be used from outside without props-state management
        return {
            focus: activate
        };
    });

    return (
        <div
            className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;