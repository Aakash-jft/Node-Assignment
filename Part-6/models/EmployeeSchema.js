module.exports = (sequelize,DataTypes)=>{
    const user = sequelize.define('mytabs',{
        Name:{type : DataTypes.STRING, allownull : false},
        Job:{type: DataTypes.STRING,allownull : false},
        Salary:{type : DataTypes.INTEGER,allownull : false}
    })
    return user;
}