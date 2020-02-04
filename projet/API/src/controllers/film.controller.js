import Article from "../models/Article";
import User from "../models/User";
import Film from "../models/Film"

class FilmController{

    /**
     * Create Film into Database
     * @param {Request} req 
     * @param {Response} res
     */
    static async create(req, res){
        let status = 200;
        let body = {};

        try {

            
            let film = await Film.create({
                title: req.body.title,
                content: req.body.content,
                img: req.body.img,
                note: req.body.note,
                date:req.body.date,
                duree:req.body.duree,
                genre:req.body.genre

            });

            body = {
                film, 
                'message': 'Film created'
            };
            
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }


    static async list(req, res){
        let status = 200;
        let body = {};

        try {            
            
            // .find() return tous
            // .findById(id)
            // .findOne({email: 'email@email.fr'})
            
            let film = await Film.find().populate('userId');

            body = {
                film, 
                'message': 'Film list'
            };
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }

    static async details(req, res){
        let status = 200;
        let body = {};

        try {            
            
            // .find() return tous
            // .findById(id)
            // .findOne({email: 'email@email.fr'})
            
            let id = req.params.id;
            let user = await User.findById(id);
            let article = await Article.find({userId: id});

            body = {
                user,
                article, 
                'message': 'Articles details'
            };
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }

    static async delete(req, res){
        let status = 200;
        let body = {};

        try {            
            
            // .find() return tous
            // .findById(id)
            // .findOne({email: 'email@email.fr'})
            
            await Article.remove({_id: req.params.id});

            body = {
                'message': 'Article Deleted'
            };
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }

    static async update(req, res){
        let status = 200;
        let body = {};

        try {            
            
            // .find() return tous
            // .findById(id)
            // .findOne({email: 'email@email.fr'})

            let article = await Article.findByIdAndUpdate(req.params.id, req.body, {new: true});

            body = {
                article,
                'message': 'Users updated'
            };
        } catch (error) {
            status = 500;
            body = {'message': error.message};
        }
        return res.status(status).json(body);
    }
}

export default FilmController