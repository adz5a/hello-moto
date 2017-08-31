import React from "react";
import {
    joinClasses as join
} from "components/styles";
import { css } from "glamor";
import { MenuIcon, Close } from "components/icons";
import { 
    withState,
    withProps,
    compose
} from "recompose";
import noop from "lodash/noop";
import PropTypes from "prop-types";


export const mainStyle = join(
    "mt5",
    "pl3",
    "pr3"
);


const headerStyle = join(
    "fixed",
    "shadow-3",
    "header",
    "h3",
    "flex",
    "items-center",
    "justify-between",
    "pl1",
    "pr1",
    "bg-white",
    css({
        top: "0",
        left: "0",
        right: "0",
        zIndex: 2000
    })
);

const titleStyle = join(
    "h2"
);

const menuIconStyle = join(
    "h2",
    "w2",
    "pointer",
    "grow",
);



const baseMenuStyle = join(
    "fixed",
    "w5",
    "shadow-2",
    "bg-white",
    css({
        top: 0,
        bottom: 0,
        zIndex: 4000,
        transition: "right 0.4s"
    })
);


const openMenuStyle = join(
    baseMenuStyle,
    css({
        right: 0
    })
);

const closedMenuStyle = join(
    baseMenuStyle,
    css({
        right: "-16rem"
    })
);


const closeMenuStyle = join(
    "h2",
    "w2",
    "pointer",
    "grow"
);


export function PageView ({ 
    children, 
    MenuItems,
    Menu = MenuView,
    isMenuOpen = false,
    openMenu = noop,
    hasMenu = true,
    title = ""
}) {

   
    const items = MenuItems ?
        <MenuItems /> :
        null;

    const menu = hasMenu ?
            <Menu 
                onClose={() => openMenu(false)}
                isOpen={isMenuOpen}>
                {items}
            </Menu> :
        null;

    const menuIcon = hasMenu ? <MenuIcon 
        className={menuIconStyle}
        onClick={() => openMenu(true)}
    /> :
        null;

    return (
        <section
        >
            <header className={headerStyle}>
                <h2 className={titleStyle}>{title}</h2>
                {menuIcon}
            </header>
            <main className={mainStyle}>
                {children}
            </main>
            {menu}
        </section>
    );

}


export function MenuView ({ 
    isOpen = false,
    onClose = noop,
    children
}) {

    const menuStyle = isOpen ?
        openMenuStyle :
        closedMenuStyle;

    return (
        <aside className={menuStyle}>
            <Close
                className={closeMenuStyle}
                onClick={onClose}
            />
            {children}
        </aside>
    );

}


export const Menu = MenuView;

Menu.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export const Page = compose(
    withProps(
        { Menu }
    ),
    withState(
        "isMenuOpen",
        "openMenu",
        false
    )
)(PageView)
