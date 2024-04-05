import { useEffect, useRef } from "react";

/**Modal pop-up to confirm user action
 * @param {string} text - Warning/Confirmation text
 * @param {function} deleteEntry - Parent function that deletes the entry
 * @param {function} onAbort - Parent function that "closes" the modal without action
 */
const ConfirmationBox = ({ text, deleteEntry, onAbort }) => {
  const modalRef = useRef();

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  const onDelete = () => {
    deleteEntry();
    onAbort();
  };

  return (
    <dialog
      ref={modalRef}
      className="flex flex-col justify-center items-center gap-5 min-w-60 min-h-32 bg-wgray-400 rounded shadow-lg"
    >
      <div>{text}</div>
      <div className="flex w-full justify-around">
        <Button text="Confirm" onClick={onDelete} />
        <Button text="Abort" onClick={onAbort} />
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

export default ConfirmationBox;
