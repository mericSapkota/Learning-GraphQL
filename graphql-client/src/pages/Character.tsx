import React from "react";
import { useCharacter } from "../hooks/useCharacter";
import { useParams } from "react-router-dom";

export default function Character() {
  const { id } = useParams();
  const { error, data, loading } = useCharacter(Number(id));
  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Character Details</h1>
      <h2>{data.character.name}</h2>
      <img src={data.character.image} alt={data.character.name} />
      <p>Status: {data.character.status}</p>
      <h3>Episodes:</h3>
      <ul>
        {data.character.episode.map((e: any) => (
          <p key={e.episode}>
            {e.episode}: {e.name}
          </p>
        ))}
      </ul>
    </div>
  );
}
