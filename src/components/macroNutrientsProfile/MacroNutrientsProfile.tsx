import "./macroNutrientsProfile.css";

const MacroNutrientsProfile = ({
  keyData,
  keyDataValue,
  keyDataName,
  src,
  style,
}: any) => {
  return (
    <div className="main-data">
      <div className="icon" style={style}>
        <img src={src}></img>
      </div>
      <div className="quantity">
        <p className="number">
          {keyData} {keyDataValue}
        </p>
        <p className="text">{keyDataName}</p>
      </div>
    </div>
  );
};

export default MacroNutrientsProfile;
