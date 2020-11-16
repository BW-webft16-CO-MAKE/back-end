
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, 
        post_name: 'pothole',
        post_location: 'Manhattan, NY',
        post_description: 'Pothole located on 1st ave and 1st st ',
        upvotes: 0,
        },
        {id: 2, 
        post_name: 'broken stop light',
        post_location: 'San Francisco, CA',
        post_description: 'On the corner of Haight & Ashbury',
        upvotes: 0,
        },
        {id: 3, 
        post_name: 'no stop sign',
        post_location: 'Boston, MA',
        post_description: 'No stop sign on the corner of Boylston Street and Beacon Street. Very dangerous intersection.',
        upvotes: 0,
        },
        {id: 4, 
        post_name: 'Bike lane needed',
        post_location: 'Manhattan, NY',
        post_description: 'Need new bike lane for Houston st',
        upvotes: 0,
        },
      ]);
    });
};
