import React from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { RandomQuote } from 'components/random-quote';
import { getNetlifyContext } from 'utils';

const contextExplainer = `
The card below is rendered on the server based on the value of \`process.env.CONTEXT\` 
(docs):
`;

const preDynamicContentExplainer = `
The card content below is fetched by the client-side from \`/quotes/random\` (see file \`app/quotes/random/route.js\`) with a different quote shown on each page load:
`;

const postDynamicContentExplainer = `
On Netlify, Next.js Route Handlers are automatically deployed as Serverless Functions.
Alternatively, you can add Serverless Functions to any site regardless of framework, with access to the full context data.

And as always with dynamic content, beware of layout shifts & flicker! (here, we aren't...)
`;

const articleContent = `

## Introduction
Welcome to our comprehensive guide on getting started with Next.js and Netlify. In this article, we will explore the basics of setting up a Next.js project, deploying it on Netlify, and utilizing various features to enhance your web application.

## Setting Up Your Project
To begin, you need to create a new Next.js project. You can do this using the following command:
\`\`\`bash
npx create-next-app@latest
\`\`\`
Follow the prompts to set up your project.

## Understanding the Project Structure
Your Next.js project will have a structure similar to this:
\`\`\`
my-next-app/
├── pages/
│   ├── index.js
│   └── _app.js
├── public/
├── styles/
├── package.json
└── next.config.js
\`\`\`
Each directory and file serves a specific purpose in your project.

## Adding Components
Components are the building blocks of your application. You can create reusable components and import them into your pages. For example:
\`\`\`jsx
import MyComponent from 'components/MyComponent';

export default function Home() {
  return <MyComponent />;
}
\`\`\`

## Deploying to Netlify
Deploying your Next.js app to Netlify is straightforward. Connect your GitHub repository to Netlify and follow the deployment steps. For more details, refer to the Netlify documentation.

## Conclusion
We hope this guide helps you get started with Next.js and Netlify. Happy coding!
`;

const ctx = getNetlifyContext();

export default function Page() {
	return (
		<div className="flex flex-col gap-12 sm:gap-16">
			<section></section>
			<section>
				<ContextAlert className="mb-6" />
				<h1 className="mb-4">Getting Started with Next.js and Netlify</h1>
				<p className="mb-6 text-lg">A comprehensive guide to help you set up and deploy your Next.js project.</p>
				<Link href="https://docs.netlify.com/frameworks/next-js/overview/" className="btn btn-lg sm:min-w-64">
					Read the Docs
				</Link>
			</section>
			{!!ctx && (
				<section className="flex flex-col gap-4">
					<Markdown content={contextExplainer} />
					<RuntimeContextCard />
				</section>
			)}
			<section className="flex flex-col gap-4">
				<Markdown content={preDynamicContentExplainer} />
				<RandomQuote />
				<Markdown content={postDynamicContentExplainer} />
			</section>
			<section className="flex flex-col gap-4">
				<Markdown content={articleContent} />
			</section>
			
			<section className="flex flex-col gap-4">
				<Alert variant="success">
					This is a success alert—check it out!
				</Alert>
			</section>
		</div>
	);
}

function RuntimeContextCard() {
	const title = `Netlify Context: running in ${ctx} mode.`;
	if (ctx === 'dev') {
		return (
			<Card title={title}>
				<p>Next.js will rebuild any page you navigate to, including static pages.</p>
			</Card>
		);
	} else {
		return (
			<Card title={title}>
				<p>This page was statically-generated at build time.</p>
			</Card>
		);
	}
}

function NewSectionCard() {
	return (
		<Card title="New Section Card">
			<p>This is a new card added to the page. You can customize this content as needed.</p>
		</Card>
	);
}
