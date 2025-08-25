import deleteicon from "../../assets/delete.svg";
export default function ListItem({ item, onRemove }) {
  return (
    <>
      <div className="border-b-2 border-gray-700 mb-2 grid grid-cols-3 p-1">
        <div className="col-span-2 grid grid-rows-2">
          <h1 className="text-2xl font-bold text-gray-700">{item.name}</h1>
          <div>
            <p className="text-lg text-gray-700">
              B/. {item.price} x {item.quantity}
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="m-auto flex items-center w-full">
            {" "}
            <h1 className="text-xl font-bold ms-auto text-gray-700">
              B/. {(item.price * item.quantity).toFixed(2)}
            </h1>
            <div className="btn btn-error ms-2 p-1 " onClick={onRemove}>
              <img src={deleteicon} alt="" className="w-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
