import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import courseModel from "../Courses/model.js";
import userModel from "../Users/model.js";

export default function EnrollmentsDao() {
  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  async function findCoursesForUser(userId) {
    // Find all enrollments for the user
    const userEnrollments = await model.find({ user: userId });
    
    // Extract course IDs from enrollments
    const courseIds = userEnrollments.map((enrollment) => enrollment.course);
    
    // Find all courses that match those IDs
    const courses = await courseModel.find(
      { _id: { $in: courseIds } },
      { name: 1, description: 1 }
    );
    
    return courses;
  }

  async function findUsersForCourse(courseId) {
    // Find all enrollments for the course
    const courseEnrollments = await model.find({ course: courseId });
    
    // Extract user IDs from enrollments
    const userIds = courseEnrollments.map((enrollment) => enrollment.user);
    
    // Find all users that match those IDs
    const users = await userModel.find({ user: { $in: userIds } });
    
    return users;
  }

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    findCoursesForUser,
    findUsersForCourse,
  };
}


//   function findEnrollmentsForUser(userId) {
//     const { enrollments } = db;
//     return enrollments.filter((enrollment) => enrollment.user === userId);
//   }

//   function findEnrollmentsForCourse(courseId) {
//     const { enrollments } = db;
//     return enrollments.filter((enrollment) => enrollment.course === courseId);
//   }

//   return { 
//     enrollUserInCourse, 
//     unenrollUserFromCourse,
//     findEnrollmentsForUser,
//     findEnrollmentsForCourse
//   };
// }


