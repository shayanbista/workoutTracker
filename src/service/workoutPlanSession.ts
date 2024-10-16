import loggerWithNameSpace from "../utils/logger";

import { AppDataSource } from "../dataSource";
import { WorkoutSession } from "../entity/WorkoutPlanSession";

import * as workOutPlanService from "../service/workoutPlan";
import { BadRequestError } from "../error/BadRequestError";
import { Session } from "inspector";
import { WorkoutPlan } from "../entity/WorkoutPlan";

export const workoutPlanSessionService = loggerWithNameSpace(
  "workoutPlanSessionService",
);

export const workoutSessionRepository =
  AppDataSource.getRepository(WorkoutSession);

export const workoutSessionExist = async (
  scheduledAt: Date,
): Promise<boolean> => {
  const existingSession = await workoutSessionRepository.findOne({
    where: {
      scheduledAt: scheduledAt,
    },
  });

  return !!existingSession;
};

export const updateSession = async (
  sesssionId: string,
  sessionInformation: WorkoutSession,
) => {
  await workoutSessionRepository.update(sesssionId, sessionInformation);
};

export const newSession = async (
  sessionInformation: WorkoutSession,
  workPlanId: string,
) => {
  const newSession = new WorkoutSession();
  newSession.comments = sessionInformation.comments;
  newSession.scheduledAt = sessionInformation.scheduledAt;
  newSession.workoutPlan = workPlanId as unknown as WorkoutPlan;
  await workoutSessionRepository.save(newSession);
};

export const addWorkoutSession = async (
  workPlanId: number,
  sessionInformation: WorkoutSession,
) => {
  const sessionExists = await workoutSessionExist(
    sessionInformation.scheduledAt,
  );
  if (sessionExists)
    throw new BadRequestError("session already exists and cant be created");

  const createSession = await newSession(
    sessionInformation,
    workPlanId.toString(),
  );

  return true;
};

export const updateWorkoutSession = async (
  sessionId: number,
  sessionInfomation: WorkoutSession,
) => {
  const sessionExists = await workoutSessionExist(
    sessionInfomation.scheduledAt,
  );

  if (sessionExists)
    throw new BadRequestError("session already exists and cant be created");

  const updated = await updateSession(sessionId.toString(), sessionInfomation);

  return true;
};

export const deleteSession = async (workSessionId: number) => {
  const sessionExists =
    await workoutSessionRepository.softDelete(workSessionId);
  return true;
};
