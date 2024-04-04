import { App } from './app';
import { Grpc } from './grpc';
import { KafkaManager } from '../providers/kafka/kafka';
import { config } from '../providers/aws/secret-manager';
import { Config } from '../interfaces/config';
import { mongoDOA } from '../providers/database/mongo.connection';

/**
 * @description Start the grpc and Express server
 */
export class Bootstrap {
    private uri: string = config.get(Config.MONGO_CONNECTION_URI);
    private gRPC: Grpc;
    private app: App;
    private kafka: KafkaManager;
    constructor() {
        this.startApplication();
    }

    private async startApplication() {
        mongoDOA.connectDatabase(this.uri);
        this.gRPC = new Grpc();
        this.app = new App();
    }
}
