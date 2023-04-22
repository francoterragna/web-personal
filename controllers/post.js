const Post = require('../models/post');
const image = require('../utils/image');

const createPost = async (req,res) => {
    try {
        const post = new Post(req.body);
        post.created_at = new Date();
        const imagePath = image.getFilePath(req.files.miniature);
        post.miniature = imagePath;

        const postStored = await post.save();
        res.status(200).send({status: 'Success', data: postStored});
    } catch (error) {
        res.status(400).send({msg: "Error al crear el post", error: error})
    }
}

const updatePost = async (req,res) => {
    try {
        const { id } = req.params;
        const postData = req.body;

        if(req.files.miniature) {
            const imagePath = image.getFilePath(req.files.miniature);
            postData.miniature = imagePath;
        }
        await Post.findByIdAndUpdate({_id: id}, postData, {new: true})
        .then(updatedPost => {
            res.status(200).send({
                msg: "Actualizacion correcta",
                post: updatedPost
            });
            return
        })
        .catch(error => {
            res.status(400).send({
                msg: "Error al actualizar el post - Puede que el post no exista",
                err: error
            })
        })

    } catch (error) {
        res.status(400).send({msg: "Ha ocurrido un error", error: error})
    }
}

const getPosts = async (req,res) => {

    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Post.paginate({}, options, (error, posteos) => {
        if(error){
            res.status(400).send({msg: "Error al obtener los posteos"});
        } else {
            res.status(200).send(posteos)
        }
    })

}

// = ESTE METODO PERMITE ENCONTRAR UN POST CUANDO LE PASAMOS COMO URL EL ATRIBUTO PATH DEL POST
const getOnePost = async (req,res) => {
    try {
        const { path } = req.params;
    
        const response = await Post.findOne({path})
            if(!response) {
                res.status(400).send({msg: "No se ha encontrado ningun post"})
            } else {
                res.status(200).send(response)
            }
    } catch (error) {
        res.status(500).send({msg: "Error del servidor"})
    }
    }


const deletePost = async (req,res) => {
    const { id } = req.params;

    await Post.findByIdAndDelete(id)
    .then(deletedPost => {
        res.status(200).send({msg: `El post ${deletedPost.title} ha sido eliminado`})
    })
    .catch(error => {
        res.status(400).send({msg: "Ha ocurrido un error al eliminar el post", err: error});
    })
}

module.exports = {
    createPost,
    updatePost,
    getPosts,
    deletePost,
    getOnePost
}