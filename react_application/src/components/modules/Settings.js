import './../../assets/styles/settingspage_style.css'

export default function Settings({setCurrentPage}) {
  const handleClick = () => {
    setCurrentPage('LP');
  };

  return (
    <div className="button-container-settings">
      <button onClick={handleClick} className="big-button">
        Log Out
      </button>
    </div>
  );
}