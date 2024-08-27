import "./greetings.css"

type UserMainData = {
  userInfos: {
    firstName: string
  }
}

const Greetings = (props: UserMainData) => {
  return (
    <div className="greetings">
      <div>
        <h2>
          <span>Bonjour</span> {props.userInfos.firstName}{" "}
        </h2>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    </div>
  )
}

export default Greetings
