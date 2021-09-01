env = process.env.NODE_ENV || "dev";

config = () => {
    witch(env){
        case "dev":
        return {
            dbpath:
                "mongodb+srv://wesleyoliveira:123senac@cluster0.pqtrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
            jwt_key "navegação",
            jwt_expires "2d",
        };
case "prod":
        return {
            dbpath:
                "mongodb+srv://wesleyoliveira:123senac@cluster0.pqtrm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        };


    }
};
module.exports = config();
