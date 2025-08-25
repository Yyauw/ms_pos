export default function PosNumericButton({ handleButtonClick, value }) {
  return (
    <>
      <button
        className="btn btn-xl btn-soft btn-primary text-3xl font-bold"
        onClick={() => handleButtonClick(value)}
      >
        {value}
      </button>
    </>
  );
}
