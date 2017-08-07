import xs from "xstream";
import React from "react";
import PropTypes from "prop-types";

const window = global.window;

export class ScrollMonitor extends React.Component {


    static propTypes = {
        children: PropTypes.element.isRequired
    };


    static childContextTypes = {
        scrollMonitor: PropTypes.object
    };


    getChildContext () {

        return {
            scrollMonitor: this.scrollMonitor
        };

    }

    componentWillMount () {

        this.scrollMonitor = xs.create({
            start( listener ) {

                this._listener = e => listener.next(e);

                window.addEventListener("scroll", this._listener, true);
            },
            stop () {

                window.removeEventListener("scroll", this._listener, true);

            }
        });

    }

    render () {

        return this.props.children;

    }

}
