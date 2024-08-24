import './Header.css'

function Header(){

    return(
        <header className="header">
            <a>
            <div className="logo">
                <img src="./src/assets/sport_logo.png" alt="logo"/>
            </div>
            </a>
            
            <nav className="nav">
                <ul>
                    <li><a href="#">Accueil</a></li>
                    <li><a href="#">Profil</a></li>
                    <li><a href="#">Réglage</a></li>
                    <li><a href="#">Communauté</a></li>
                </ul>
            </nav>
        </header>
    )
}



export default Header