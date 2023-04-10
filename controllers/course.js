const Course = require('../models/course');
const image = require('../utils/image');

const createCourse = async (req,res) => {
    try {
    const course = new Course(req.body);

    //= PROCESANDO IMAGENES
    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    
        const courseStored = await course.save();
        res.status(200).send(courseStored)
    } catch (error) {
        res.status(400).send(error)
    }

    
}

const getCourses = (req,res) => {

    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, options, (error, courses) => {
        if(error){
            res.status(400).send({msg: "Error al obtener los cursos"});
        } else {
            res.status(200).send(courses)
        }
    })
}

module.exports = {
    createCourse,
    getCourses
};