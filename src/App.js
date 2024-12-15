import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {checkAuth, checkRole} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer (() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth()
            .then(data => {
                user.setUser(true);
                user.setIsAuth(true);
            })
            .catch(() => {})
            .finally(() => setLoading(false))

        checkRole()
            .then(data => user.setIsAdmin(true))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, []);

    if(loading){
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;