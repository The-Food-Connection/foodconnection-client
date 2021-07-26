import React from 'react';
import { MDBFormInline } from "mdbreact";
import '../App.css';


export default function SearchBar() {

    return (
        <MDBFormInline waves>
            <div className="md-form my-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Start Typing your Search Here...." aria-label="Search" />
            </div>
        </MDBFormInline>
    )
};
