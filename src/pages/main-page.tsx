import ItemTools from "../components/item-tools";

import { tools } from "../lib/tools-data";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 max-w-7xl mx-auto px-5">
      {tools.map((tool) => (
        <ItemTools
          key={tool.path}
          name={tool.name}
          description={tool.description}
          path={tool.path}
        />
      ))}
    </div>
  );
}
