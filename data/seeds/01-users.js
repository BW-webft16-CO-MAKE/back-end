
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 
        first_name: 'Steven',
        last_name: 'Sussman',
        email: 'steven@comake.com',
        username: 'sjsussman',
        password: 'testpass123',
        },
        {id: 2, 
        first_name: 'Johnny',
        last_name: 'Schuler',
        email: 'Johnny@lambdastudent.com',
        username: 'JSchul123',
        password: 'anothertestpasswrod',
        },
      ]);
    });
};
