import CardTools from "../components/card-tools";

import { tools } from "../lib/tools-data";

export default function MainPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 mx-auto 2xl:max-w-7xl">
      {tools.map((tool) => (
        <CardTools
          key={tool.path}
          name={tool.name}
          description={tool.description}
          path={tool.path}
        />
      ))}
    </div>
  );
}
