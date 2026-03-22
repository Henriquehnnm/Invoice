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
                                                                                                                          
import { getProjectsByCompleted, getProjectsByStarted } from "../src/utils/readers/filters"

describe("Filter utily (Mocked)", () => {
  test("You must filter the started projects", () => {
    const result = getProjectsByStarted()
    expect(result).toBeArray()
  })

  test("You must filter the completed projetcs", () => {
    const result = getProjectsByCompleted()
    expect(result).toBeArray()
  })
})


