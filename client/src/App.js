import {Footer} from "./components";
import Form from "./pages/Form";
import MealPlan from "./pages/MealPlan";
    
function App() {
  return (
    <main className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Form />
        <MealPlan />
      </div>
        <Footer />
    </main >
  );
}

export default App;
