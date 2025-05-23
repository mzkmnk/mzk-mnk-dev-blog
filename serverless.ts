import type { AWS } from '@serverless/typescript';

const serviceName = 'mzk-mnk-dev-blog';

const serverlessConfig: AWS = {
	service: serviceName,

	plugins: [
		'serverless-deployment-bucket',
		'serverless-aws-function-url-custom-domain',
	],

	custom: {
		urlDomain: {
			domains: ['blog.mzkmnk.net'],
			hostedZoneName: 'mzkmnk.net.',
			certificateArn:
				'arn:aws:acm:us-east-1:796092240090:certificate/b20d4659-232b-4707-b760-b48965ea86bb',
		},
	},

	provider: {
		name: 'aws',
		stage: 'prod',
		region: 'ap-northeast-1',
		runtime: 'nodejs22.x',
		architecture: 'arm64',
		stackName: '${param:prefix}-stack',
		stackTags: {
			System: serviceName,
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
			handler: `dist/${serviceName}/server/server.main`,
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
			prefix: serviceName,
		},
	},

	resources: {},
};

module.exports = serverlessConfig;
