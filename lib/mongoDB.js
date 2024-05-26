import mongoose from 'mongoose';
import redis from 'redis';
import chalk from 'chalk';

const { Schema, connect, model: _model } = mongoose;

export class mongoDB {
  constructor(url, dbName = 'mydatabase') {
    console.log(chalk.green(`Connecting to MongoDB...`));
    this.url = url;
    this.dbName = dbName;
    this.data = this._data = {};
    this._schema = {};
    this._model = {};
    this.db = connect(this.url, { dbName: this.dbName })
      .then(() => {
        console.log(chalk.green(`Connected to MongoDB successfully!`));
      })
      .catch(console.error);
  }

  async read() {
    console.log(chalk.yellow(`Reading data from MongoDB...`)); // Pesan tambahan saat membaca
    this.conn = await this.db;
    let schema = this._schema = new Schema({
      data: {
        type: Object,
        required: true,
        default: {}
      }
    });
    try {
      this._model = _model('data', schema);
    } catch {
      this._model = _model('data');
    }
    this._data = await this._model.findOne({});
    if (!this._data) {
      this.data = {};
      const [_, _data] = await Promise.all([
        this.write(this.data),
        this._model.findOne({})
      ]);
      this._data = _data;
    } else this.data = this._data.data;
    console.log(chalk.yellow(`Data read from MongoDB successfully!`)); // Pesan tambahan setelah membaca
    return this.data;
  }

  write(data) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) return reject(new Error('Data is required'));

        if (!this._data) {
          const newData = new this._model({ data });
          const savedData = await newData.save();
          resolve(savedData);
        } else {
          const existingData = await this._model.findById(this._data._id);

          if (!existingData) {
            reject(new Error('Data not found'));
            return;
          }

          existingData.data = data;
          const savedData = await existingData.save();
          resolve(savedData);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}








//
//
//




export class redisDB {
  constructor(url) {
    console.log(chalk.green('Connecting to Redis...'));
    this.redisUrl = url;
    this.data = {};
    this.client = this.createRedisClient();
    this.connected = false;
  }

  createRedisClient() {
    return redis.createClient(  {
      password: '308j8cxmUSqBwU2nEzkQSeXru78bHoCP',
      socket: {
          host: 'redis-10807.c256.us-east-1-2.ec2.cloud.redislabs.com',
          port: 10807
      }
  });
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log(chalk.green('Connected to Redis successfully!'));
        this.connected = true;
        resolve();
      });

      this.client.on('error', (error) => {
        console.error(chalk.red(`Error connecting to Redis: ${error}`));
        reject(error);
      });
    });
  }

  async read() {
    if (!this.connected) {
      console.error(chalk.red('Redis is not connected!'));
      return null;
    }

    console.log(chalk.yellow('Reading data from Redis...'));
    return new Promise((resolve, reject) => {
      this.client.get('data', (error, data) => {
        if (error) {
          console.error(chalk.red(`Error reading data from Redis: ${error}`));
          reject(error);
          return;
        }

        console.log(chalk.yellow('Data read from Redis successfully!'));
        resolve(data ? JSON.parse(data) : {});
      });
    });
  }

  async write(data) {
    if (!this.connected) {
      console.error(chalk.red('Redis is not connected!'));
      return null;
    }

    console.log(chalk.yellow('Writing data to Redis...'));
    return new Promise((resolve, reject) => {
      const jsonData = JSON.stringify(data);
      this.client.set('data', jsonData, (error) => {
        if (error) {
          console.error(chalk.red(`Error writing data to Redis: ${error}`));
          reject(error);
          return;
        }

        console.log(chalk.yellow('Data written to Redis successfully!'));
        resolve(data);
      });
    });
  }
}
