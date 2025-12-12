import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";


export default function CoursesDao() {
  function findAllCourses() {
 return model.find({});
  }
  async function findCoursesForEnrolledUser(userId) {
    const userEnrollments = await enrollmentModel.find({ user: userId });
    
    const courseIds = userEnrollments.map((enrollment) => enrollment.course);
    
    const enrolledCourses = await model.find(
      { _id: { $in: courseIds } }
    );
    
    return enrolledCourses;
  }
  function createCourse(course) {

  const newCourse = { ...course, _id: uuidv4() };


  return model.create(newCourse);
  }

  function deleteCourse(courseId) {

   return model.deleteOne({ _id: courseId });

  }

  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }
  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
