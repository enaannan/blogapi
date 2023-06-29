const request = require('supertest');
const app = require('../app');

function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 10);
    const domain = 'example.com';
    return `${randomString}@${domain}`;
}

//todo: mock db calls are accessing real db

describe('User Routes', () => {

    let userId;
    describe('POST /', () => {
        it('should create a new user', async () => {
            const userData = {"username": "test-user",
                "email": generateRandomEmail(),
                "password": "Hashedpassword",
                "salt": "salt"
            };

            const res = await request(app)
                .post('/user')
                .send(userData)
                .expect(201);

            expect(res.body).toHaveProperty('user');
            expect(res.body.user.name).toBe(userData.name);
            expect(res.body.user.email).toBe(userData.email);

            userId = res.body.user.id;

        });
    });

    describe('GET /:id', () => {
        it('should get a specific user', async () => {
            const res = await request(app)
                .get(`/user/${userId}/`)
                .expect(200);

            expect(res.body).toHaveProperty('id', userId);
        });
    });

    describe('GET /', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/user')
                .expect(200);

            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('PUT /:id', () => {
        it('should update a specific user', async () => {
            const updatedUserData = {
                name: 'Updated John Doe',
                email: 'updatedjohndoe@example.com',
            };

            const res = await request(app)
                .put(`/user/${userId}`)
                .send(updatedUserData)
                .expect(200);

            expect(res.body.message).toBe("User updated");
        });
    });

    describe('DELETE /:id', () => {
        it('should delete a specific user', async () => {
            const res = await request(app)
                .delete(`/user/${userId}`)
                .expect(200);
            expect(res.body).toHaveProperty('message', 'User deleted successfully');
        });
    });

    describe('DELETE /', () => {
        it('should delete all users', async () => {
            const res = await request(app)
                .delete('/user/')
                .expect(200);
            expect(res.body).toHaveProperty('message', 'All users deleted successfully');
        });
    });
});
