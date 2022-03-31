const { Schema, model, Types } = require('mongoose'); 

const UserSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true, 
            required: true, 
            trim: true
        }, 
        email: {
            type: String, 
            required: [true, 'email address needed!'], 
            unique: true, 
            validate: {

            },
        }, 
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectsId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
    },
        // prevents virtuals from creating duplicate of _id as `id`
    id: false
    }
); 


UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friendCount) => total + friendCount.length + 1,
      0
    );
});
  
const User = model('User', UserSchema);
  
module.exports = User; 