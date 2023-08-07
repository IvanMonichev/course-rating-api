import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constant';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) — success', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201);

    const { body } = response;
    createdId = body._id;
    expect(createdId).toBeDefined();
  });

  it('/review/byProduct/:productId (GET) — success', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200);
    const { body } = response;
    expect(body.length).toBe(1);
  });

  it('/review/byProduct/:productId (GET) — fail', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(404);
    const { body } = response;
    expect(body.length).toBe(0);
  });


  it('/review/:id (DELETE) — success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200)
  });

  it('/review/:id (DELETE) — fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  });

  afterAll(() => {
    disconnect();
  });
});
