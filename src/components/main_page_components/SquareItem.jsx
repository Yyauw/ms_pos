export default function SquareItem({ item, onClick, bgColor = "bg-white" }) {
  const style =
    "flex flex-col items-center justify-center p-1  rounded-lg shadow-md cursor-pointer h-36 " +
    bgColor;
  return (
    <>
      <div className={style} onClick={onClick}>
        <h1 className="text-gray-700 text-xl font-bold text-center break-all">
          {item.name} {item?.code && item?.code.length === 0 && `*`}
        </h1>
        <p className="text-gray-700 text-xl">
          {!item?.price == 0 && "B/."} {item?.price}
        </p>
      </div>
    </>
  );
}
