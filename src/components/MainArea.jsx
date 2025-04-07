import LandingPage from "./LandingPage";
import Login from "./Login";
import ProfilePage from "./ProfilePage";

export default function MainArea({stateFromPage, userInfo, checkLogin}){
    return(<>

        {stateFromPage === "landingPage" && <LandingPage userInfo={userInfo}/>}
        {stateFromPage === "loginPage" && <Login checkLogin={checkLogin}/>}
        {stateFromPage === "profilePage" && <ProfilePage userInfo={userInfo} />}

    </>);
}