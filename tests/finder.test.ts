import { describe, test, expect, vi } from "bun:test"

vi.mock("../src/data/readRaw", () => {
  return {
    data: async () => [
      {
        id: 1,
        name: "Hello",
        description: "Projeto de teste tipado",
        projectStarted: 1,
        projectCompleted: 0,
        createdAt: "2024-03-20",
        budget: 5000,
        clientName: "Cliente Alpha"
      },
      {
        id: 2,
        name: "World",
        projectStarted: 1,
        projectCompleted: 1,
        createdAt: "2024-03-21"
      }
    ]
  }
})

import { getProjectById, getProjectByName } from "../src/utils/readers/finder"

describe("Finder utily (Mocked)", () => {

  test("You must find the project by id", async () => {
    const result = await getProjectById(1)
    expect(result?.budget).toBe(5000)
  })

  test("Must return undefined for non-existent id", async () => {
    const result = await getProjectById(100000000000000)
    expect(result?.name).toBeUndefined()
  })

  test("You should find the project by name", async () => {
    const result = await getProjectByName("World")
    expect(result?.projectCompleted).toBe(1)
  })

  test("Must return undefined for non-existent name", async () => {
    const result = await getProjectByName("aijfuehdfnrcjijghiuhgujfn")
    expect(result?.id).toBeUndefined()
  })
})
