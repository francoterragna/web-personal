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

const updateCourse = async (req,res) => {
   try{ 
        const { id } = req.params;
        const courseData = req.body;

        if(req.files.miniature) {
            const imagePath = image.getFilePath(req.files.miniature);
            courseData.miniature = imagePath;
        }
        await Course.findByIdAndUpdate({_id: id}, courseData, {new: true})
        .then(updatedCourse => {
            res.status(200).send({
                msg: "actualizacion correcta",
                course: updatedCourse
            });
            return;
        })
        .catch (error => {
            res.status(400).send({
                msg: "Error al actualizar el curso",
                err: error
            })
        })
    }
    catch(error){
        res.status(400).send(error)
    }
}

const deleteCourse = async (req,res) => {
    const { id } = req.params;

    await Course.findByIdAndDelete(id)
    .then(deletedCourse => {
        res.status(200).send({msg: `El curso ${deletedCourse.title} ha sido eliminado`})
    })
    .catch(error => {
        res.status(400).send({msg: "Ha ocurrido un error al eliminar el curso", err: error});
    })
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};