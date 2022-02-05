import CreateForm from "./paginas/createForm";
import TableList from "./paginas/tableList";

function App() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200">
      <CreateForm />
      <TableList />
    </div>
  );
}

export default App;
