
# Help Center

Help is the help center website for Serchservice, designed to handle frequently asked questions of the users, providers and different other categories in Serch.

## Overview

The Help Website is designed to provide support through dynamic FAQs and help articles for a wider application. It integrates with a CMS for easy content management and uses an intelligent search system to retrieve answers efficiently. The project is built with a scalable architecture, ensuring a smooth user experience.

## Features

- Dynamic FAQ management
- Search functionality for help articles
- Content management via integration with a CMS (e.g., Contentful)
- Responsive design for mobile and desktop
- Markdown support for content formatting
- Content categorization for better navigation
- SEO-friendly URL structure

## Technologies Used

- React: Frontend framework for UI components
- TypeScript: For type-safe development
- MobX: For state management
- Contentful: Headless CMS for managing help content
- Axios: For making HTTP requests
- Styled Components: For styling UI elements
- React Router: For navigation and routing

[!WARNING]
> The help repository relies heavily on the `Contently` and `web-ui-kit` packages from the organization. This demands the need for `.npmrc` file in your folder repository so as to enable the authentication of the package.

## Prerequisites

You need to set the authentication token in your `.npmrc` file like this:

```typescript
@Serchservice:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${PKG_AUTH_TOKEN}
```

Then, pass the `AUTH_TOKEN` variable to your environment. For development purposes.
