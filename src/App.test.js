import App from "src/App";
import { mount, shallow } from "enzyme";
import { withContext } from "components/renderApp";



test("can render App", () => {

    expect(() => {

        mount(withContext(App));

    }).not.toThrow();

});


test("can render App shallowly", () => {

    expect(() => {

        shallow(withContext(App));

    }).not.toThrow();

});
