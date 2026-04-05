import ForceGraph2D from "react-force-graph-2d";

const GraphView = ({ notes }) => {
  const data = {
    nodes: notes.map(n => ({ id: n._id, name: n.title })),
    links: notes.flatMap(n =>
      n.links.map(link => ({
        source: n._id,
        target: link
      }))
    )
  };

  return (
    <div className="h-[500px]">
      <ForceGraph2D graphData={data} />
    </div>
  );
};

export default GraphView;