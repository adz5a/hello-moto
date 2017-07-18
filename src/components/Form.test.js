import React from "react";
import {
    Button,
    InputWithLabel,
    Input
} from "./Form";
import { shallow } from  "enzyme";


test("Form component", () => {

    [
        Button,
        InputWithLabel,
        Input
    ]
        .forEach( Component => {

            const tree = shallow(<Component />);
            expect(tree).toMatchSnapshot();

        } );

});
