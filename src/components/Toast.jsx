import './Toast.css';

const Toast = ({ messages }) => {
  return (
    <div className="toast-container">
      {messages.map(msg => (
        <div key={msg.id} className="toast show">
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Toast;
