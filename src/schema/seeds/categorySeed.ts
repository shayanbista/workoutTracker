import { AppDataSource } from "../dataSource";
import { Category } from "../entity/Category";
import { Service } from "../entity/Service";

export const categoryServicesSeed = async () => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const categoriesData = [
      {
        name: "Home Services",
        description: "Services for home maintenance and repair",
        services: [
          {
            name: "Plumbing",
            description: "Fixing leaks and other plumbing issues",
          },
          {
            name: "Electrical",
            description: "Electrical installations and repairs",
          },
        ],
      },
      {
        name: "Automotive",
        description: "Car repair and maintenance services",
        services: [
          {
            name: "Car Wash",
            description: "Comprehensive car wash services",
          },
          {
            name: "Mechanic",
            description: "Routine oil changes and maintenance",
          },
        ],
      },
      {
        name: "Health & Wellness",
        description: "Health, fitness, and wellness services",
        services: [
          {
            name: "Personal Training",
            description: "Fitness and personal training services",
          },
          {
            name: "Massage Therapy",
            description: "Professional massage therapy services",
          },
        ],
      },
      {
        name: "Beauty",
        description: "Beauty and personal care services",
        services: [
          {
            name: "Haircut",
            description: "Professional haircut and styling services",
          },
          { name: "Facial", description: "Skin care and facial treatments" },
        ],
      },
    ];

    const categoryPromises = categoriesData.map(async (categoryData) => {
      const category = new Category();
      category.name = categoryData.name;
      category.description = categoryData.description;
      const savedCategory = await queryRunner.manager.save(category);

      const servicePromises = categoryData.services.map(async (serviceData) => {
        const service = new Service();
        service.name = serviceData.name;
        service.description = serviceData.description;
        service.category = savedCategory;
        return await queryRunner.manager.save(service);
      });

      await Promise.all(servicePromises);
      return savedCategory;
    });

    await Promise.all(categoryPromises);

    await queryRunner.commitTransaction();
    console.log("Database seeded successfully");
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error("Error seeding database:", err);
  } finally {
    await queryRunner.release();
  }
};
