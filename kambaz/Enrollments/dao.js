import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function EnrollmentsDao(db) {
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

 return {
   enrollUserInCourse,
   unenrollUserFromCourse,
   unenrollAllUsersFromCourse,
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


