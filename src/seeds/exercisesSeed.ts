// Assuming you have AppDataSource setup
import { AppDataSource } from "../dataSource";
import { Exercise } from "../entity/Exercises";

export const exerciseSeed = async () => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const exercisesData = [
      // Strength exercises
      {
        name: "Bench Press",
        description: "A chest workout using a barbell.",
        type: "Strength",
      },
      {
        name: "Squat",
        description: "A lower body workout targeting legs.",
        type: "Strength",
      },
      {
        name: "Deadlift",
        description: "A compound lift working the back and legs.",
        type: "Strength",
      },
      {
        name: "Push-ups",
        description: "A bodyweight exercise targeting the chest and triceps.",
        type: "Strength",
      },
      {
        name: "Pull-ups",
        description:
          "An upper body strength exercise working the back and biceps.",
        type: "Strength",
      },

      // Cardio exercises
      {
        name: "Running (Outdoor)",
        description: "Running outside on natural or paved surfaces.",
        type: "Cardio",
      },
      {
        name: "Running (Treadmill)",
        description: "Running indoors on a treadmill.",
        type: "Cardio",
      },
      {
        name: "Jump Rope",
        description: "A full-body cardiovascular workout using a jump rope.",
        type: "Cardio",
      },
      {
        name: "Cycling (Outdoor)",
        description:
          "Cycling outdoors for cardiovascular health and endurance.",
        type: "Cardio",
      },
      {
        name: "Cycling (Stationary Bike)",
        description: "Indoor cycling on a stationary bike.",
        type: "Cardio",
      },
      {
        name: "Swimming",
        description: "A full-body cardiovascular workout performed in water.",
        type: "Cardio",
      },

      // Flexibility exercises
      {
        name: "Yoga",
        description:
          "A series of stretches and poses for flexibility and mindfulness.",
        type: "Flexibility",
      },
      {
        name: "Pilates",
        description:
          "Exercises focusing on core strength, flexibility, and body control.",
        type: "Flexibility",
      },
      {
        name: "Stretching",
        description: "Basic flexibility exercises to improve range of motion.",
        type: "Flexibility",
      },

      // Indoor games and activities
      {
        name: "Badminton",
        description: "An indoor racquet sport.",
        type: "Indoor Game",
      },
      {
        name: "Table Tennis",
        description:
          "An indoor game played on a table using paddles and a ball.",
        type: "Indoor Game",
      },
      {
        name: "Basketball (Indoor)",
        description: "Indoor team sport involving shooting a ball into a hoop.",
        type: "Indoor Game",
      },
      {
        name: "Volleyball (Indoor)",
        description: "An indoor team sport played with a ball and net.",
        type: "Indoor Game",
      },

      // Other activities
      {
        name: "Swimming (Freestyle)",
        description: "A swimming stroke focusing on speed and endurance.",
        type: "Cardio",
      },
      {
        name: "Jumping Jacks",
        description:
          "A full-body cardiovascular exercise performed with jumping movements.",
        type: "Cardio",
      },
      {
        name: "Rowing (Indoor)",
        description:
          "A full-body cardiovascular workout using a rowing machine.",
        type: "Cardio",
      },
    ];

    const exercisePromises = exercisesData.map(async (exerciseData) => {
      const exercise = new Exercise();
      exercise.name = exerciseData.name;
      exercise.description = exerciseData.description;
      exercise.type = exerciseData.type;
      return await queryRunner.manager.save(exercise);
    });

    await Promise.all(exercisePromises);

    await queryRunner.commitTransaction();
    console.log("Exercises seeded successfully");
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("Error seeding exercises:", err);
  } finally {
    await queryRunner.release();
  }
};
