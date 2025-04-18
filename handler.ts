import {
	ServerlessAdapter,
	type ServerlessHandler,
} from '@h4ad/serverless-adapter';
import { ApiGatewayV2Adapter } from '@h4ad/serverless-adapter/adapters/aws';
import { ExpressFramework } from '@h4ad/serverless-adapter/frameworks/express';
import { LazyFramework } from '@h4ad/serverless-adapter/frameworks/lazy';
import { DefaultHandler } from '@h4ad/serverless-adapter/handlers/default';
import { PromiseResolver } from '@h4ad/serverless-adapter/resolvers/promise';
import type { Express } from 'express';
import { app } from './app';

const framework = new LazyFramework(new ExpressFramework(), async () => app());

export const main: ServerlessHandler<Express> = ServerlessAdapter.new(null)
	.setFramework(framework)
	.setHandler(new DefaultHandler())
	.setResolver(new PromiseResolver())
	.addAdapter(new ApiGatewayV2Adapter())
	.build();
