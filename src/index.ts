export default {
	async scheduled(event, env, ctx) {
		const OWNER = 'ankushgarg1998';
		const REPO = 'ipuranklist-bot';
		const WORKFLOW_ID = '116517934';
		const WORKFLOW_DISPATCH_URL = `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`;
		const BRANCH_NAME = 'master';
		const requestHeaders = {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${env.GITHUB_TOKEN}`, // Use the token from environment variables
			'X-GitHub-Api-Version': '2022-11-28',
			'Content-Type': 'application/json',
			'User-Agent': 'PostmanRuntime/7.44.0', // Required to avoid 403 Forbidden error
		};
		const requestPayload = JSON.stringify({
			ref: BRANCH_NAME,
		});
		ctx.waitUntil(
			fetch(WORKFLOW_DISPATCH_URL, { method: 'POST', headers: requestHeaders, body: requestPayload })
				.then((response) => {
					if (!response.ok) {
						throw new Error(`GitHub API request failed with status ${response.status}`);
					}
					console.log('GitHub Actions workflow triggered successfully.');
				})
				.catch((error) => {
					console.error('Error triggering GitHub Actions workflow:', error);
				})
		);
	},
} satisfies ExportedHandler<Env>;
