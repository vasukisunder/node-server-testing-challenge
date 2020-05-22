const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig')
const model = require('./model');



describe('server.js', () => {
    describe ('index route', () => {
        it('should return an OK status code from index route', async () => {
/*             const expectedStatusCode = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expectedStatusCode); */

            return (request(server)
            .get("/")
            .then(res => {
                expect(res.status).toBe(200);
            }))

        })

        it('should return a JSON object from the index route',  () => {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.body).toEqual({api: 'running'})
            })
            
        })
        
        
        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');
      
            expect(response.type).toEqual('application/json');
          });
    })
})

describe("server", () => {
    it("can run tests", () => {
        expect(true).toBeTruthy();
    })
    describe("GET /", () =>{
        
    })
})

describe ('GET /users', () => {
    it('should return an array', () => {
        return (request(server).get("/users").then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        }))
    })

    it("should return correct first user", () => {
        return request(server)
          .get("/users")
          .then((res) => {
            const testItem = { id: 1, name: "sam" };
            expect(res.body[0]).toEqual(testItem);
          });
      });
})

describe('POST /users', () => {
    
    it("should correct length of user list", async () => {
        await model.add({ name: "test" });
  
        const users = await db("users");
        let length = users.length;
        expect(users).toHaveLength(length);
      });



      it("should return true when add new user", async () => {
        await model.add({ name: "test2" });

        const users = await db("users");
        expect(users[users.length - 1]).toBeTruthy();
      });
})

describe("DELETE /users/:id", () => {
    it("should return correct length", async () => {
      const users = db("users");
      let amount = users.length;
      await model.remove(amount - 1);

      const data = await db("users");
     const newAmt = data.length;
      expect(data).toHaveLength(newAmt);
    });


    it("should return undefine", async () => {
      const users = db("users");
      let amount = users.length;

      await model.remove(amount - 1);
      
      // read data from the table
      const newUsers = await db("users");
      expect(newUsers[newUsers.length]).toBeUndefined();
    });
  });
