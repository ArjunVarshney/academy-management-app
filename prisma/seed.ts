// @ts-nocheck
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

const subjects = [
   "Mathematics",
   "Biology",
   "Chemistry",
   "Physics",
   "Environmental Science",
   "Hindi Grammar",
   "Hindi Literature",
   "English Literature",
   "English Grammar",
   "History",
   "Geography",
   "Civics",
   "French",
   "German",
   "PhysicalEducation",
   "Visual Arts",
   "Music",
   "Drama",
   "Dance",
   "Computer Programming",
   "Economics",
   "Accounts",
   "Commerce",
];
const schoolSubjects = {};
function shuffleArray(array: any[]) {
   for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the random element
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
   }
   return array;
}
const countOccurrences = (arr: string[], val: string) =>
   arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let usernames: string[] = [];

function randomBetweenRange(a: number, b: number) {
   return Math.round(a + (b - a) * Math.random());
}

function randomAddress() {
   return (
      faker.location.streetAddress() +
      "Building: " +
      faker.location.buildingNumber() +
      faker.location.cardinalDirection() +
      faker.location.city() +
      faker.location.state() +
      faker.location.country() +
      faker.location.continent()
   );
}

function randomBloodGroup() {
   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
   const randomIndex = Math.floor(Math.random() * bloodGroups.length);
   return bloodGroups[randomIndex];
}

function randomPassword() {
   return faker.hacker.adjective() + "-" + faker.hacker.noun();
}

function generateClasses(nGrades: number, nClasses: number) {
   const result = [];

   // Ensure that we have enough classes for each grade
   if (nClasses < nGrades || nClasses > nGrades * 2) {
      throw new Error(
         "Invalid class distribution: nClasses must be between nGrades and nGrades * 2."
      );
   }

   // Distribute the classes
   let classesLeft = nClasses;

   // First, assign one class to every grade
   for (let grade = 1; grade <= nGrades; grade++) {
      result.push(`${grade}A`);
      classesLeft--;
   }

   // Then, assign the remaining classes (1 or 2 classes per grade)
   for (let grade = 1; grade <= nGrades; grade++) {
      if (classesLeft > 0) {
         result.push(`${grade}B`);
         classesLeft--;
      }
   }

   return result;
}

function fakeCredentials() {
   const gender = Math.round(Math.random()) == 0 ? "male" : "female";
   const firstName = faker.person.firstName(gender);
   const lastName = faker.person.lastName(gender);
   let username = firstName + "_" + lastName;
   username = usernames.includes(username)
      ? username + "_" + countOccurrences(usernames, username)
      : username;
   return {
      firstName,
      lastName,
      name: firstName + " " + lastName,
      username,
      email: faker.internet.email({
         firstName: username,
      }),
      phone: faker.phone.number(),
      address: randomAddress(),
      bloodType: randomBloodGroup(),
      gender: gender.toUpperCase(),
      password: randomPassword(),
   };
}

function getSubjects(
   arr = subjects,
   numArrays = 12,
   elementsPerArray = [4, 8]
) {
   let result = [];

   for (let i = 0; i < numArrays; i++) {
      const randomNum = randomBetweenRange(
         elementsPerArray[0],
         elementsPerArray[1]
      );
      const startIndex = randomBetweenRange(0, arr.length - randomNum - 1);
      const endIndex = startIndex + randomNum;
      const subArray = arr.slice(startIndex, endIndex);
      result.push(subArray);
   }

   return result;
}

function getFirstNWorkingDays(year: number, n: number) {
   const workingDays = [];
   let currentDate = new Date(year, 0, 1); // Start on January 1st of the given year
   let dayCount = 0;

   while (workingDays.length < n) {
      // Check if the current day is a weekday (Monday to Friday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
         // Add the current date to the working days list in ISO string format
         workingDays.push(currentDate.toISOString());
      }
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
   }

   return workingDays;
}

