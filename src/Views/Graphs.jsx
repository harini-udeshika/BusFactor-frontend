import React from 'react';
import { useLocation } from 'react-router-dom';
import GraphsDisplay from '../Components/GraphsDisplay/GraphsDisplay';


function GraphsPage() {
  const location = useLocation();
  const { data } = location.state; // Extract graph data passed via navigate
  const { network_graph, key_collab } = data;

  return <>
    <GraphsDisplay fullNetworkData={network_graph} keyCollaboratorsData={key_collab} />
  </>;
}

export default GraphsPage;
