import './../../assets/styles/welcomepage_style.css'

export default function Welcome() {
  const texts = [
    { id: 1, text: 'Boiler Balance', style: 'title' },
    { id: 2, text: "Boiler Balance, powered by ChatGPT's analytical prowess, revolutionizes personal nutrition tracking by offering intelligent, personalized feedback on your daily dietary habits. Join us to transform your health journey into an insightful and adaptive experience, tailored to foster a balanced and healthy lifestyle.", style: 'description' },
  ];

  return (
    <div className="textContainer">
      {texts.map(({ id, text, style }) => (
        <div key={id} className={`textInstance ${style}`}>
          {text}
        </div>
      ))}
    </div>
  );
}