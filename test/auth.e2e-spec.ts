import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: "test@mail.ru",
  password: "12345"
}

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) — success (200)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    const { body } = response;
    expect(body.access_token).toBeDefined();
  });

  it('/review/create (POST) — fail password (401)', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'qwerty'})
      .expect(401, {
        statusCode: 401,
        message: "Введён неверный email или пароль",
        error: "Unauthorized"
      });
  });

  it('/review/create (POST) — user not found (401)', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'some@user.ru'})
      .expect(401, {
        statusCode: 401,
        message: "Пользователь с таким email не найден",
        error: "Unauthorized"
      });
  });



  afterAll(() => {
    disconnect();
  });
});
