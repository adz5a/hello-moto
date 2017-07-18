import React, { Component } from 'react';


// export function Form () {

//     return (
//         <form action="sign-up_submit" method="get" acceptCharset="utf-8">
//             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                 <legend className="ph0 mh0 fw6">Bucket Form</legend>
//                 <div className="mt3">
//                     <InputWithLabel
//                         name="baseURL"
//                         type="text"
//                         label="Base URL"
//                     />
//                 </div>
//                 <div className="mt3">
//                     <InputWithLabel
//                         name="bucketname"
//                         type="text"
//                         label="Bucket Name"
//                     />
//                 </div>
//             </fieldset>
//             <Button type="submit" />
//         </form>
//     );

// }

export function Input ( { type, name } ) {

    return (
        <input
            className="b pa2 input-reset ba bg-transparent"
            type={type}
            name={name}
        />
    );

}

export function Span ( { children, className = "" } ) {

    return (
        <span
            className={"b pa2 input-reset ba bg-transparent " + className}
            
        >
            {children}
        </span>
    );

}

export function InputWithLabel ( {
    type,
    name,
    label
} ) {

    const id = [ type, name, label ].join("-");
    return (
        <span>
            <label className="db fw4 lh-copy f6" htmlFor={id}>{label}</label>
            <input
                className="b pa2 input-reset ba bg-transparent"
                type={type}
                name={name}
                id={id}
            />

    </span>
    );

}

export function Button ( { type, value, className = "", ...props } ) {

    return(
        <input
            {...props}
            type={type || "button"}
            className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 " + className}
            value={value}
        />
    );

}