async function main() {
   const nOwners = 1;
   const nAdmins = randomBetweenRange(2, 5);
   const nStudents = randomBetweenRange(1000, 1200);
   const nTeachers = randomBetweenRange(25, 30);
   const nStaff = randomBetweenRange(15, 20);
   const nGrades = 12;
   const nClasses = randomBetweenRange(20, 24);
   const nAnnouncements = randomBetweenRange(5, 10);
   const nEvents = randomBetweenRange(5, 10);
   const nComplaints = randomBetweenRange(5, 10);

   const nDaysPassed = () => randomBetweenRange(10, 15);

   const nPostPerClass = () => randomBetweenRange(5, 10);
   // Owner
   await prisma.owner.create({
      data: {
         name: "Arjun Varshney",
         user: {
            create: {
               username: "Arjun_Varshney",
               role: "OWNER",
               password: "password",
            },
         },
      },
   });
   usernames.push("Arjun_Varshney");

   // Admins
   for (let i = 0; i < nAdmins; i++) {
      const {
         name,
         username,
         gender,
         phone,
         email,
         address,
         bloodType,
         password,
      } = fakeCredentials();
      await prisma.admin.create({
         data: {
            name,
            email,
            phone,
            address,
            bloodType,
            gender,
            dob: faker.date.birthdate({ mode: "age", min: 24, max: 65 }),
            user: {
               create: {
                  username,
                  role: "ADMIN",
                  password,
               },
            },
         },
      });
      usernames.push(username);
   }

   let teachers = [];
   // Teachers
   for (let i = 0; i < nTeachers; i++) {
      const {
         name,
         username,
         gender,
         phone,
         email,
         address,
         bloodType,
         password,
      } = fakeCredentials();
      const t = await prisma.teacher.create({
         data: {
            name,
            email,
            phone,
            address,
            bloodType,
            gender,
            dob: faker.date.birthdate({ mode: "age", min: 24, max: 65 }),
            user: {
               create: {
                  username,
                  role: "TEACHER",
                  password,
               },
            },
         },
      });
      usernames.push(username);
      teachers.push(t.id);
   }

   // Staff
   for (let i = 0; i < nStaff; i++) {
      const {
         name,
         username,
         gender,
         phone,
         email,
         address,
         bloodType,
         password,
      } = fakeCredentials();
      await prisma.staff.create({
         data: {
            name,
            email,
            phone,
            address,
            bloodType,
            gender,
            dob: faker.date.birthdate({ mode: "age", min: 24, max: 65 }),
            user: {
               create: {
                  username,
                  role: "TEACHER",
                  password,
               },
            },
         },
      });
      usernames.push(username);
   }

   // Grades
   for (let i = 0; i < nGrades; i++) {
      await prisma.grade.create({
         data: {
            level: i + 1,
         },
      });
   }

   // Classes
   const classes = generateClasses(nGrades, nClasses);
   for (let i = 0; i < classes.length; i++) {
      const name = classes[i];
      await prisma.class.create({
         data: {
            name,
            grade: {
               connect: {
                  level: Number(name.substring(0, name.length - 1)),
               },
            },
            timeTable: {
               create: {},
            },
            supervisor: {
               connect: {
                  id: teachers[i],
               },
            },
         },
      });
   }

   // Students
   for (let i = 0; i < nStudents; i++) {
      const {
         name,
         username,
         gender,
         phone,
         email,
         address,
         bloodType,
         password,
      } = fakeCredentials();
      await prisma.student.create({
         data: {
            name,
            email,
            phone,
            address,
            bloodType,
            gender,
            dob: faker.date.birthdate({ mode: "age", min: 3, max: 19 }),
            user: {
               create: {
                  username,
                  role: "STUDENT",
                  password,
               },
            },
            class: {
               connect: {
                  name: classes[Math.floor(Math.random() * classes.length)],
               },
            },
         },
      });
      usernames.push(username);
   }

   // Subjects
   for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      await prisma.subject.create({
         data: { name: subject },
      });
   }

   // relation between subjects and classes
   const grades = await prisma.grade.findMany({
      include: {
         classes: true,
      },
   });
   const divided_subs = getSubjects();
   // Connect subejct to classes of grades, each grade's classes must have same subjects.id
   for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];
      const grade_classes = grade.classes;
      const subs = divided_subs[i];

      // Connect all the classes with the divided subjects
      for (let j = 0; j < grade_classes.length; j++) {
         const classId = grade_classes[j].id;

         for (let k = 0; k < subs.length; k++) {
            await prisma.class.update({
               where: {
                  id: classId,
               },
               data: {
                  subjects: {
                     connect: {
                        name: subs[k],
                     },
                  },
               },
            });
         }
      }
   }

   // relation between subjects and teachers
   const subs = await prisma.subject.findMany();
   const teachs = await prisma.teacher.findMany();
   // @ts-ignore
   const divided_subs_by_teacher = getSubjects(
      subs,
      teachs.length,
      [1, 4]
   ) as (typeof Subject)[][];

   for (let i = 0; i < teachs.length; i++) {
      const teacher = teachs[i];
      const subjects = divided_subs_by_teacher[i];
      for (let j = 0; j < subjects.length; j++) {
         const subject = subjects[j];
         await prisma.teacher.update({
            where: {
               id: teacher.id,
            },
            data: {
               subjects: {
                  connect: {
                     id: subject.id,
                  },
               },
            },
         });
      }
   }
   // if any of the subjects have zero teachers
   const empty_subs = await prisma.subject.findMany({
      include: {
         teachers: true,
      },
   });
   for (let i = 0; i < empty_subs.length; i++) {
      if (empty_subs[i].teachers.length > 0) {
         continue;
      }
      await prisma.subject.update({
         where: {
            id: empty_subs[i].id,
         },
         data: {
            teachers: {
               connect: {
                  id: teachs[Math.floor(Math.random() * teachs.length)].id,
               },
            },
         },
      });
   }

   // Lessons
   const lessonTimes = [
      "2024-11-20T08:00:00.000Z",
      "2024-11-20T08:52:30.000Z",
      "2024-11-20T09:45:00.000Z",
      "2024-11-20T10:37:30.000Z",
      "2024-11-20T11:30:00.000Z",
      "2024-11-20T12:22:30.000Z",
      "2024-11-20T13:15:00.000Z",
      "2024-11-20T14:07:30.000Z",
      "2024-11-20T15:00:00.000Z",
   ];
   const nDays = nDaysPassed();
   const dates = getFirstNWorkingDays(2020, nDays);
   for (let i = 0; i < nDays; i++) {
      const date = dates[i];
      for (let j = 0; j < classes.length; j++) {
         const clas = classes[j];
         const lessons = shuffleArray(
            (
               await prisma.class.findUnique({
                  where: { name: clas },
                  include: {
                     subjects: {
                        include: {
                           teachers: true,
                        },
                     },
                  },
               })
            ).subjects
         );
         const nLessons = randomBetweenRange(
            lessons.length - 2,
            lessons.length
         );

         for (let k = 0; k < nLessons; k++) {
            await prisma.lesson.create({
               data: {
                  date,
                  startTime:
                     date.split("T")[0] + "T" + lessonTimes[k].split("T")[1],
                  endTime:
                     date.split("T")[0] +
                     "T" +
                     lessonTimes[k + 1].split("T")[1],

                  class: {
                     connect: {
                        name: clas,
                     },
                  },

                  subject: {
                     connect: {
                        id: lessons[k].id,
                     },
                  },

                  teacher: {
                     connect: {
                        id: lessons[k].teachers[
                           Math.floor(
                              Math.random() * lessons[k].teachers.length
                           )
                        ].id,
                     },
                  },
               },
            });
         }
      }
   }

   // Attendances
   const lessons = await prisma.lesson.findMany({
      include: {
         class: {
            include: {
               students: true,
            },
         },
      },
   });
   for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const students = lesson.class.students;
      for (let j = 0; j < students.length; j++) {
         const student = students[j];
         await prisma.attendance.create({
            data: {
               present: Math.random() < 0.8,
               lesson: { connect: { id: lesson.id } },
               student: { connect: { id: student.id } },
            },
         });
      }
   }

   // Assignments
   (async () => {
      const classes = await prisma.class.findMany({
         include: {
            subjects: true,
         },
      });
      for (let i = 0; i < classes.length; i++) {
         const clas = classes[i];
         const subjects = clas.subjects;
         for (let j = 0; j < subjects.length; j++) {
            const subject = subjects[j];
            const [start, end] = faker.date.betweens({
               from: "2022-01-01",
               to: "2022-01-10",
               count: 2,
            });

            await prisma.assignment.create({
               data: {
                  assign_date: start,
                  due_date: end,
                  title: faker.word.adverb() + " " + faker.word.verb(),
                  description: faker.lorem.paragraph(),
                  class: {
                     connect: {
                        id: clas.id,
                     },
                  },
                  subject: {
                     connect: {
                        id: subject.id,
                     },
                  },
               },
            });
         }
      }
   })();

   // Announcement
   (async () => {
      let ann = await prisma.announcement.create({
         data: {
            priority: 100,
            type: "GENERAL",
            title: "Commencement of new session",
            description:
               "We have marked the commencement of new session at 1st january, the timetable will be shared afterwards.",
            date: faker.date
               .between({ from: "2021-12-29", to: "2022-01-02" })
               .toISOString(),
         },
      });
      for (let i = 0; i < classes.length; i++) {
         await prisma.announcement.update({
            where: {
               id: ann.id,
            },
            data: {
               classes: {
                  connect: {
                     name: classes[i],
                  },
               },
            },
         });
      }

      ann = await prisma.announcement.create({
         data: {
            priority: 100,
            type: "ALERT",
            title: "Fee Submission",
            description:
               "The last date to submit the fee is 15/1/2024. Positively submit the fee on time to prevent any fines.",
            date: faker.date
               .between({ from: "2022-01-02", to: "2022-01-05" })
               .toISOString(),
         },
      });
      for (let i = 0; i < classes.length; i++) {
         await prisma.announcement.update({
            where: {
               id: ann.id,
            },
            data: {
               classes: {
                  connect: {
                     name: classes[i],
                  },
               },
            },
         });
      }

      await prisma.announcement.create({
         data: {
            priority: 100,
            type: "ALERT",
            title: "Test Announcement",
            description: "This is a test announcement.",
            date: faker.date
               .between({ from: "2022-01-02", to: "2022-01-05" })
               .toISOString(),
            classes: {
               connect: {
                  name: classes[0],
               },
            },
         },
      });
   })();

   // Event
   (async () => {
      const [start, end] = faker.date.betweens({
         from: "2022-01-25",
         to: "2022-01-27",
         count: 2,
      });
      await prisma.event.create({
         data: {
            title: "Test Event",
            description: "Test description for the test event",
            startTime: start,
            endTime: end,
            classes: {
               connect: classes.map((c) => ({
                  name: c,
               })),
            },
         },
      });
      await prisma.event.create({
         data: {
            title: "Test Event 2",
            description:
               "Test description for the test event 2 for specific classes",
            startTime: start,
            endTime: end,
            classes: {
               connect: classes.slice(0, 4).map((c) => ({
                  name: c,
               })),
            },
         },
      });
   })();

   // Complaint
   (async () => {
      await prisma.complaint.create({
         data: {
            subject: "Test Complaint Student",
            description: "Test description for test complaint",

            student: {
               connect: {
                  id: (
                     await prisma.student.findMany({ where: {}, take: 10 })
                  )[0].id,
               },
            },
         },
      });
      await prisma.complaint.create({
         data: {
            subject: "Test Complaint Teacher",
            description: "Test description for test complaint",

            teacher: {
               connect: {
                  id: (
                     await prisma.teacher.findMany({ where: {}, take: 10 })
                  )[0].id,
               },
            },
         },
      });
   })();

   // Post
   (async () => {
      await prisma.post.create({
         data: {
            img: "https://images.unsplash.com/photo-1731946660299-8f091eb1caee?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Test Post 1",
            description: faker.lorem.paragraph(),
            tags: ["test1", "test2"],
            classes: {
               connect: classes.slice(0, 4).map((c) => ({
                  name: c,
               })),
            },
         },
      });
   })();
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
