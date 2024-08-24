import "./styles/App.css"
import Header from "./layouts/Header"
import SideBar from "./layouts/SideBar"
import Dashboard from "./pages/Home"

function App() {
  const userId = 18

  return (
    <div className="App">
      <Header />
      <div className="container">
        <SideBar />
        <Dashboard userId={userId} />
      </div>
    </div>
  )
}

export default App
