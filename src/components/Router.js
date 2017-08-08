import {
    BrowserRouter as Router,
    MemoryRouter,
} from "react-router-dom";


const exportedRouter = process.env.NODE_ENV === "test" ?
    MemoryRouter :
    Router;


export { exportedRouter as Router };
