import React from "react";
import { useLocation } from "react-router-dom";
import GraphsDisplay from "../Components/GraphsDisplay/GraphsDisplay";
import TreeMap from "../Components/TreeMap/TreeMap";

function GraphsPage() {
  const location = useLocation();
  const { data } = location.state;
  const { network_graph, key_collab, loc_per_contributor, filtered_unique_files } = data;
  console.log(data);
  // Create hierarchies for the treemap
  function convertToHierarchies(data) {
    const hierarchies = []; // Array to hold hierarchies for each contributor

    // Function to build a hierarchical structure for a single contributor
    function buildHierarchy(contributor, files) {
      const root = { name: contributor, children: [] };

      function addNode(pathParts, value, currentNode) {
        const [head, ...tail] = pathParts;

        // Find or create the current level node
        let childNode = currentNode.children.find((child) => child.name === head);
        if (!childNode) {
          childNode = { name: head, children: [] };
          currentNode.children.push(childNode);
        }

        // If there are more parts, recurse; otherwise, assign the value
        if (tail.length > 0) {
          addNode(tail, value, childNode);
        } else {
          childNode.value = value;
          delete childNode.children; // Remove children if it's a leaf node
        }
      }

      // Build hierarchy for the contributor
      for (const [filePath, loc] of Object.entries(files)) {
        if (loc !== null) {
          const pathParts = filePath.split("/"); // Split the path into parts
          addNode(pathParts, loc, root); // Add to the hierarchy
        }
      }

      return root;
    }

    // Create hierarchies for each contributor
    for (const [contributor, files] of Object.entries(data)) {
      const hierarchy = buildHierarchy(contributor, files);
      hierarchies.push(hierarchy);
    }

    return hierarchies;
  }
  console.log(filtered_unique_files);
  const hierarchies = convertToHierarchies(filtered_unique_files);
  console.log(JSON.stringify(hierarchies, null, 2)); // Pretty-printed JSON

  return (
    <>
      <GraphsDisplay fullNetworkData={network_graph} keyCollaboratorsData={key_collab} hierarchiesData={hierarchies}/>
      {/* {
        hierarchies.map((hierarchy, index) => (
          <TreeMap key={index} data={hierarchy} />
        ))
      } */}
    </>
  );
}

export default GraphsPage;
