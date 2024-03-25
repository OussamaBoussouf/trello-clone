
import Menu from "../../components/Menu";
import { GoPencil } from "react-icons/go";
import { FiDelete } from "react-icons/fi";
import "./Workspace.css";

function Workspace() {
  return (
    <section className="shadow-lg mt-3">
      <div className="flex items-start bg-white h-[85vh] scrollbar-none p-3 overflow-y-hidden rounded-md">
        <div className="grid grid-flow-col h-[100%] auto-cols-[300px] gap-5">
          <div className="h-[100%] shadow-lg bg-gray-100 rounded-md px-3 py-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold">Hello world</h2>
              <Menu>
                <Menu.Button/>
                <Menu.List>
                  <Menu.Item>
                    <GoPencil size={19} />
                    <p className="text-sm">Modify title</p>
                  </Menu.Item>
                  <Menu.Item>
                  <FiDelete size={19} />
                    <p className="text-sm">Delete column</p>
                  </Menu.Item>
                </Menu.List>
              </Menu>
            </div>
            <ul className="space-y-4 pt-2  text-[.8rem] h-[92%] scrollbar-thin overflow-y-auto">
              <li className="bg-white shadow-md rounded-md p-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto ducimus rem corporis quia iste cumque?
              </li>
            </ul>
          </div>
          <button className="self-start w-[50%] bg-light-blue rounded-md py-2 px-3 text-white" type="button">Add a column</button>
        </div>
      </div>
    </section>
  );
}

export default Workspace;
