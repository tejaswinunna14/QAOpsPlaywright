const {test, expect} = require('@playwright/test');
const { request } = require('node:http');

let userid;

test('@API Get users', async({request})=>
{
    const response = await request.get("https://reqres.in/api/users?page=2");
    console.log(await response.json());
    expect(response.status()).toBe(200)
});

test('@API Create user', async({request})=>
{
    const response = await request.post("https://reqres.in/api/users",
        {
            data: {"name":"Tejaswi", "job":"Trainer"},
            headers:{"Accept":"application/json"}
        });
        console.log(await response.json);
        expect(response.status()).toBe(201);

        var res= await response.json()
        userid=res.id
        console.log(userid);

});

test('Update user', async({request})=>
{
    const response = await request.put("https://reqres.in/api/users/"+userid,
        {
            data: {"name":"Tejaswi", "job":"Developer"},
            headers:{"Accept":"application/json"}
        });
        console.log(await response.json);
        expect(response.status()).toBe(200);

});

test("delete user", async({request})=>
{
    const response = await request.delete("https://reqres.in/api/users/"+userid);
    expect(await response.status()).toBe(204);
}
)