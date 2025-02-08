import { scheduleJob, Spec } from "node-schedule"
import { __prod__ } from "src/constants"
import { ONE_MINUTE } from "src/utils/time"
import { AppDataSource as ConnectionSource } from "../data-source"
import { processMakeGroupsDraw } from "./makeGroupsDraw"

type Cron = {
  name: string
  handler: () => Promise<void>
  description: string
  cron: Spec
  timeout?: number // Timeout in milliseconds (optional)
  runNow?: boolean // Run the service now (optional), Used for development purposes
}

const withTimeout = (handler: () => Promise<void>, timeout: number) => {
  return async () => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Service timed out after ${timeout} ms`)), timeout)
    )

    return Promise.race([handler(), timeoutPromise])
  }
}
const Crons: Cron[] = [
  {
    name: "MakeGroupsDraw",
    handler: processMakeGroupsDraw,
    description: "Make groups draw on the day selected by the user",
    cron: "0 0 * * *", // Every day at midnight - UTC
    timeout: ONE_MINUTE * 15,
    runNow: true
  }
  // Add more services here
]

const scheduleServices = async () => {
  try {
    console.time("ConnectionSource.initialize()")
    await ConnectionSource.initialize()
    console.timeEnd("ConnectionSource.initialize()")

    // Schedule each service
    Crons.forEach(({ name, handler, description, cron, timeout, runNow }) => {
      const job = scheduleJob(cron, async () => {
        console.log(`Running ${name} at ${new Date().toISOString()}`)
        console.log(`Description: ${description}`)

        try {
          // Wrap the handler with a timeout if specified
          const wrappedHandler = timeout ? withTimeout(handler, timeout) : handler
          await wrappedHandler()
          console.log(`✅ Completed ${name} successfully.`)
        } catch (error) {
          console.error(`❌ Error in ${name}:`, error.message)
        }
      })

      // Display next run time
      if (job) {
        console.log(`🕒 ${name} scheduled. Next run: ${job.nextInvocation().toISOString()}`)
      }

      // Run the service immediately if `runNow` is true
      if (runNow && !__prod__) {
        console.log(`🚀 Running ${name} immediately for development purposes.`)
        handler()
          .then(() => console.log(`✅ ${name} completed immediately.`))
          .catch((error) => console.error(`❌ Immediate run of ${name} failed:`, error.message))
      }
    })

    console.log("All services have been scheduled.")
  } catch (error) {
    console.error("❌ Failed to initialize services:", error.message)
    process.exit(1) // Exit with an error code if initialization fails
  }
}

scheduleServices()
