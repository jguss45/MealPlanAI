import {Form, Footer, MealPlan } from "./components";
    
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
