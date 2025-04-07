export default function Header({handleState}){
    console.log("Estoy en Header")
    return(
        <>
            <header>
                <h1>Biblioteca</h1>
                <p onClick={()=>handleState("loginPage")}>Login</p>
            </header>
        </>
    );
}