import "./ErrorModal.scss";
import Button from "../../UI/Button/Button";


function ErrorModal(props: any) {
    
  //handlers
  const refreshPageHandler = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="backdrop" onClick={props.onConfirm}></div>
      <section className="modal">
        <header className="modal__header">
          <h2>{props.title}</h2>
        </header>
        <div className="modal__content">
          <p>{props.errorMessage}</p>
        </div>
        <footer className="modal__actions">
          <Button onClick={refreshPageHandler} title="Refresh Page" />
          <Button onClick={props.onConfirm} title="Okay" />
        </footer>
      </section>
    </>
  );
}

export default ErrorModal;
