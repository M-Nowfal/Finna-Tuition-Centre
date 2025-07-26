import Button from "./Button";

const Alert = ({ title, msg, btn, proceed, setShowAlert, cancel = true, important }) => {

  return (
    <div className="fixed flex z-20 justify-center items-center h-screen inset-0 bg-black/60">
      <div className="flex flex-col gap-2 max-w-xl bg-white p-5 mx-5 rounded-xl shadow border border-gray-600">
        <span className="text-xl font-semibold">{title}</span>
        <p className="text-gray-500">{msg}&nbsp;
          <span className="text-lg font-bold text-emerald-500">{important}</span>
        </p>
        <div className="flex justify-end gap-3 mt-5">
          {cancel && <Button variant="outlined" size="xs" onClick={() => setShowAlert(false)}>Cancel</Button>}
          <Button variant={cancel ? `danger-outlined` : "contained"} size="xs" onClick={proceed}>{btn}</Button>
        </div>
      </div>
    </div>
  );
}

export default Alert;