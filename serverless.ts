import type { AWS } from '@serverless/typescript';

const system = 'mzk-mnk-dev-blog';

const serverlessConfig: AWS = {
	service: system,

	plugins: ['serverless-deployment-bucket'],

	provider: {
		name: 'aws',
		stage: 'prod',
		region: 'ap-northeast-1',
		runtime: 'nodejs22.x',
		architecture: 'arm64',
		stackName: '${param:prefix}-stack',
		stackTags: {
			System: system,
			Stage: '${sls:stage}',
			Serverless: 'true',
		},
		deploymentBucket: {
			name: '${param:prefix}-deployment-bucket',
			serverSideEncryption: 'AES256',
		},
		iam: {
			role: {
				name: '${param:prefix}-lambda-role',
			},
		},
		environment: {},
	},

	functions: {
		app: {
			handler: `dist/${system}/server/server.main`,
			name: '${param:prefix}-lambda',
			memorySize: 1769,
			timeout: 60,
			url: true,
			package: {
				patterns: ['!**', 'dist/**'],
			},
		},
	},

	package: { individually: true },

	params: {
		default: {
			prefix: system,
		},
	},

	resources: {},
};

module.exports = serverlessConfig;
