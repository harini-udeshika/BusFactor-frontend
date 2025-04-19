import React, {useContext} from 'react';
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import "./Documentation.scss"
import { GlobalContext } from '../../Global/GlobalProvider';

const jsonToMarkdown = (json) => `# Project Overview
${json.projectOverview || "No overview provided."}

## Module Breakdown
### Components
${json.moduleBreakdown?.Components 
  ? Object.entries(json.moduleBreakdown.Components)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join("\n") 
  : "No components."}

### Views
${json.moduleBreakdown?.Views 
  ? Object.entries(json.moduleBreakdown.Views)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join("\n") 
  : "No views."}

### Global
${json.moduleBreakdown?.Global 
  ? Object.entries(json.moduleBreakdown.Global)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join("\n") 
  : "No global modules."}

## Key Workflows
${json.keyWorkflows 
  ? Object.entries(json.keyWorkflows)
      .map(([flowName, flow]) => `> **${flowName}**  
> ${Object.entries(flow).map(([key, value]) => `- **${key}**: ${value}`).join("\n>")}`)
      .join("\n\n") 
  : "No workflows available."}

## Key Functionalities
${json.keyFunctionalities && Array.isArray(json.keyFunctionalities) 
  ? json.keyFunctionalities.map((func, index) => `
### ${index + 1}. ${func.functionality}
${func.flowOfEvents 
  ? Object.entries(func.flowOfEvents)
      .map(([key, value]) => `- **${key}**: ${value}`)
      .join("\n")
  : "No flow of events available."}`).join("\n")
  : "No functionalities available."}

## Critical Dependencies
${json.criticalDependencies && Array.isArray(json.criticalDependencies) 
  ? json.criticalDependencies.map(dep => `- ${dep}`).join("\n") 
  : "No dependencies listed."}
`;



const MarkdownRenderer = () => {
    const location = useLocation();
    const data = location.state?.data; // Safely accessing the state
    console.log(JSON.stringify(data,null,2));
    if (!data) {
        return <p>No data received.</p>;
    }
    const markdownContent = jsonToMarkdown(data);
    return (
        <div className="markdown-container">  
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;

