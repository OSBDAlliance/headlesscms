// config/database.ts
import { DataSource, QueryRunner } from 'typeorm';
import dotenv from 'dotenv';
import { Payment } from '../core/models/payment';

dotenv.config();

// Custom query runner for stored procedures
class StoredProcedureQueryRunner {
    static async execute(queryRunner: QueryRunner, procedure: string, params: any[]): Promise<any> {
        try {
            const escapedParams = params.map(param =>
                param === null ? 'NULL' :
                    param instanceof Date ? `'${param.toISOString().slice(0, 19).replace('T', ' ')}'` :
                        typeof param === 'string' ? `'${param.replace(/'/g, "''")}'` :
                            queryRunner.connection.driver.escape(param)
            ).join(',');

            const query = `CALL ${procedure}(${escapedParams})`;
            const result = await queryRunner.query(query);

            return result[0];
        } catch (error) {
            console.error(`Error executing stored procedure ${procedure}:`, error);
            throw error;
        }
    }
}

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'headlesscms',
    entities: [Payment],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    extra: {
        connectionLimit: 10,
        multipleStatements: true,
        waitForConnections: true,
        queueLimit: 0
    },
    poolSize: 10,
    connectorPackage: 'mysql2',
    maxQueryExecutionTime: 1000,
    connectTimeout: 30000,
    acquireTimeout: 30000
});

export class DatabaseService {
    private static dataSource: DataSource;
    private static isInitialized = false;

    static async initialize(): Promise<void> {
        if (!this.isInitialized) {
            try {
                this.dataSource = AppDataSource;
                await this.dataSource.initialize();
                this.isInitialized = true;
                console.log('Database connection initialized successfully');
            } catch (error) {
                console.error('Error initializing database connection:', error);
                throw error;
            }
        }
    }

    static getDataSource(): DataSource {
        if (!this.isInitialized) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return this.dataSource;
    }

    static async executeStoredProcedure(procedure: string, params: any[] = []): Promise<any> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const queryRunner = this.dataSource.createQueryRunner();
        let isTransactionStarted = false;

        try {
            await queryRunner.connect();

            // Start transaction
            await queryRunner.startTransaction();
            isTransactionStarted = true;

            const result = await StoredProcedureQueryRunner.execute(
                queryRunner,
                procedure,
                params
            );

            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            if (isTransactionStarted) {
                try {
                    await queryRunner.rollbackTransaction();
                } catch (rollbackError) {
                    console.error('Error rolling back transaction:', rollbackError);
                }
            }
            throw error;
        } finally {
            try {
                await queryRunner.release();
            } catch (releaseError) {
                console.error('Error releasing query runner:', releaseError);
            }
        }
    }

    static async executeBatchStoredProcedure<T>(
        procedure: string,
        paramsArray: any[][],
        batchSize: number = 1000
    ): Promise<T[]> {
        if (!this.isInitialized) {
            await this.initialize();
        }

        const results: T[] = [];
        const batches = [];

        // Split into batches
        for (let i = 0; i < paramsArray.length; i += batchSize) {
            batches.push(paramsArray.slice(i, i + batchSize));
        }

        // Process each batch
        for (const batch of batches) {
            const queryRunner = this.dataSource.createQueryRunner();
            let isTransactionStarted = false;

            try {
                await queryRunner.connect();

                // Start transaction
                await queryRunner.startTransaction();
                isTransactionStarted = true;

                for (const params of batch) {
                    const result = await StoredProcedureQueryRunner.execute(
                        queryRunner,
                        procedure,
                        params
                    );
                    results.push(result);
                }

                await queryRunner.commitTransaction();
            } catch (error) {
                if (isTransactionStarted) {
                    try {
                        await queryRunner.rollbackTransaction();
                    } catch (rollbackError) {
                        console.error('Error rolling back transaction:', rollbackError);
                    }
                }
                throw error;
            } finally {
                try {
                    await queryRunner.release();
                } catch (releaseError) {
                    console.error('Error releasing query runner:', releaseError);
                }
            }
        }

        return results;
    }
}

export class BaseRepository {
    protected async callStoredProcedure(procedure: string, params: any[] = []): Promise<any> {
        return DatabaseService.executeStoredProcedure(procedure, params);
    }

    protected async callBatchStoredProcedure<T>(
        procedure: string,
        paramsArray: any[][],
        batchSize?: number
    ): Promise<T[]> {
        return DatabaseService.executeBatchStoredProcedure<T>(
            procedure,
            paramsArray,
            batchSize
        );
    }
}