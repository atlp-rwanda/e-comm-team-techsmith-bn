
import db from "../../database/models";
import registerUser from "./signupController";

class dis_enableController {
    static async disableUser(req, res) {

        try{

        }
        catch(e){
            return res.status(400).send({error: "Can't be disabled!"})
        }

    }

    static async enableUser(req, res) {
        try{

        }
        catch(e){
            return res.status(400).send({error: "Can't be enabled!."})
        }

    }

}