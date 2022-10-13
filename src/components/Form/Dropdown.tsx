import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";
import { useEffect, useState } from "react";

interface Game {
  id: string;
  title: string;
}

export function Dropdown() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <Select.Root>
      <Select.Trigger className="text-zinc-500 bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center">
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <CaretDown className="w-6 h-6 text-zinc-400" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="text-white bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between">
          <Select.ScrollUpButton />
          <Select.Viewport>
            {games.map((game) => {
              return (
                <Select.Item
                  className="focus:cursor-default focus:bg-purple-400"
                  value={game.id}
                >
                  <Select.ItemText>{game.title}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              );
            })}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
