import { icons } from "./icons.js";
import type { FileInfo } from "./fileRead.js";
import { getCategoryTitle, getCategoryDescription } from "./fileUtils.js";

export function generateIndexMdx(
  groupedFiles: Record<string, FileInfo[]>,
  config: any
): string {
  const categories = Object.keys(groupedFiles);
  const availableIcons = icons.slice(0, categories.length);

  let content = `---
title: ${config.projectName} Documentation
description: Comprehensive documentation for ${config.projectName}

hero:
  tagline: Project documentation for ${config.projectName}
  image:
    file: ../../assets/houston.webp
  actions:
    - text: Components Guide
      link: /components/
      icon: right-arrow
---

import { Card, CardGrid } from '@astrojs/starlight/components';

# Welcome to ${config.projectName}

Welcome to the comprehensive documentation for ${config.projectName}. This documentation is automatically generated from your codebase to provide up-to-date information about your project's components, pages, API routes, and utilities.

## Quick Navigation

<CardGrid cols={2}>

`;

  // Add cards for each category that has files
  categories.forEach((category, index) => {
    const icon = availableIcons[index] || "document";
    const title = getCategoryTitle(category);
    const description = getCategoryDescription(category);
    const fileCount = groupedFiles[category].length;

    content += `  <Card
    title="${title}"
    icon="${icon}"
    text="${description}"
    actions={[
      {
        text: "View ${title}",
        link: "/${category}",
      },
    ]}
  />

`;
  });

  content += `</CardGrid>

## Project Overview

${
  config.description ||
  "This project documentation is automatically generated to help developers understand the codebase structure and functionality."
}

## Getting Started

To get started with ${
    config.projectName
  }, explore the documentation sections above. Each section contains detailed information about different aspects of the project:

- **Components**: Reusable UI components with props, examples, and usage guidelines
- **Pages**: Page components and routing information
- **API Routes**: Server-side API endpoints and their specifications
- **Libraries & Utilities**: Helper functions and shared utilities

## Contributing

This documentation is automatically generated from your codebase. To improve the documentation:

1. Add JSDoc comments to your functions and components
2. Include descriptive comments in your code
3. Use clear and descriptive file and function names
4. Follow consistent coding patterns

## Support

For questions or issues related to this documentation, please refer to the project's main repository or contact the development team.

---

*Documentation generated by ZenDoc - Last updated: ${new Date().toLocaleDateString()}*
`;

  return content;
}
