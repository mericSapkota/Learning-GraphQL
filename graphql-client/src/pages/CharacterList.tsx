import { useNavigate } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";

const CharacterList = () => {
  const { error, data, loading } = useCharacters();

  const nav = useNavigate();
  const navigateToCharacter = (id: string) => {
    nav(`/character/${id}`);
  };
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Character List</h1>
      <div>
        {data.characters.results.map((c: any) => (
          <div key={c.name} onClick={() => navigateToCharacter(c.id)}>
            <h2>{c.name}</h2>
            <img src={c.image} alt={c.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
