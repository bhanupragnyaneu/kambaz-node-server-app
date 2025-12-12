import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app) {
  const dao = ModulesDao();
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    console.log("Finding modules for course:", courseId);
    const modules = await dao.findModulesForCourse(courseId);
    console.log("Modules found:", modules);
    res.json(modules);
  }


  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const status = await modulesDao.deleteModule(courseId, moduleId);
    res.send(status);
  }
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);


    const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  }

const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(courseId, moduleId, moduleUpdates);
    res.send(status);
  }
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
 


  app.post("/api/courses/:courseId/modules", createModuleForCourse);

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}
