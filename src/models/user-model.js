'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'SUPER-SECRET';

const userSchema = (sequelize, DataTypes) =>{
    const model = sequelize.define('Users', {
        userName : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true 
        },
        password : {
             type : DataTypes.STRING,
             allowNull : false
        },
        token : {
            type : DataTypes.VIRTUAL,
            get (){
                return jwt.sign({userName: this.userName} , SECRET);
            },
            set(tokenObj){
                let token = jwt.sign(tokenObj, SECRET);
                return token;
            }
        }
    });
    model.beforeCreate(async (user) => {
        let hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed
    });
    model.authenticateBasic = async function (username, password) {
        const user = await this.findOne({ where: { username } })
        const valid = await bcrypt.compare(password, user.password)
        if (valid) { return user; }
        throw error;
      }
    
      model.authenticateToken = async function (token) {
        try {
          const varifiedToken = jwt.verify(token, SECRET);
          const user = await this.findOne({ where: { username: varifiedToken.username } })
          if (user) { return user; }
          throw new Error('Not Found');
        } catch (error) {
          throw error;
        }
      }
    
      return model;
    }
    
    module.exports = userSchema;
