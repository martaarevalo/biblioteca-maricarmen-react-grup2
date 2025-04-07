import LandingPage from "./LandingPage";
import Login from "./Login";

export default function MainArea({stateFromPage, checkLogin}){
    return(<>

        {stateFromPage === "landingPage" && <LandingPage/>}
        {stateFromPage === "loginPage" && <Login checkLogin={checkLogin}/>}

    </>);
}