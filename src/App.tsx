import "./App.scss";
// import Hero from "./components/Hero/Hero";
import CharacterCardList from "@components/CharacterCardList/CharacterCardList";
import Hero from "@components/CharacterCardList/Hero/Hero";
function App() {
  return (
    <>
      <Hero />
      <CharacterCardList />
    </>
  );
}

export default App;
