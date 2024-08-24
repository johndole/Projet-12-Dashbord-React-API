import './SideBar.css'

function SideBar() {

    return(
        <aside className="sideBar">
            <nav className="activite">
                <ul>
                    <li><a href="#"><img src="./src/assets/repos.svg" alt="activité-repos"/></a></li>
                    <li><a href="#"><img src="./src/assets/natation.svg" alt="activité-natation"/></a></li>
                    <li><a href="#"><img src="./src/assets/cyclisme.svg" alt="activité-cyclisme"/></a></li>
                    <li><a href="#"><img src="./src/assets/fitness.svg" alt="activité-fitness"/></a></li>
                </ul>
            </nav>
            <div className="copyright">
                <p>Copyright, SportSee © 2020</p>
            </div>
        </aside>
    )
}

export default SideBar

