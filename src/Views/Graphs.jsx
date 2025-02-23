import React from "react";
import { useLocation } from "react-router-dom";
import GraphsDisplay from "../Components/GraphsDisplay/GraphsDisplay";

function GraphsPage() {
  const location = useLocation();
  const { data } = location.state;
  const { network_graph, key_collab, loc_per_contributor, all_files_with_sizes, files_per_contributor_with_percentages } = data;

  console.log(data);

  // Function to create hierarchical data for treemap
  function convertToHierarchies(contributorFiles, allFilesWithSizes) {
    const hierarchies = [];

    function buildHierarchy(contributor, contributorFileData, allFilesWithSizes) {
      const root = { name: contributor, children: [] };

      function addNode(pathParts, value, contribution, percentage, currentNode) {
        const [head, ...tail] = pathParts;

        let childNode = currentNode.children.find((child) => child.name === head);
        if (!childNode) {
          childNode = { name: head, children: [] };
          currentNode.children.push(childNode);
        }

        if (tail.length > 0) {
          addNode(tail, value, contribution, percentage, childNode);
        } else {
          childNode.value = value;
          childNode.contribution = contribution;
          childNode.percentage = percentage;
          delete childNode.children; // Remove children for leaf nodes
        }
      }

      for (const [filePath, fileSize] of Object.entries(allFilesWithSizes)) {
        const pathParts = filePath.split("/");

        // Check if the contributor has made changes to this file
        const percentage = contributorFileData?.[filePath] ?? 0; // Get percentage or default to 0
        const contribution = percentage > 0; // True if contributor made changes, otherwise false

        addNode(pathParts, fileSize, contribution, percentage, root);
      }

      return root;
    }

    for (const [contributor, contributorFileData] of Object.entries(contributorFiles)) {
      const hierarchy = buildHierarchy(contributor, contributorFileData, allFilesWithSizes);
      hierarchies.push(hierarchy);
    }

    return hierarchies;
  }

  console.log(files_per_contributor_with_percentages);

  // Generate hierarchies using percentage contribution
  const hierarchies = convertToHierarchies(files_per_contributor_with_percentages, all_files_with_sizes);

  console.log(JSON.stringify(hierarchies, null, 2));

  return (
    <GraphsDisplay 
      fullNetworkData={network_graph} 
      keyCollaboratorsData={key_collab} 
      hierarchiesData={hierarchies}
    />
  );
}

export default GraphsPage;
