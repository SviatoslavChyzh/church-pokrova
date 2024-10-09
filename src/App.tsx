import { useEffect, useState } from "react";
import { Dino } from "./types/types.ts";

export default function Index() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8000/api/dinosaurs/`);
      const allDinosaurs = await response.json() as Dino[];
      setDinosaurs(allDinosaurs);
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      {dinosaurs.map((dinosaur: Dino) => {
        return (
          // <Link
          //   to={`/${dinosaur.name.toLowerCase()}`}
          //   key={dinosaur.name}
          //   className="dinosaur"
          // >
          <div key={dinosaur.name}>{dinosaur.name}</div>
          // </Link>
        );
      })}
    </main>
  );
}
