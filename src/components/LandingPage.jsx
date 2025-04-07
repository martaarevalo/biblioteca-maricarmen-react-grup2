import BookList from "./BookList";

export default function LandingPage({userInfo}){
    console.log(userInfo)
    return(<>
        <p>Landing Page</p>
        <BookList/>
    </>);
}