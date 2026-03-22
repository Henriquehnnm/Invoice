import { describe, test, expect, vi  } from "bun:test"

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

import { readAll } from "../src/utils/readers/readAll"

describe("Read All utily (Mocked)", () => {
  test("You return all projects", async  () => {
    const result = await readAll()
    expect(result).toBeObject()
  })
})    
