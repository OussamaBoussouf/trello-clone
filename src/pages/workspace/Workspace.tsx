import { GoPencil } from "react-icons/go";
import TableContent from "../../components/TableContent";
import { FaRegUser } from "react-icons/fa6";

import CreateTableButton from "../../components/CreateTableButton";

function Workspace() {
  return (
    <main className="mt-10">
      <div className="flex border-b-[1px] pb-5">
        <div className="me-3 text-white text-bold text-3xl bg-blue-500 h-16 w-16 rounded-lg flex items-center justify-center">
          T
        </div>
        <div>
          <p className="font-bold text-lg">
            Trello Workspace
            <button
              type="button"
              className="ms-2 align-middle hover:bg-gray-300 p-1 rounded-md"
            >
              <span>
                <GoPencil />
              </span>
            </button>
          </p>
        </div>
      </div>
      {/* YOUR TABLES */}
      <div className="my-3 flex">
        <span className="me-2">
          <FaRegUser size={19} />
        </span>
        <p className="font-bold">Your tables</p>
      </div>
      <div className="grid grid-cols-6">
        <TableContent />
        <TableContent />
        <TableContent />
        <TableContent />
        <TableContent />
        <TableContent />
        <CreateTableButton />
      </div>
    </main>
  );
}

export default Workspace;
