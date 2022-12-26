import React, { useRef, useEffect } from 'react';

import classes from './Input.module.css';

const Input = (props) => {
    const inputRef = useRef();

    // runs after every component render cycle - [] empty dependency array: only run once
    useEffect(() => {
        inputRef.current.focus();
    }, []);

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
};

export default Input;