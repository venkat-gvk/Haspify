import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Input from "./pages/Input";
import ValidateUrl from "./pages/ValidateUrl";

function App() {
  return (
    <div className="grid place-items-center mt-5 space-y-8">
      {/* Routes */}
      <main className="w-10/12">
        <Routes>
          <Route path="/" element={<Input />} />

          <Route path="h" element={<ValidateUrl />}>
            <Route path=":hashedUrl" />
          </Route>

          <Route path="sorry" element={<Error404 />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
