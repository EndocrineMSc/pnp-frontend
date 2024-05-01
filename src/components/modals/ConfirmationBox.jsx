import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**Modal pop-up to confirm user action.
 * @param {string} text - Warning/Confirmation text.
 * @param {function} onConfirm - Parent function that executes on confirmation.
 * @param {function} onAbort - Parent function that "closes" the modal without action.
 */
const ConfirmationBox = ({ text, onConfirm, onAbort }) => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  const onDelete = () => {
    onConfirm();
    onAbort();
  };

  return (
    <dialog
      ref={modalRef}
      className="flex flex-col justify-center items-center max-w-96 p-5 gap-5 bg-wgray-400 rounded shadow-lg backdrop:bg-wgray-950/70"
    >
      <div className="text-wrap text-center">{text}</div>
      <div className="flex w-full justify-around gap-3">
        <Button text="Confirm" onClick={onDelete} />
        <Button text="Cancel" onClick={onAbort} />
      </div>
    </dialog>
  );
};

const Button = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-20 h-10 rounded-xl bg-wgray-500 hover:brightness-90 shadow-sm hover:shadow-md"
    >
      {text}
    </button>
  );
};

ConfirmationBox.propTypes = {
  text: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onAbort: PropTypes.func.isRequired,
};

export default ConfirmationBox;
